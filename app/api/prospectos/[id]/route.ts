import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const data = await request.json()

    const prospecto = await prisma.prospecto.update({
      where: { id: params.id },
      data: {
        nombre: data.nombre,
        empresa: data.empresa,
        cargo: data.cargo,
        email: data.email,
        telefono: data.telefono,
        whatsapp: data.whatsapp,
        sector: data.sector,
        ciudad: data.ciudad,
        provincia: data.provincia,
        pais: data.pais,
        fuenteOrigen: data.fuenteOrigen,
        estado: data.estado,
        prioridad: data.prioridad
      }
    })

    return NextResponse.json(prospecto)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    await prisma.prospecto.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
