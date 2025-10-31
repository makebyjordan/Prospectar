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
    const estado = searchParams.get('estado')

    const where: any = { assignedToId: userId }
    
    if (estado) {
      where.estado = estado
    }

    const seguimientos = await prisma.seguimiento.findMany({
      where,
      include: {
        prospecto: {
          select: {
            id: true,
            nombre: true,
            empresa: true
          }
        }
      },
      orderBy: { fechaProgramada: 'asc' },
      take: 50
    })

    return NextResponse.json(seguimientos)
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

    const seguimiento = await prisma.seguimiento.create({
      data: {
        tipo: data.tipo,
        titulo: data.titulo,
        descripcion: data.descripcion,
        fechaProgramada: new Date(data.fechaProgramada),
        prioridad: data.prioridad || 'MEDIA',
        estado: 'PENDIENTE',
        prospectoId: data.prospectoId,
        assignedToId: userId,
        createdById: userId
      }
    })

    return NextResponse.json(seguimiento, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
