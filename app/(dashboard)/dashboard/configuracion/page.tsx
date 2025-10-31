'use client'

import { useSession } from 'next-auth/react'
import { User, Bell, Lock, Palette } from 'lucide-react'

export default function ConfiguracionPage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-gray-600 mt-1">Personaliza tu experiencia y preferencias</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Perfil</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Nombre</label>
              <p className="font-medium">{session?.user?.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="font-medium">{session?.user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Rol</label>
              <p className="font-medium">{(session?.user as any)?.role || 'USER'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Notificaciones</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email</span>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Seguimientos</span>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Alertas</span>
              <input type="checkbox" className="h-4 w-4" defaultChecked />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Seguridad</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 transition">
              Cambiar contraseña
            </button>
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 transition">
              Autenticación de dos factores
            </button>
            <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 transition text-red-600">
              Cerrar todas las sesiones
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Apariencia</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 block mb-2">Tema</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Claro</option>
                <option>Oscuro</option>
                <option>Sistema</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-2">Idioma</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Español</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
