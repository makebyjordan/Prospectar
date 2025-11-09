'use client'

import { useState, useEffect } from 'react'
import { Plus, Calendar as CalendarIcon, Clock, CheckCircle2, Move, Trash2 } from 'lucide-react'
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
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false)
  const [selectedSeguimiento, setSelectedSeguimiento] = useState<Seguimiento | null>(null)
  const [moveData, setMoveData] = useState({
    destino: '',
    tipo: '',
    notas: ''
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

  const handleOpenMoveModal = (seguimiento: Seguimiento) => {
    setSelectedSeguimiento(seguimiento)
    setMoveData({ destino: '', tipo: '', notas: '' })
    setIsMoveModalOpen(true)
  }

  const handleCloseMoveModal = () => {
    setIsMoveModalOpen(false)
    setSelectedSeguimiento(null)
    setMoveData({ destino: '', tipo: '', notas: '' })
  }

  const handleMoveToSection = async () => {
    if (!selectedSeguimiento || !moveData.destino) {
      alert('⚠️ Selecciona un destino')
      return
    }

    try {
      const seguimientoData = selectedSeguimiento
      
      // Preparar datos según el destino
      let dataToSend: any = {
        nombre: seguimientoData.prospecto.nombre,
        empresa: seguimientoData.prospecto.empresa,
        email: '',
        telefono: '',
        sector: '',
        ciudad: '',
        provincia: '',
        pais: '',
        fuenteOrigen: 'Seguimientos',
        prioridad: seguimientoData.prioridad,
        notas: moveData.notas || `Movido desde Seguimientos el ${new Date().toLocaleDateString()}`
      }

      let endpoint = ''
      let successMessage = ''

      // Configurar según destino
      switch (moveData.destino) {
        case 'prospectos':
          endpoint = '/api/prospectos'
          dataToSend = {
            ...dataToSend,
            estado: 'CONTACTADO'
          }
          successMessage = `✅ ${seguimientoData.prospecto.nombre} movido a Prospectos`
          break

        case 'interacciones':
          endpoint = '/api/interacciones'
          dataToSend = {
            prospectoId: seguimientoData.prospecto.id,
            tipo: moveData.tipo || 'LLAMADA',
            asunto: seguimientoData.titulo,
            descripcion: seguimientoData.descripcion || moveData.notas || 'Interacción desde Seguimientos',
            fecha: new Date().toISOString(),
            duracion: '',
            resultado: ''
          }
          successMessage = `✅ Interacción registrada para ${seguimientoData.prospecto.nombre}`
          break

        case 'rconect':
          endpoint = '/api/rconect'
          dataToSend = {
            ...dataToSend,
            seccion: moveData.tipo || 'otros',
            origen: 'Seguimientos',
            estado: 'PENDIENTE',
            prospectoId: seguimientoData.prospecto.id
          }
          successMessage = `✅ ${seguimientoData.prospecto.nombre} movido a Rconect`
          break

        default:
          alert('❌ Destino no válido')
          return
      }

      // Crear en el destino
      const resCreate = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      })

      if (!resCreate.ok) {
        const errorData = await resCreate.json()
        alert(`❌ Error al mover: ${errorData.error || 'Error desconocido'}`)
        return
      }

      // Eliminar de seguimientos
      const resDelete = await fetch(`/api/seguimientos/${selectedSeguimiento.id}`, { 
        method: 'DELETE' 
      })
      
      if (resDelete.ok) {
        alert(successMessage)
        handleCloseMoveModal()
        loadSeguimientos()
      } else {
        alert('⚠️ Se creó en el destino pero no se pudo eliminar de seguimientos.')
        handleCloseMoveModal()
        loadSeguimientos()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error al mover el seguimiento')
    }
  }

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`¿Eliminar el seguimiento "${titulo}"?`)) return

    try {
      const res = await fetch(`/api/seguimientos/${id}`, { method: 'DELETE' })
      if (res.ok) {
        loadSeguimientos()
      }
    } catch (error) {
      console.error('Error:', error)
    }
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
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleOpenMoveModal(seguimiento)}
                      title="Mover a otra sección"
                    >
                      <Move className="h-4 w-4 mr-1" />
                      Mover
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDelete(seguimiento.id, seguimiento.titulo)}
                      title="Eliminar seguimiento"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
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

      {/* Modal Mover Seguimiento */}
      <Modal
        isOpen={isMoveModalOpen}
        onClose={handleCloseMoveModal}
        title="Mover Seguimiento"
        size="lg"
      >
        {selectedSeguimiento && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                📅 {selectedSeguimiento.titulo}
              </h3>
              <p className="text-sm text-blue-700">
                {selectedSeguimiento.prospecto.nombre} - {selectedSeguimiento.prospecto.empresa}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Destino *</label>
              <select
                required
                value={moveData.destino}
                onChange={(e) => setMoveData({ ...moveData, destino: e.target.value, tipo: '' })}
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Selecciona el destino...</option>
                <option value="prospectos">💼 Prospectos - Volver a prospectación</option>
                <option value="interacciones">📞 Interacciones - Registrar comunicación</option>
                <option value="rconect">🔗 Rconect - Derivar por sectores</option>
              </select>
            </div>

            {moveData.destino && moveData.destino !== 'prospectos' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {moveData.destino === 'interacciones' ? 'Tipo de Interacción' : 'Sección de Rconect'} *
                </label>
                <select
                  required
                  value={moveData.tipo}
                  onChange={(e) => setMoveData({ ...moveData, tipo: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Selecciona el tipo...</option>
                  {moveData.destino === 'interacciones' && (
                    <>
                      <option value="LLAMADA">📞 Llamada</option>
                      <option value="EMAIL">✉️ Email</option>
                      <option value="WHATSAPP">💬 WhatsApp</option>
                      <option value="LINKEDIN">🔗 LinkedIn</option>
                    </>
                  )}
                  {moveData.destino === 'rconect' && (
                    <>
                      <option value="clinicas">🏥 Clínicas</option>
                      <option value="inmobiliarias">🏠 Inmobiliarias</option>
                      <option value="automocion">🚗 Automoción</option>
                      <option value="empresarial">💼 Empresarial</option>
                      <option value="otros">🏢 Otros</option>
                    </>
                  )}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Notas adicionales</label>
              <textarea
                value={moveData.notas}
                onChange={(e) => setMoveData({ ...moveData, notas: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows={3}
                placeholder="Agrega notas sobre el motivo del movimiento..."
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Importante:</strong> El seguimiento se moverá al destino seleccionado. 
                Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseMoveModal}>
                Cancelar
              </Button>
              <Button 
                onClick={handleMoveToSection}
                disabled={!moveData.destino || (moveData.destino !== 'prospectos' && !moveData.tipo)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Move className="h-4 w-4 mr-2" />
                Mover Seguimiento
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
