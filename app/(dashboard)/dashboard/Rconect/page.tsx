'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Building2, Home, Car, Stethoscope, Briefcase, Users, ArrowRight, Eye, Trash2, Move } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

interface ContactoDerivado {
  id: string
  nombre: string
  empresa: string
  email?: string
  telefono?: string
  origen: string
  seccion: string
  fechaDerivacion: string
  estado: 'PENDIENTE' | 'CONTACTADO' | 'CERRADO'
  notas?: string
}

interface Seccion {
  id: string
  nombre: string
  icono: any
  color: string
  descripcion: string
  contactos: ContactoDerivado[]
}

export default function RconectPage() {
  const [secciones, setSecciones] = useState<Seccion[]>([
    {
      id: 'clinicas',
      nombre: 'Clínicas',
      icono: Stethoscope,
      color: 'bg-blue-500',
      descripcion: 'Contactos del sector salud y clínicas',
      contactos: []
    },
    {
      id: 'inmobiliarias',
      nombre: 'Inmobiliarias',
      icono: Home,
      color: 'bg-green-500',
      descripcion: 'Contactos del sector inmobiliario',
      contactos: []
    },
    {
      id: 'automocion',
      nombre: 'Automoción',
      icono: Car,
      color: 'bg-red-500',
      descripcion: 'Contactos del sector automotriz',
      contactos: []
    },
    {
      id: 'empresarial',
      nombre: 'Empresarial',
      icono: Briefcase,
      color: 'bg-purple-500',
      descripcion: 'Contactos del sector empresarial y B2B',
      contactos: []
    },
    {
      id: 'otros',
      nombre: 'Otros',
      icono: Building2,
      color: 'bg-gray-500',
      descripcion: 'Otros sectores y contactos diversos',
      contactos: []
    }
  ])

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [selectedContacto, setSelectedContacto] = useState<ContactoDerivado | null>(null)
  const [newContacto, setNewContacto] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    seccion: '',
    notas: ''
  })
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false)
  const [contactoAMover, setContactoAMover] = useState<ContactoDerivado | null>(null)
  const [moveData, setMoveData] = useState({
    destino: '',
    tipo: '',
    notas: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleAddContacto = () => {
    if (!newContacto.nombre || !newContacto.seccion) return

    const contacto: ContactoDerivado = {
      id: Date.now().toString(),
      nombre: newContacto.nombre,
      empresa: newContacto.empresa,
      email: newContacto.email,
      telefono: newContacto.telefono,
      origen: 'Manual',
      seccion: newContacto.seccion,
      fechaDerivacion: new Date().toISOString(),
      estado: 'PENDIENTE',
      notas: newContacto.notas
    }

    setSecciones(prev => prev.map(seccion => 
      seccion.id === newContacto.seccion 
        ? { ...seccion, contactos: [...seccion.contactos, contacto] }
        : seccion
    ))

    setNewContacto({ nombre: '', empresa: '', email: '', telefono: '', seccion: '', notas: '' })
    setIsModalOpen(false)
  }

  const handleDeleteContacto = (seccionId: string, contactoId: string) => {
    setSecciones(prev => prev.map(seccion => 
      seccion.id === seccionId 
        ? { ...seccion, contactos: seccion.contactos.filter(c => c.id !== contactoId) }
        : seccion
    ))
  }

  const getTotalContactos = () => {
    return secciones.reduce((total, seccion) => total + seccion.contactos.length, 0)
  }

  const getContactosPendientes = () => {
    return secciones.reduce((total, seccion) => 
      total + seccion.contactos.filter(c => c.estado === 'PENDIENTE').length, 0
    )
  }

  const handleOpenMoveModal = (contacto: ContactoDerivado) => {
    setContactoAMover(contacto)
    setMoveData({ destino: '', tipo: '', notas: '' })
    setIsMoveModalOpen(true)
  }

  const handleCloseMoveModal = () => {
    setIsMoveModalOpen(false)
    setContactoAMover(null)
    setMoveData({ destino: '', tipo: '', notas: '' })
  }

  const handleMoveToSection = async () => {
    if (!contactoAMover || !moveData.destino) {
      alert('⚠️ Selecciona un destino')
      return
    }

    try {
      const contactoData = contactoAMover
      
      // Preparar datos según el destino
      let dataToSend: any = {
        nombre: contactoData.nombre,
        empresa: contactoData.empresa,
        email: contactoData.email || '',
        telefono: contactoData.telefono || '',
        sector: '',
        ciudad: '',
        provincia: '',
        pais: '',
        fuenteOrigen: 'Rconect',
        prioridad: 'MEDIA',
        notas: moveData.notas || `Movido desde Rconect el ${new Date().toLocaleDateString()}`
      }

      let endpoint = ''
      let successMessage = ''

      // Configurar según destino
      switch (moveData.destino) {
        case 'prospectos':
          endpoint = '/api/prospectos'
          dataToSend = {
            ...dataToSend,
            estado: 'NUEVO',
            cargo: ''
          }
          successMessage = `✅ ${contactoData.nombre} movido a Prospectos`
          break

        case 'seguimientos':
          endpoint = '/api/seguimientos'
          dataToSend = {
            prospectoId: contactoData.prospectoId || '',
            tipo: moveData.tipo || 'LLAMADA',
            titulo: `Seguimiento: ${contactoData.nombre}`,
            descripcion: moveData.notas || `Seguimiento desde Rconect para ${contactoData.empresa}`,
            fechaProgramada: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            prioridad: 'MEDIA',
            estado: 'PENDIENTE'
          }
          successMessage = `✅ Seguimiento creado para ${contactoData.nombre}`
          break

        case 'interacciones':
          endpoint = '/api/interacciones'
          dataToSend = {
            prospectoId: contactoData.prospectoId || '',
            tipo: moveData.tipo || 'LLAMADA',
            asunto: `Contacto desde Rconect: ${contactoData.empresa}`,
            descripcion: moveData.notas || `Contacto derivado desde Rconect - ${contactoData.seccion}`,
            fecha: new Date().toISOString(),
            duracion: '',
            resultado: ''
          }
          successMessage = `✅ Interacción registrada para ${contactoData.nombre}`
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

      // Eliminar de Rconect (de la sección correspondiente)
      const seccionActual = secciones.find(s => s.contactos.some(c => c.id === contactoAMover.id))
      if (seccionActual) {
        handleDeleteContacto(seccionActual.id, contactoAMover.id)
      }
      
      alert(successMessage)
      handleCloseMoveModal()
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error al mover el contacto')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl">Cargando secciones...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rconect</h1>
          <p className="text-gray-600">Organiza tus contactos derivados por secciones</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-black hover:bg-gray-800 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Añadir Contacto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Contactos</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalContactos()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Secciones Activas</p>
              <p className="text-2xl font-bold text-gray-900">{secciones.filter(s => s.contactos.length > 0).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <ArrowRight className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">{getContactosPendientes()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar contactos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Secciones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {secciones.map((seccion) => {
          const Icon = seccion.icono
          const contactosFiltrados = seccion.contactos.filter(contacto =>
            contacto.nombre.toLowerCase().includes(search.toLowerCase()) ||
            contacto.empresa.toLowerCase().includes(search.toLowerCase())
          )

          return (
            <div key={seccion.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Header de la sección */}
              <div className={`${seccion.color} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon className="h-6 w-6 mr-3" />
                    <div>
                      <h3 className="font-semibold">{seccion.nombre}</h3>
                      <p className="text-sm opacity-90">{seccion.descripcion}</p>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 px-2 py-1 rounded-full">
                    <span className="text-sm font-medium">{contactosFiltrados.length}</span>
                  </div>
                </div>
              </div>

              {/* Lista de contactos */}
              <div className="p-4">
                {contactosFiltrados.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No hay contactos en esta sección
                  </p>
                ) : (
                  <div className="space-y-3">
                    {contactosFiltrados.slice(0, 3).map((contacto) => (
                      <div key={contacto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{contacto.nombre}</p>
                          <p className="text-xs text-gray-600">{contacto.empresa}</p>
                          <div className="flex items-center mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              contacto.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                              contacto.estado === 'CONTACTADO' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {contacto.estado}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenMoveModal(contacto)}
                            title="Mover a otra sección"
                          >
                            <Move className="h-3 w-3 text-green-600" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setIsContactModalOpen(true)
                            }}
                            title="Ver detalles"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteContacto(seccion.id, contacto.id)}
                            title="Eliminar contacto"
                          >
                            <Trash2 className="h-3 w-3 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {contactosFiltrados.length > 3 && (
                      <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-2">
                        Ver {contactosFiltrados.length - 3} más...
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal para añadir contacto */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Añadir Contacto">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <Input
              value={newContacto.nombre}
              onChange={(e) => setNewContacto({ ...newContacto, nombre: e.target.value })}
              placeholder="Nombre del contacto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <Input
              value={newContacto.empresa}
              onChange={(e) => setNewContacto({ ...newContacto, empresa: e.target.value })}
              placeholder="Nombre de la empresa"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                value={newContacto.email}
                onChange={(e) => setNewContacto({ ...newContacto, email: e.target.value })}
                placeholder="email@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <Input
                value={newContacto.telefono}
                onChange={(e) => setNewContacto({ ...newContacto, telefono: e.target.value })}
                placeholder="+34 600 000 000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sección *</label>
            <select
              value={newContacto.seccion}
              onChange={(e) => setNewContacto({ ...newContacto, seccion: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Seleccionar sección</option>
              {secciones.map((seccion) => (
                <option key={seccion.id} value={seccion.id}>{seccion.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
            <textarea
              value={newContacto.notas}
              onChange={(e) => setNewContacto({ ...newContacto, notas: e.target.value })}
              placeholder="Notas adicionales..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddContacto}
              className="flex-1 bg-black hover:bg-gray-800 text-white"
              disabled={!newContacto.nombre || !newContacto.seccion}
            >
              Añadir Contacto
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal para ver detalles del contacto */}
      <Modal 
        isOpen={isContactModalOpen} 
        onClose={() => {
          setIsContactModalOpen(false)
          setSelectedContacto(null)
        }} 
        title="Detalles del Contacto"
      >
        {selectedContacto && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <p className="text-sm text-gray-900">{selectedContacto.nombre}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Empresa</label>
                <p className="text-sm text-gray-900">{selectedContacto.empresa}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">{selectedContacto.email || 'No disponible'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <p className="text-sm text-gray-900">{selectedContacto.telefono || 'No disponible'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Origen</label>
                <p className="text-sm text-gray-900">{contactoAMover.origen}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  contactoAMover.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                  contactoAMover.estado === 'CONTACTADO' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {contactoAMover.estado}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Derivación</label>
              <p className="text-sm text-gray-900">
                {new Date(contactoAMover.fechaDerivacion).toLocaleDateString('es-ES')}
              </p>
            </div>
            {contactoAMover.notas && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Notas</label>
                <p className="text-sm text-gray-900">{contactoAMover.notas}</p>
              </div>
            )}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => {
                  setIsContactModalOpen(false)
                }}
                variant="outline"
                className="flex-1"
              >
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Mover Contacto */}
      <Modal
        isOpen={isMoveModalOpen}
        onClose={handleCloseMoveModal}
        title="Mover Contacto"
        size="lg"
      >
        {contactoAMover && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                🔗 {contactoAMover.nombre} - {contactoAMover.empresa}
              </h3>
              <p className="text-sm text-blue-700">
                Sección actual: {contactoAMover.seccion} | Estado: {contactoAMover.estado}
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
                <option value="prospectos">💼 Prospectos - Convertir en prospecto</option>
                <option value="seguimientos">📅 Seguimientos - Programar seguimiento</option>
                <option value="interacciones">📞 Interacciones - Registrar comunicación</option>
              </select>
            </div>

            {moveData.destino && moveData.destino !== 'prospectos' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {moveData.destino === 'seguimientos' ? 'Tipo de Seguimiento' : 'Tipo de Interacción'} *
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
                  {moveData.destino === 'interacciones' && (
                    <>
                      <option value="LLAMADA">📞 Llamada</option>
                      <option value="EMAIL">✉️ Email</option>
                      <option value="WHATSAPP">💬 WhatsApp</option>
                      <option value="LINKEDIN">🔗 LinkedIn</option>
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
                ⚠️ <strong>Importante:</strong> El contacto se moverá de Rconect al destino seleccionado. 
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
                Mover Contacto
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
