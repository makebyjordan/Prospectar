'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

interface Prospecto {
  id: string
  nombre: string
  empresa: string
  cargo?: string
  email?: string
  telefono?: string
  estado: string
  prioridad: string
  createdAt: string
}

export default function ProspectosPage() {
  const [prospectos, setProspectos] = useState<Prospecto[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    cargo: '',
    email: '',
    telefono: '',
    whatsapp: '',
    sector: '',
    fuenteOrigen: 'WEB',
    estado: 'NUEVO',
    prioridad: 'MEDIA'
  })

  useEffect(() => {
    loadProspectos()
  }, [search])

  const loadProspectos = async () => {
    try {
      const res = await fetch(`/api/prospectos?search=${search}`)
      if (res.ok) {
        const data = await res.json()
        setProspectos(data)
      }
    } catch (error) {
      console.error('Error loading prospectos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/prospectos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setIsModalOpen(false)
        setFormData({
          nombre: '',
          empresa: '',
          cargo: '',
          email: '',
          telefono: '',
          whatsapp: '',
          sector: '',
          fuenteOrigen: 'WEB',
          estado: 'NUEVO',
          prioridad: 'MEDIA'
        })
        loadProspectos()
      }
    } catch (error) {
      console.error('Error creating prospecto:', error)
    }
  }

  const getEstadoColor = (estado: string) => {
    const colors: Record<string, string> = {
      NUEVO: 'bg-blue-100 text-blue-800',
      CONTACTADO: 'bg-yellow-100 text-yellow-800',
      CUALIFICADO: 'bg-purple-100 text-purple-800',
      PROPUESTA: 'bg-orange-100 text-orange-800',
      GANADO: 'bg-green-100 text-green-800',
      PERDIDO: 'bg-red-100 text-red-800'
    }
    return colors[estado] || 'bg-gray-100 text-gray-800'
  }

  const getPrioridadColor = (prioridad: string) => {
    const colors: Record<string, string> = {
      BAJA: 'bg-gray-100 text-gray-600',
      MEDIA: 'bg-blue-100 text-blue-600',
      ALTA: 'bg-orange-100 text-orange-600',
      URGENTE: 'bg-red-100 text-red-600'
    }
    return colors[prioridad] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Prospectos</h1>
          <p className="text-gray-600 mt-1">Gestiona tus contactos y oportunidades</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Prospecto
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, empresa o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : prospectos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No hay prospectos. Crea tu primer prospecto para comenzar.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridad</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {prospectos.map((prospecto) => (
                <tr key={prospecto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{prospecto.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{prospecto.empresa}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {prospecto.email || prospecto.telefono || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoColor(prospecto.estado)}`}>
                      {prospecto.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPrioridadColor(prospecto.prioridad)}`}>
                      {prospecto.prioridad}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo Prospecto"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre *</label>
              <Input
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Empresa *</label>
              <Input
                required
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                placeholder="Nombre de la empresa"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cargo</label>
              <Input
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                placeholder="Ej: CEO, CTO"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sector</label>
              <Input
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                placeholder="Ej: Tecnología"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <Input
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                placeholder="+34 600 000 000"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">📍 Ciudad</label>
              <Input
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                placeholder="Ej: Madrid"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">📍 Provincia</label>
              <Input
                value={formData.provincia}
                onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                placeholder="Ej: Madrid"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">📍 País</label>
              <Input
                value={formData.pais}
                onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                placeholder="España"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
              >
                <option value="NUEVO">Nuevo</option>
                <option value="CONTACTADO">Contactado</option>
                <option value="CUALIFICADO">Cualificado</option>
                <option value="PROPUESTA">Propuesta</option>
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
            <div>
              <label className="block text-sm font-medium mb-1">Origen</label>
              <select
                value={formData.fuenteOrigen}
                onChange={(e) => setFormData({ ...formData, fuenteOrigen: e.target.value })}
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
              >
                <option value="WEB">Web</option>
                <option value="EMAIL">Email</option>
                <option value="LINKEDIN">LinkedIn</option>
                <option value="REFERIDO">Referido</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Prospecto
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
