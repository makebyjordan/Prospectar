import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userId = (session.user as any).id

    // Obtener estadísticas
    const [prospectos, seguimientos, interacciones, conversiones] = await Promise.all([
      prisma.prospecto.count({
        where: { ownerId: userId }
      }),
      prisma.seguimiento.count({
        where: {
          assignedToId: userId,
          estado: 'PENDIENTE',
          fechaProgramada: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999))
          }
        }
      }),
      prisma.interaccion.count({
        where: {
          userId: userId,
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7))
          }
        }
      }),
      prisma.prospecto.count({
        where: {
          ownerId: userId,
          estado: 'GANADO',
          updatedAt: {
            gte: new Date(new Date().setDate(1))
          }
        }
      })
    ])

    return NextResponse.json({
      prospectos,
      seguimientos,
      interacciones,
      conversiones
    })
  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
