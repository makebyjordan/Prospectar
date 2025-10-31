import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const estado = searchParams.get('estado')

    const where: any = { ownerId: userId }
    
    if (search) {
      where.OR = [
        { nombre: { contains: search } },
        { empresa: { contains: search } },
        { email: { contains: search } }
      ]
    }
    
    if (estado) {
      where.estado = estado
    }

    const prospectos = await prisma.prospecto.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100
    })

    return NextResponse.json(prospectos)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const data = await request.json()

    const prospecto = await prisma.prospecto.create({
      data: {
        nombre: data.nombre,
        empresa: data.empresa,
        cargo: data.cargo,
        email: data.email,
        telefono: data.telefono,
        whatsapp: data.whatsapp,
        sector: data.sector,
        fuenteOrigen: data.fuenteOrigen || 'WEB',
        estado: data.estado || 'NUEVO',
        prioridad: data.prioridad || 'MEDIA',
        ownerId: userId
      }
    })

    return NextResponse.json(prospecto, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
