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
    const tipo = searchParams.get('tipo')

    const where: any = { ownerId: userId }
    
    if (search) {
      where.OR = [
        { asunto: { contains: search } },
        { descripcion: { contains: search } },
        { prospectoNombre: { contains: search } }
      ]
    }
    
    if (tipo && tipo !== 'TODOS') {
      where.tipo = tipo
    }

    const interacciones = await prisma.interaccion.findMany({
      where,
      orderBy: { fecha: 'desc' },
      take: 100
    })

    return NextResponse.json(interacciones)
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

    // Obtener el nombre del prospecto
    const prospecto = await prisma.prospecto.findUnique({
      where: { id: data.prospectoId }
    })

    if (!prospecto) {
      return NextResponse.json({ error: 'Prospecto no encontrado' }, { status: 404 })
    }

    const interaccion = await prisma.interaccion.create({
      data: {
        prospectoId: data.prospectoId,
        prospectoNombre: prospecto.nombre,
        tipo: data.tipo,
        asunto: data.asunto,
        descripcion: data.descripcion,
        fecha: new Date().toISOString(),
        duracion: data.duracion || null,
        resultado: data.resultado || null,
        ownerId: userId
      }
    })

    return NextResponse.json(interaccion, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
