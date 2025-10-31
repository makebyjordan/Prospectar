'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, TrendingUp, TrendingDown } from 'lucide-react'

export default function DashboardPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    prospectos: 0,
    seguimientos: 0,
    conversiones: 0,
    interacciones: 0,
  })

  useEffect(() => {
    // Cargar estadísticas
    const loadStats = async () => {
      try {
        const res = await fetch('/api/dashboard/stats')
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido, {session?.user?.name} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Aquí tienes un resumen de tu actividad
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/prospectos?action=new"
          className="flex items-center gap-3 p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Nuevo Prospecto</span>
        </Link>
        <Link
          href="/dashboard/interacciones?action=new"
          className="flex items-center gap-3 p-4 bg-white border-2 border-black rounded-lg hover:bg-gray-50 transition"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Nueva Interacción</span>
        </Link>
        <Link
          href="/dashboard/seguimientos?action=new"
          className="flex items-center gap-3 p-4 bg-white border-2 border-black rounded-lg hover:bg-gray-50 transition"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Nuevo Seguimiento</span>
        </Link>
        <Link
          href="/dashboard/campanas?action=new"
          className="flex items-center gap-3 p-4 bg-white border-2 border-black rounded-lg hover:bg-gray-50 transition"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Nueva Campaña</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Prospectos</h3>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.prospectos}</p>
          <div className="flex items-center mt-2 text-xs">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-green-500">+12% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Seguimientos Hoy</h3>
            <span className="text-2xl">📅</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.seguimientos}</p>
          <div className="flex items-center mt-2 text-xs">
            <span className="text-gray-500">Pendientes</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Interacciones</h3>
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats.interacciones}</p>
          <div className="flex items-center mt-2 text-xs">
            <span className="text-gray-500">Esta semana</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Conversiones</h3>
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-3xl font-bold text-orange-600">{stats.conversiones}</p>
          <div className="flex items-center mt-2 text-xs">
            <span className="text-gray-500">Este mes</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Next Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">🎯 Próximos Pasos</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <div>
                <p className="text-sm font-medium">Cuenta configurada</p>
                <p className="text-xs text-gray-500">Sistema listo para usar</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-0.5">→</span>
              <div>
                <p className="text-sm font-medium">Agrega tu primer prospecto</p>
                <p className="text-xs text-gray-500">Empieza a gestionar tus contactos</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-0.5">→</span>
              <div>
                <p className="text-sm font-medium">Configura alertas</p>
                <p className="text-xs text-gray-500">No pierdas seguimientos importantes</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">📈 Estado del Pipeline</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Nuevos</span>
                <span className="font-medium">0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Contactados</span>
                <span className="font-medium">0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cualificados</span>
                <span className="font-medium">0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
