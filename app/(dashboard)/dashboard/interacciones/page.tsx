'use client'

import { useState, useEffect } from 'react'
import { Phone, Mail, MessageCircle, Plus, Filter, Search, Edit, Trash2, ExternalLink, Eye, Move } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

interface Interaccion {
  id: string
  prospectoId: string
  prospectoNombre: string
  tipo: 'LLAMADA' | 'EMAIL' | 'WHATSAPP' | 'LINKEDIN'
  asunto: string
  descripcion: string
  fecha: string
  duracion?: string
  resultado?: string
  createdAt: string
}

export default function InteraccionesPage() {
  const [interacciones, setInteracciones] = useState<Interaccion[]>([])
  const [prospectos, setProspectos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tipoModal, setTipoModal] = useState<'LLAMADA' | 'EMAIL' | 'WHATSAPP' | null>(null)
  const [search, setSearch] = useState('')
  const [filterTipo, setFilterTipo] = useState('TODOS')
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [selectedProspectoInfo, setSelectedProspectoInfo] = useState<any>(null)
  const [formData, setFormData] = useState({
    prospectoId: '',
    tipo: 'LLAMADA' as 'LLAMADA' | 'EMAIL' | 'WHATSAPP',
    asunto: '',
    descripcion: '',
    duracion: '',
    resultado: ''
  })
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false)
  const [selectedInteraccion, setSelectedInteraccion] = useState<Interaccion | null>(null)
  const [moveData, setMoveData] = useState({
    destino: '',
    tipo: '',
    notas: ''
  })

  const [stats, setStats] = useState({
    llamadas: 0,
    emails: 0,
    whatsapp: 0,
    linkedin: 0
  })

  useEffect(() => {
    loadInteracciones()
    loadProspectos()
  }, [search, filterTipo])

  const loadInteracciones = async () => {
    try {
      const params = new URLSearchParams({ search, tipo: filterTipo })
      const res = await fetch(`/api/interacciones?${params}`)
      if (res.ok) {
        const data = await res.json()
        setInteracciones(data)
        
        // Calcular stats
        const llamadas = data.filter((i: Interaccion) => i.tipo === 'LLAMADA').length
        const emails = data.filter((i: Interaccion) => i.tipo === 'EMAIL').length
        const whatsapp = data.filter((i: Interaccion) => i.tipo === 'WHATSAPP').length
        const linkedin = data.filter((i: Interaccion) => i.tipo === 'LINKEDIN').length
        setStats({ llamadas, emails, whatsapp, linkedin })
      }
    } catch (error) {
      console.error('Error loading interacciones:', error)
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
      console.error('Error loading prospectos:', error)
    }
  }

  const handleOpenModal = (tipo: 'LLAMADA' | 'EMAIL' | 'WHATSAPP') => {
    setTipoModal(tipo)
    setFormData({ ...formData, tipo })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTipoModal(null)
    setFormData({
      prospectoId: '',
      tipo: 'LLAMADA',
      asunto: '',
      descripcion: '',
      duracion: '',
      resultado: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validar datos antes de enviar
      if (!formData.prospectoId) {
        alert('❌ Debes seleccionar un prospecto')
        return
      }
      if (!formData.asunto.trim()) {
        alert('❌ El asunto es obligatorio')
        return
      }
      if (!formData.descripcion.trim()) {
        alert('❌ La descripción es obligatoria')
        return
      }

      const prospecto = prospectos.find(p => p.id === formData.prospectoId)
      
      // Si es WhatsApp, abrir WhatsApp Web
      if (formData.tipo === 'WHATSAPP' && prospecto?.telefono) {
        const telefono = prospecto.telefono.replace(/[^0-9]/g, '')
        const mensaje = encodeURIComponent(formData.descripcion || '')
        window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank')
      }
      
      // Si es Email, abrir cliente de email al prospecto
      if (formData.tipo === 'EMAIL') {
        if (prospecto?.email) {
          const subject = encodeURIComponent(formData.asunto)
          const body = encodeURIComponent(formData.descripcion)
          window.open(`mailto:${prospecto.email}?subject=${subject}&body=${body}`, '_blank')
        } else {
          alert('❌ Este prospecto no tiene email registrado')
          return
        }
      }
      
      // NO abrir tel: para llamadas, solo registrar

      console.log('Enviando datos:', formData) // Para debug

      // Registrar la interacción
      const res = await fetch('/api/interacciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        alert('✅ Interacción registrada exitosamente')
        handleCloseModal()
        loadInteracciones()
      } else {
        const errorData = await res.json()
        console.error('Error response:', errorData)
        alert(`❌ Error al registrar la interacción: ${errorData.error || 'Error desconocido'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error al registrar la interacción')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta interacción?')) return

    try {
      const res = await fetch(`/api/interacciones/${id}`, { method: 'DELETE' })
      if (res.ok) {
        loadInteracciones()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleViewProspectoInfo = () => {
    const prospecto = prospectos.find(p => p.id === formData.prospectoId)
    if (prospecto) {
      setSelectedProspectoInfo(prospecto)
      setIsInfoModalOpen(true)
    }
  }

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false)
    setSelectedProspectoInfo(null)
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'LLAMADA': return <Phone className="h-4 w-4" />
      case 'EMAIL': return <Mail className="h-4 w-4" />
      case 'WHATSAPP': return <MessageCircle className="h-4 w-4" />
      default: return <ExternalLink className="h-4 w-4" />
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'LLAMADA': return 'bg-blue-100 text-blue-800'
      case 'EMAIL': return 'bg-green-100 text-green-800'
      case 'WHATSAPP': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEstadoColor = (estado: string) => {
    const colors: Record<string, string> = {
      NUEVO: 'bg-blue-100 text-blue-800',
      CONTACTADO: 'bg-yellow-100 text-yellow-800',
      CUALIFICADO: 'bg-green-100 text-green-800',
      PROPUESTA: 'bg-purple-100 text-purple-800',
      GANADO: 'bg-green-600 text-white',
      PERDIDO: 'bg-red-100 text-red-800'
    }
    return colors[estado] || 'bg-gray-100 text-gray-800'
  }

  const getPrioridadColor = (prioridad: string) => {
    const colors: Record<string, string> = {
      BAJA: 'bg-gray-100 text-gray-800',
      MEDIA: 'bg-blue-100 text-blue-800',
      ALTA: 'bg-orange-100 text-orange-800',
      URGENTE: 'bg-red-100 text-red-800'
    }
    return colors[prioridad] || 'bg-gray-100 text-gray-800'
  }

  const handleOpenMoveModal = (interaccion: Interaccion) => {
    setSelectedInteraccion(interaccion)
    setMoveData({ destino: '', tipo: '', notas: '' })
    setIsMoveModalOpen(true)
  }

  const handleCloseMoveModal = () => {
    setIsMoveModalOpen(false)
    setSelectedInteraccion(null)
    setMoveData({ destino: '', tipo: '', notas: '' })
  }

  const handleMoveToSection = async () => {
    if (!selectedInteraccion || !moveData.destino) {
      alert('⚠️ Selecciona un destino')
      return
    }

    try {
      const interaccionData = selectedInteraccion
      
      // Preparar datos según el destino
      let dataToSend: any = {
        nombre: interaccionData.prospectoNombre,
        empresa: '',
        email: '',
        telefono: '',
        sector: '',
        ciudad: '',
        provincia: '',
        pais: '',
        fuenteOrigen: 'Interacciones',
        prioridad: 'MEDIA',
        notas: moveData.notas || `Movido desde Interacciones el ${new Date().toLocaleDateString()}`
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
          successMessage = `✅ ${interaccionData.prospectoNombre} movido a Prospectos`
          break

        case 'seguimientos':
          endpoint = '/api/seguimientos'
          dataToSend = {
            prospectoId: interaccionData.prospectoId,
            tipo: moveData.tipo || 'LLAMADA',
            titulo: `Seguimiento: ${interaccionData.asunto}`,
            descripcion: moveData.notas || `Seguimiento desde interacción: ${interaccionData.descripcion}`,
            fechaProgramada: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            prioridad: 'MEDIA',
            estado: 'PENDIENTE'
          }
          successMessage = `✅ Seguimiento creado para ${interaccionData.prospectoNombre}`
          break

        case 'rconect':
          endpoint = '/api/rconect'
          dataToSend = {
            ...dataToSend,
            seccion: moveData.tipo || 'otros',
            origen: 'Interacciones',
            estado: 'PENDIENTE',
            prospectoId: interaccionData.prospectoId
          }
          successMessage = `✅ ${interaccionData.prospectoNombre} movido a Rconect`
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

      // Eliminar de interacciones
      const resDelete = await fetch(`/api/interacciones/${selectedInteraccion.id}`, { 
        method: 'DELETE' 
      })
      
      if (resDelete.ok) {
        alert(successMessage)
        handleCloseMoveModal()
        loadInteracciones()
      } else {
        alert('⚠️ Se creó en el destino pero no se pudo eliminar de interacciones.')
        handleCloseMoveModal()
        loadInteracciones()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error al mover la interacción')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Interacciones</h1>
          <p className="text-gray-600 mt-1">Registra todas las comunicaciones con tus prospectos</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Llamadas</h3>
            <span className="text-2xl">📞</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.llamadas}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Emails</h3>
            <span className="text-2xl">✉️</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.emails}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">WhatsApp</h3>
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats.whatsapp}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">LinkedIn</h3>
            <span className="text-2xl">🔗</span>
          </div>
          <p className="text-3xl font-bold text-orange-600">{stats.linkedin}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={() => handleOpenModal('LLAMADA')}
          className="h-20 text-base"
          variant="outline"
        >
          <Phone className="h-5 w-5 mr-2" />
          Registrar Llamada
        </Button>
        <Button 
          onClick={() => handleOpenModal('EMAIL')}
          className="h-20 text-base"
          variant="outline"
        >
          <Mail className="h-5 w-5 mr-2" />
          Enviar Email
        </Button>
        <Button 
          onClick={() => handleOpenModal('WHATSAPP')}
          className="h-20 text-base"
          variant="outline"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Enviar WhatsApp
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar interacciones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="h-10 px-3 border border-gray-300 rounded-md text-sm"
          >
            <option value="TODOS">Todos los tipos</option>
            <option value="LLAMADA">Llamadas</option>
            <option value="EMAIL">Emails</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="LINKEDIN">LinkedIn</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-lg shadow-sm border">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : interacciones.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay interacciones. Registra tu primera comunicación.
          </div>
        ) : (
          <div className="divide-y">
            {interacciones.map((interaccion) => (
              <div key={interaccion.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getTipoColor(interaccion.tipo)}`}>
                        {getTipoIcon(interaccion.tipo)}
                        {interaccion.tipo}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {interaccion.prospectoNombre}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(interaccion.fecha).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {interaccion.asunto}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {interaccion.descripcion}
                    </p>
                    {interaccion.duracion && (
                      <p className="text-xs text-gray-500 mt-1">
                        Duración: {interaccion.duracion}
                      </p>
                    )}
                    {interaccion.resultado && (
                      <p className="text-xs text-gray-500">
                        Resultado: {interaccion.resultado}
                      </p>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(interaccion.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`${tipoModal === 'LLAMADA' ? 'Registrar Llamada' : tipoModal === 'EMAIL' ? 'Enviar Email' : 'Enviar WhatsApp'}`}
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
              <option value="">Selecciona un prospecto</option>
              {prospectos.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre} - {p.empresa} {p.telefono ? `- ${p.telefono}` : ''}
                </option>
              ))}
            </select>
            {formData.prospectoId && (
              <Button
                type="button"
                variant="outline"
                onClick={handleViewProspectoInfo}
                className="mt-2 w-full"
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver información del prospecto
              </Button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {tipoModal === 'EMAIL' ? 'Asunto' : tipoModal === 'LLAMADA' ? 'Servicios interesados' : 'Título'} *
            </label>
            <Input
              required
              value={formData.asunto}
              onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
              placeholder={tipoModal === 'EMAIL' ? 'Asunto del email' : 'Resumen breve'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {tipoModal === 'EMAIL' ? 'Mensaje' : tipoModal === 'WHATSAPP' ? 'Mensaje' : 'Descripción'} *
            </label>
            <textarea
              required
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder={tipoModal === 'LLAMADA' ? 'Notas de la llamada' : 'Contenido del mensaje'}
            />
          </div>

          {tipoModal === 'LLAMADA' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Duración</label>
                <Input
                  value={formData.duracion}
                  onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                  placeholder="Ej: 15 minutos"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Resultado</label>
                <Input
                  value={formData.resultado}
                  onChange={(e) => setFormData({ ...formData, resultado: e.target.value })}
                  placeholder="Ej: Interesado, programar seguimiento"
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit">
              {tipoModal === 'LLAMADA' ? 'Registrar Llamada' : tipoModal === 'EMAIL' ? 'Abrir Email' : 'Abrir WhatsApp'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Información del Prospecto */}
      <Modal
        isOpen={isInfoModalOpen}
        onClose={handleCloseInfoModal}
        title="Información del Prospecto"
        size="lg"
      >
        {selectedProspectoInfo && (
          <div className="space-y-6">
            {/* Información Personal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b">
                👤 Información Personal
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Nombre</label>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedProspectoInfo.nombre || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Cargo</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspectoInfo as any).cargo || '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b">
                🏢 Empresa
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Nombre de la Empresa</label>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedProspectoInfo.empresa || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Sector</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspectoInfo as any).sector || '-'}
                  </p>
                </div>
              </div>
            </div>
            {/* Contacto */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b">
                📞 Contacto
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Teléfono</label>
                  <p className="text-sm text-gray-900">
                    {selectedProspectoInfo.telefono || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-sm text-gray-900">
                    {selectedProspectoInfo.email || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">WhatsApp</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspectoInfo as any).whatsapp || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Página Web</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspectoInfo as any).website ? (
                      <a 
                        href={(selectedProspectoInfo as any).website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {(selectedProspectoInfo as any).website}
                      </a>
                    ) : '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b">
                📍 Ubicación
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Ciudad</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspectoInfo as any).ciudad || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Provincia</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspectoInfo as any).provincia || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">País</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspectoInfo as any).pais || '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Estado y Prioridad */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b">
                📊 Estado
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Estado</label>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getEstadoColor(selectedProspectoInfo.estado)}`}>
                    {selectedProspectoInfo.estado}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Prioridad</label>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getPrioridadColor(selectedProspectoInfo.prioridad)}`}>
                    {selectedProspectoInfo.prioridad}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Origen</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspectoInfo as any).fuenteOrigen || 'WEB'}
                  </p>
                </div>
              </div>
            </div>

            {/* Botón Cerrar */}
            <div className="flex justify-end pt-4">
              <Button onClick={handleCloseInfoModal}>
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Mover Interacción */}
      <Modal
        isOpen={isMoveModalOpen}
        onClose={handleCloseMoveModal}
        title="Mover Interacción"
        size="lg"
      >
        {selectedInteraccion && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                📞 {selectedInteraccion.asunto}
              </h3>
              <p className="text-sm text-blue-700">
                {selectedInteraccion.prospectoNombre} - {selectedInteraccion.tipo}
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
                <option value="seguimientos">📅 Seguimientos - Programar seguimiento</option>
                <option value="rconect">🔗 Rconect - Derivar por sectores</option>
              </select>
            </div>

            {moveData.destino && moveData.destino !== 'prospectos' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {moveData.destino === 'seguimientos' ? 'Tipo de Seguimiento' : 'Sección de Rconect'} *
                </label>
                <select
                  required
                  value={moveData.tipo}
                  onChange={(e) => setMoveData({ ...moveData, tipo: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Selecciona el tipo...</option>
                  {moveData.destino === 'seguimientos' && (
                    <>
                      <option value="LLAMADA">📞 Llamada</option>
                      <option value="EMAIL">✉️ Email</option>
                      <option value="WHATSAPP">💬 WhatsApp</option>
                      <option value="REUNION">📅 Reunión</option>
                      <option value="TAREA">✅ Tarea</option>
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
                ⚠️ <strong>Importante:</strong> La interacción se moverá al destino seleccionado. 
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
                Mover Interacción
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
