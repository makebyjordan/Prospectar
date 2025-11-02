import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { id } = params

    // Verificar que la interacción pertenece al usuario
    const interaccion = await prisma.interaccion.findFirst({
      where: { id, ownerId: userId }
    })

    if (!interaccion) {
      return NextResponse.json({ error: 'Interacción no encontrada' }, { status: 404 })
    }

    await prisma.interaccion.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Interacción eliminada' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
