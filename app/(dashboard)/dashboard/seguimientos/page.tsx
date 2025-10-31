'use client'

import { useState, useEffect } from 'react'
import { Plus, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Seguimiento {
  id: string
  tipo: string
  titulo: string
  descripcion?: string
  fechaProgramada: string
  prioridad: string
  estado: string
  prospecto: {
    id: string
    nombre: string
    empresa: string
  }
}

export default function SeguimientosPage() {
  const [seguimientos, setSeguimientos] = useState<Seguimiento[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [prospectos, setProspectos] = useState<any[]>([])
  const [formData, setFormData] = useState({
    tipo: 'LLAMADA',
    titulo: '',
    descripcion: '',
    fechaProgramada: '',
    prioridad: 'MEDIA',
    prospectoId: ''
  })

  useEffect(() => {
    loadSeguimientos()
    loadProspectos()
  }, [])

  const loadSeguimientos = async () => {
    try {
      const res = await fetch('/api/seguimientos')
      if (res.ok) {
        const data = await res.json()
        setSeguimientos(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadProspectos = async () => {
    try {
      const res = await fetch('/api/prospectos')
      if (res.ok) {
        const data = await res.json()
        setProspectos(data)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/seguimientos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setIsModalOpen(false)
        setFormData({
          tipo: 'LLAMADA',
          titulo: '',
          descripcion: '',
          fechaProgramada: '',
          prioridad: 'MEDIA',
          prospectoId: ''
        })
        loadSeguimientos()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getEstadoColor = (estado: string) => {
    const colors: Record<string, string> = {
      PENDIENTE: 'bg-yellow-100 text-yellow-800',
      EN_PROCESO: 'bg-blue-100 text-blue-800',
      COMPLETADO: 'bg-green-100 text-green-800',
      CANCELADO: 'bg-red-100 text-red-800',
      VENCIDO: 'bg-red-100 text-red-800'
    }
    return colors[estado] || 'bg-gray-100 text-gray-800'
  }

  const getTipoIcon = (tipo: string) => {
    const icons: Record<string, string> = {
      LLAMADA: '📞',
      EMAIL: '✉️',
      WHATSAPP: '💬',
      REUNION: '📅',
      TAREA: '✅'
    }
    return icons[tipo] || '📄'
  }

  const hoy = new Date()
  const seguimientosHoy = seguimientos.filter(s => {
    const fecha = new Date(s.fechaProgramada)
    return fecha.toDateString() === hoy.toDateString()
  })

  const seguimientosPendientes = seguimientos.filter(s => s.estado === 'PENDIENTE')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Seguimientos</h1>
          <p className="text-gray-600 mt-1">Gestiona tus tareas y recordatorios</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Seguimiento
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Hoy</h3>
            <CalendarIcon className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{seguimientosHoy.length}</p>
          <p className="text-xs text-gray-500 mt-1">Seguimientos programados</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Pendientes</h3>
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{seguimientosPendientes.length}</p>
          <p className="text-xs text-gray-500 mt-1">Por completar</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Completados</h3>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            {seguimientos.filter(s => s.estado === 'COMPLETADO').length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Esta semana</p>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Próximos Seguimientos</h3>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : seguimientos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay seguimientos programados. Crea uno para comenzar.
          </div>
        ) : (
          <div className="divide-y">
            {seguimientos.map((seguimiento) => (
              <div key={seguimiento.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getTipoIcon(seguimiento.tipo)}</span>
                    <div>
                      <h4 className="font-medium">{seguimiento.titulo}</h4>
                      <p className="text-sm text-gray-600">
                        {seguimiento.prospecto.nombre} - {seguimiento.prospecto.empresa}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {format(new Date(seguimiento.fechaProgramada), "PPP 'a las' p", { locale: es })}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoColor(seguimiento.estado)}`}>
                          {seguimiento.estado}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Marcar Completo
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo Seguimiento"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Prospecto *</label>
            <select
              required
              value={formData.prospectoId}
              onChange={(e) => setFormData({ ...formData, prospectoId: e.target.value })}
              className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Seleccionar prospecto...</option>
              {prospectos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} - {p.empresa}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo *</label>
              <select
                required
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
              >
                <option value="LLAMADA">Llamada</option>
                <option value="EMAIL">Email</option>
                <option value="WHATSAPP">WhatsApp</option>
                <option value="REUNION">Reunión</option>
                <option value="TAREA">Tarea</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Prioridad</label>
              <select
                value={formData.prioridad}
                onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
              >
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Título *</label>
            <Input
              required
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ej: Llamada de seguimiento"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fecha y Hora *</label>
            <Input
              required
              type="datetime-local"
              value={formData.fechaProgramada}
              onChange={(e) => setFormData({ ...formData, fechaProgramada: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              rows={3}
              placeholder="Detalles adicionales..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Seguimiento
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
