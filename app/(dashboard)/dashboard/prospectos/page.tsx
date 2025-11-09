'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Upload, FileText, Link as LinkIcon, ArrowRight, Eye } from 'lucide-react'
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
  const [showFilters, setShowFilters] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importType, setImportType] = useState<'csv' | 'pdf' | 'sheets' | null>(null)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [sheetsUrl, setSheetsUrl] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [parsedData, setParsedData] = useState<any[]>([])
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({})
  const [importing, setImporting] = useState(false)
  const [importGeneralData, setImportGeneralData] = useState({
    sector: '',
    fuenteOrigen: 'WEB',
    estado: 'NUEVO',
    prioridad: 'MEDIA'
  })
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [selectedProspecto, setSelectedProspecto] = useState<any>(null)
  const [filters, setFilters] = useState({
    estado: 'TODOS',
    prioridad: 'TODAS',
    ubicacion: '',
    orderBy: 'createdAt',
    orderDir: 'desc'
  })
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    cargo: '',
    email: '',
    telefono: '',
    whatsapp: '',
    sector: '',
    ciudad: '',
    provincia: '',
    pais: '',
    fuenteOrigen: 'WEB',
    estado: 'NUEVO',
    prioridad: 'MEDIA'
  })

  useEffect(() => {
    loadProspectos()
  }, [search, filters])

  const loadProspectos = async () => {
    try {
      const params = new URLSearchParams({
        search,
        estado: filters.estado,
        prioridad: filters.prioridad,
        ubicacion: filters.ubicacion,
        orderBy: filters.orderBy,
        orderDir: filters.orderDir
      })
      const res = await fetch(`/api/prospectos?${params}`)
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

  const handleEdit = (prospecto: Prospecto) => {
    setEditingId(prospecto.id)
    setFormData({
      nombre: prospecto.nombre,
      empresa: prospecto.empresa,
      cargo: prospecto.cargo || '',
      email: prospecto.email || '',
      telefono: prospecto.telefono || '',
      whatsapp: '',
      sector: '',
      ciudad: (prospecto as any).ciudad || '',
      provincia: (prospecto as any).provincia || '',
      pais: (prospecto as any).pais || '',
      fuenteOrigen: (prospecto as any).fuenteOrigen || 'WEB',
      estado: prospecto.estado,
      prioridad: prospecto.prioridad
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿ Estás seguro de eliminar a ${nombre}?\nEsta acción no se puede deshacer.`)) {
      return
    }
    try {
      const res = await fetch(`/api/prospectos/${id}`, { method: 'DELETE' })
      if (res.ok) {
        loadProspectos()
      } else {
        alert('Error al eliminar el prospecto')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar el prospecto')
    }
  }

  const handleMoveToSeguimiento = async (prospecto: Prospecto) => {
    if (!confirm(`¿Mover a ${prospecto.nombre} a Seguimiento?`)) {
      return
    }

    try {
      // Usar los datos del prospecto directamente (ya están disponibles)
      const prospectoData = prospecto as any
      
      // Crear seguimiento con los datos del prospecto
      const seguimientoData = {
        nombre: prospectoData.nombre,
        empresa: prospectoData.empresa,
        cargo: prospectoData.cargo || '',
        email: prospectoData.email || '',
        telefono: prospectoData.telefono || '',
        whatsapp: prospectoData.whatsapp || '',
        sector: prospectoData.sector || '',
        ciudad: prospectoData.ciudad || '',
        provincia: prospectoData.provincia || '',
        pais: prospectoData.pais || '',
        website: prospectoData.website || '',
        fuenteOrigen: prospectoData.fuenteOrigen || 'WEB',
        estado: 'ACTIVO',
        prioridad: prospectoData.prioridad || 'MEDIA',
        notas: `Movido desde Prospectos el ${new Date().toLocaleDateString()}`
      }

      // Crear el seguimiento
      const resCreate = await fetch('/api/seguimiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seguimientoData)
      })

      if (!resCreate.ok) {
        alert('Error al crear el seguimiento')
        return
      }

      // Eliminar de prospectos
      const resDelete = await fetch(`/api/prospectos/${prospecto.id}`, { method: 'DELETE' })
      
      if (resDelete.ok) {
        alert(`✅ ${prospecto.nombre} se movió a Seguimiento exitosamente`)
        loadProspectos()
      } else {
        alert('⚠️ El seguimiento se creó pero no se pudo eliminar de prospectos. Elimínalo manualmente.')
        loadProspectos()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error al mover a seguimiento')
    }
  }

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode)
    setSelectedIds([])
  }

  const toggleSelectProspecto = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === prospectos.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(prospectos.map(p => p.id))
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      alert('⚠️ No hay prospectos seleccionados')
      return
    }

    if (!confirm(`¿ Estás seguro de eliminar ${selectedIds.length} prospecto(s)?\nEsta acción no se puede deshacer.`)) {
      return
    }

    try {
      let deletedCount = 0
      for (const id of selectedIds) {
        const res = await fetch(`/api/prospectos/${id}`, { method: 'DELETE' })
        if (res.ok) deletedCount++
      }

      alert(`✅ Se eliminaron ${deletedCount} de ${selectedIds.length} prospectos exitosamente`)
      setSelectedIds([])
      setSelectionMode(false)
      loadProspectos()
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error al eliminar los prospectos')
    }
  }

  const handleViewInfo = (prospecto: any) => {
    setSelectedProspecto(prospecto)
    setIsInfoModalOpen(true)
  }

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false)
    setSelectedProspecto(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setFormData({
      nombre: '',
      empresa: '',
      cargo: '',
      email: '',
      telefono: '',
      whatsapp: '',
      sector: '',
      ciudad: '',
      provincia: '',
      pais: '',
      fuenteOrigen: 'WEB',
      estado: 'NUEVO',
      prioridad: 'MEDIA'
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/prospectos/${editingId}` : '/api/prospectos'
      const method = editingId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        handleCloseModal()
        loadProspectos()
      }
    } catch (error) {
      console.error('Error:', error)
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

  const handleParseFile = async () => {
    if (!importType) {
      alert('Por favor selecciona un tipo de importación')
      return
    }

    if (importType === 'csv' && !importFile) {
      alert('Por favor selecciona un archivo CSV')
      return
    }

    if (importType === 'sheets' && !sheetsUrl) {
      alert('Por favor ingresa la URL de Google Sheets')
      return
    }

    try {
      // Importar desde Google Sheets
      if (importType === 'sheets' && sheetsUrl) {
        try {
          // Convertir URL de Google Sheets a CSV exportable
          let csvUrl = sheetsUrl
          
          // Si es una URL normal de Google Sheets, convertirla a export CSV
          if (sheetsUrl.includes('docs.google.com/spreadsheets')) {
            const sheetId = sheetsUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
            if (sheetId) {
              csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`
            }
          }
          
          console.log('Fetching Google Sheets from:', csvUrl)
          const response = await fetch(csvUrl)
          
          if (!response.ok) {
            throw new Error('No se pudo acceder a Google Sheets. Asegúrate de que el archivo sea público.')
          }
          
          const text = await response.text()
          console.log('Google Sheets CSV text:', text.substring(0, 500))
          
          // Procesar igual que CSV
          await processCSVText(text)
        } catch (error) {
          console.error('Error fetching Google Sheets:', error)
          alert(`❌ Error al importar desde Google Sheets: ${error}\n\nAsegúrate de que:\n1. El enlace sea correcto\n2. El archivo sea público o compartido\n3. Tengas permisos de acceso`)
          return
        }
      }
      
      // Importar desde PDF
      else if (importType === 'pdf' && importFile) {
        alert('📄 Para importar desde PDF:\n\n✅ OPCIÓN 1 (Recomendada):\n1. Abre tu PDF\n2. Copia los datos a Google Sheets\n3. Haz el archivo público\n4. Usa la opción "Google Sheets" arriba\n\n✅ OPCIÓN 2:\n1. Abre tu PDF\n2. Copia los datos a Excel\n3. Exporta como CSV\n4. Usa la opción "CSV" arriba\n\n💡 Próximamente: Importación automática de PDF')
        return
      }
      
      // Importar desde CSV
      else if (importType === 'csv' && importFile) {
        const text = await importFile.text()
        await processCSVText(text)
      }
    } catch (error) {
      console.error('Error parsing file:', error)
      alert(`❌ Error al procesar el archivo: ${error}\n\nRevisa la consola del navegador para más detalles.`)
    }
  }

  // Función auxiliar para procesar texto CSV
  const processCSVText = async (text: string) => {
    console.log('Raw CSV text:', text.substring(0, 500))
    
    // Detectar separador (coma, punto y coma, tab)
    const firstLine = text.split('\n')[0]
    let separator = ','
    if (firstLine.includes(';')) separator = ';'
    if (firstLine.includes('\t')) separator = '\t'
    
    console.log('Separator detected:', separator)
    
    // Función para parsear CSV correctamente (maneja comillas)
    const parseCSVLine = (line: string, sep: string): string[] => {
      const result = []
      let current = ''
      let inQuotes = false
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        const nextChar = line[i + 1]
        
        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"'
            i++
          } else {
            inQuotes = !inQuotes
          }
        } else if (char === sep && !inQuotes) {
          result.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      result.push(current.trim())
      return result
    }
    
    const lines = text.split('\n').filter(line => line.trim())
    console.log('Total lines:', lines.length)
    
    if (lines.length < 2) {
      alert('⚠️ El archivo está vacío o no tiene datos. Asegúrate de que tenga al menos una fila de encabezados y una fila de datos.')
      return
    }
    
    const headers = parseCSVLine(lines[0], separator)
    console.log('Headers found:', headers)
    
    // Mapeo de columnas con prioridad (orden importa)
    const fieldMappings = [
      { field: 'nombre', patterns: ['nombre', 'name', 'contact', 'contacto', 'persona'] },
      { field: 'empresa', patterns: ['empresa', 'company', 'compañia', 'business', 'organization'] },
      { field: 'cargo', patterns: ['cargo', 'position', 'puesto', 'job', 'title', 'rol'] },
      { field: 'email', patterns: ['email', 'e-mail', 'correo', 'mail'] },
      { field: 'telefono', patterns: ['telefono', 'teléfono', 'phone', 'tel', 'celular', 'movil', 'móvil', 'whatsapp'] },
      { field: 'ciudad', patterns: ['ciudad', 'city', 'localidad', 'municipio'] },
      { field: 'provincia', patterns: ['provincia', 'state', 'region', 'comunidad'] },
      { field: 'pais', patterns: ['pais', 'país', 'country'] },
      { field: 'website', patterns: ['web', 'website', 'url', 'sitio'] }
    ]
    
    // Crear mapeo columna -> campo
    const columnToField: Record<number, string> = {}
    const mapping: Record<string, string> = {}
    
    headers.forEach((header, index) => {
      const lower = header.toLowerCase().trim()
      
      for (const { field, patterns } of fieldMappings) {
        if (patterns.some(pattern => lower.includes(pattern))) {
          columnToField[index] = field
          mapping[field] = header
          break // Solo mapear a un campo
        }
      }
    })
    
    console.log('Column mapping:', mapping)
    console.log('Column to field:', columnToField)
    
    if (Object.keys(mapping).length === 0) {
      alert(`⚠️ No se detectaron columnas reconocibles.\n\nColumnas encontradas: ${headers.join(', ')}\n\nAsegúrate de que el CSV tenga columnas como: Nombre, Empresa, Email, Teléfono`)
      return
    }
    
    const prospectos = []
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      
      const values = parseCSVLine(line, separator)
      
      const prospecto: any = {
        ...importGeneralData,
        nombre: '',
        empresa: ''
      }
      
      // Asignar valores según el mapeo
      values.forEach((value, index) => {
        const field = columnToField[index]
        if (field && value) {
          prospecto[field] = value.trim()
        }
      })
      
      console.log('Processed row:', prospecto)
      
      if (prospecto.nombre || prospecto.empresa) {
        prospectos.push(prospecto)
      }
    }

    console.log('Parsed prospectos:', prospectos)
    console.log('Total prospectos:', prospectos.length)
    
    if (prospectos.length === 0) {
      alert('⚠️ No se encontraron prospectos válidos en el archivo.\n\nVerifica que las filas tengan datos en las columnas de Nombre o Empresa.')
      return
    }
    
    setParsedData(prospectos)
    setColumnMapping(mapping)
    setShowPreview(true)
  }

  const handleConfirmImport = async () => {
    setImporting(true)
    try {
      let importedCount = 0
      // Enviar prospectos al backend
      for (const prospecto of parsedData) {
        const res = await fetch('/api/prospectos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prospecto)
        })
        if (res.ok) importedCount++
      }

      alert(`✅ Se importaron ${importedCount} de ${parsedData.length} prospectos exitosamente`)
      setIsImportModalOpen(false)
      setImportType(null)
      setImportFile(null)
      setSheetsUrl('')
      setShowPreview(false)
      setParsedData([])
      setColumnMapping({})
      loadProspectos()
    } catch (error) {
      console.error('Error importing:', error)
      alert('❌ Error al importar prospectos. Revisa la consola para más detalles.')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Prospectos</h1>
          <p className="text-gray-600 mt-1">Gestiona tus contactos y oportunidades</p>
        </div>
        <div className="flex gap-3">
          {selectionMode ? (
            <>
              <Button 
                variant="outline" 
                onClick={toggleSelectionMode}
              >
                Cancelar
              </Button>
              {selectedIds.length > 0 && (
                <Button 
                  variant="destructive"
                  onClick={handleDeleteSelected}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar ({selectedIds.length})
                </Button>
              )}
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={toggleSelectionMode}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Borrar
              </Button>
              <Button variant="outline" onClick={() => setIsImportModalOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Importar Prospectos
              </Button>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Prospecto
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
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
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filtros {showFilters ? '▲' : '▼'}
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-2 block">Estado</label>
              <select
                value={filters.estado}
                onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
                className="w-full h-9 px-3 border border-gray-300 rounded-md text-sm"
              >
                <option value="TODOS">Todos los estados</option>
                <option value="NUEVO">Nuevo</option>
                <option value="CONTACTADO">Contactado</option>
                <option value="CUALIFICADO">Cualificado</option>
                <option value="PROPUESTA">Propuesta</option>
                <option value="GANADO">Ganado</option>
                <option value="PERDIDO">Perdido</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 mb-2 block">Prioridad</label>
              <select
                value={filters.prioridad}
                onChange={(e) => setFilters({ ...filters, prioridad: e.target.value })}
                className="w-full h-9 px-3 border border-gray-300 rounded-md text-sm"
              >
                <option value="TODAS">Todas las prioridades</option>
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 mb-2 block">Ubicación</label>
              <Input
                placeholder="Ciudad, provincia o país"
                value={filters.ubicacion}
                onChange={(e) => setFilters({ ...filters, ubicacion: e.target.value })}
                className="h-9"
              />
            </div>
          </div>
        )}
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {selectionMode && (
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === prospectos.length && prospectos.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                      />
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ciudad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provincia</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sector</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origen</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridad</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {prospectos.map((prospecto) => (
                  <tr key={prospecto.id} className={`hover:bg-gray-50 ${selectedIds.includes(prospecto.id) ? 'bg-blue-50' : ''}`}>
                    {selectionMode && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(prospecto.id)}
                          onChange={() => toggleSelectProspecto(prospecto.id)}
                          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                        />
                      </td>
                    )}
                    <td className="px-4 py-3 text-sm text-gray-500">{prospecto.empresa}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{(prospecto as any).ciudad || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{(prospecto as any).provincia || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{prospecto.telefono || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{prospecto.email || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{(prospecto as any).sector || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{(prospecto as any).fuenteOrigen || 'WEB'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEstadoColor(prospecto.estado)}`}>
                        {prospecto.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPrioridadColor(prospecto.prioridad)}`}>
                        {prospecto.prioridad}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => handleViewInfo(prospecto)}
                      title="Ver información"
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => handleEdit(prospecto)}
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => handleMoveToSeguimiento(prospecto)}
                      title="Mover a Seguimiento"
                    >
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => handleDelete(prospecto.id, prospecto.nombre)}
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? "Editar Prospecto" : "Nuevo Prospecto"}
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
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit">
              {editingId ? 'Guardar Cambios' : 'Crear Prospecto'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de Importación */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false)
          setImportType(null)
          setImportFile(null)
          setSheetsUrl('')
        }}
        title="Importar Prospectos"
        size="lg"
      >
        <div className="space-y-6">
          {/* Selección de tipo de importación */}
          <div>
            <label className="block text-sm font-medium mb-3">Selecciona el tipo de importación</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setImportType('csv')}
                className={`p-4 border-2 rounded-lg hover:border-blue-500 transition-colors ${
                  importType === 'csv' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium">CSV</div>
              </button>
              
              <button
                type="button"
                onClick={() => setImportType('pdf')}
                className={`p-4 border-2 rounded-lg hover:border-blue-500 transition-colors ${
                  importType === 'pdf' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <FileText className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <div className="text-sm font-medium">PDF</div>
              </button>
              
              <button
                type="button"
                onClick={() => setImportType('sheets')}
                className={`p-4 border-2 rounded-lg hover:border-blue-500 transition-colors ${
                  importType === 'sheets' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <LinkIcon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">Google Sheets</div>
              </button>
            </div>
          </div>

          {/* Upload de archivo o URL */}
          {importType && (
            <div>
              {(importType === 'csv' || importType === 'pdf') && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subir archivo {importType.toUpperCase()}
                  </label>
                  <input
                    type="file"
                    accept={importType === 'csv' ? '.csv' : '.pdf'}
                    onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  {importFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      Archivo seleccionado: {importFile.name}
                    </p>
                  )}
                </div>
              )}

              {importType === 'sheets' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    URL de Google Sheets
                  </label>
                  <Input
                    type="url"
                    value={sheetsUrl}
                    onChange={(e) => setSheetsUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Asegúrate de que el archivo sea público o compartido
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Datos generales para todos los prospectos */}
          {importType && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-3">
                Datos generales (se aplicarán a todos los prospectos importados)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Sector</label>
                  <Input
                    value={importGeneralData.sector}
                    onChange={(e) => setImportGeneralData({ ...importGeneralData, sector: e.target.value })}
                    placeholder="Ej: Tecnología, Salud..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Origen</label>
                  <select
                    value={importGeneralData.fuenteOrigen}
                    onChange={(e) => setImportGeneralData({ ...importGeneralData, fuenteOrigen: e.target.value })}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="WEB">Web</option>
                    <option value="EMAIL">Email</option>
                    <option value="LINKEDIN">LinkedIn</option>
                    <option value="REFERIDO">Referido</option>
                    <option value="IMPORTACION">Importación</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Estado inicial</label>
                  <select
                    value={importGeneralData.estado}
                    onChange={(e) => setImportGeneralData({ ...importGeneralData, estado: e.target.value })}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="NUEVO">Nuevo</option>
                    <option value="CONTACTADO">Contactado</option>
                    <option value="CUALIFICADO">Cualificado</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Prioridad</label>
                  <select
                    value={importGeneralData.prioridad}
                    onChange={(e) => setImportGeneralData({ ...importGeneralData, prioridad: e.target.value })}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="BAJA">Baja</option>
                    <option value="MEDIA">Media</option>
                    <option value="ALTA">Alta</option>
                    <option value="URGENTE">Urgente</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Instrucciones */}
          {!showPreview && (
            <div className="bg-blue-50 p-4 rounded-lg text-sm">
              <p className="font-medium text-blue-900 mb-2">💡 Formato del archivo:</p>
              <ul className="text-blue-800 space-y-1 ml-4 list-disc">
                <li>El archivo debe incluir columnas: Nombre, Empresa, Email, Teléfono</li>
                <li>Opcionalmente: Cargo, Ciudad, Provincia, País, Website</li>
                <li>Los datos se extraerán automáticamente del archivo</li>
              </ul>
            </div>
          )}

          {/* Vista Previa */}
          {showPreview && (
            <div className="border-t pt-4 space-y-4">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <h3 className="font-semibold text-green-900">Listo para importar</h3>
                </div>
                <p className="text-green-800 text-sm">
                  Se importarán <strong>{parsedData.length} prospectos</strong> con el mapeo configurado
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-sm">📋 Resumen del mapeo:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(columnMapping).map(([field, column]) => {
                    const fieldNames: Record<string, string> = {
                      nombre: 'Nombre',
                      empresa: 'Empresa',
                      cargo: 'Cargo',
                      email: 'Email',
                      telefono: 'Teléfono',
                      ciudad: 'Ciudad',
                      provincia: 'Provincia',
                      pais: 'País',
                      website: 'Página Web'
                    }
                    return (
                      <div key={field} className="flex gap-2">
                        <span className="font-medium">{fieldNames[field] || field}:</span>
                        <span className="text-gray-600">{column}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                <h4 className="font-medium mb-3 text-sm">👁️ Vista previa (primeros 3 prospectos):</h4>
                <div className="space-y-3">
                  {parsedData.slice(0, 3).map((prospecto, index) => (
                    <div key={index} className="text-xs bg-white p-3 rounded border">
                      <div className="grid grid-cols-2 gap-2">
                        <div><strong>Nombre:</strong> {prospecto.nombre || '-'}</div>
                        <div><strong>Empresa:</strong> {prospecto.empresa || '-'}</div>
                        {prospecto.email && <div><strong>Email:</strong> {prospecto.email}</div>}
                        {prospecto.telefono && <div><strong>Teléfono:</strong> {prospecto.telefono}</div>}
                        {prospecto.cargo && <div><strong>Cargo:</strong> {prospecto.cargo}</div>}
                        {prospecto.ciudad && <div><strong>Ciudad:</strong> {prospecto.ciudad}</div>}
                        {prospecto.provincia && <div><strong>Provincia:</strong> {prospecto.provincia}</div>}
                        {prospecto.pais && <div><strong>País:</strong> {prospecto.pais}</div>}
                        {prospecto.website && <div><strong>Website:</strong> {prospecto.website}</div>}
                        <div><strong>Sector:</strong> {prospecto.sector || 'No especificado'}</div>
                        <div><strong>Origen:</strong> {prospecto.fuenteOrigen || 'No especificado'}</div>
                        <div><strong>Estado:</strong> {prospecto.estado || 'No especificado'}</div>
                        <div><strong>Prioridad:</strong> {prospecto.prioridad || 'No especificado'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            {showPreview && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowPreview(false)}
              >
                ← Atrás
              </Button>
            )}
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsImportModalOpen(false)
                setImportType(null)
                setImportFile(null)
                setSheetsUrl('')
                setShowPreview(false)
                setParsedData([])
                setColumnMapping({})
              }}
            >
              Cancelar
            </Button>
            {!showPreview ? (
              <Button 
                type="button" 
                onClick={handleParseFile}
                disabled={!importFile && !sheetsUrl}
              >
                Analizar Archivo
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={handleConfirmImport} 
                disabled={importing}
              >
                {importing ? 'Importando...' : `🚀 Importar ${parsedData.length} Prospectos`}
              </Button>
            )}
          </div>
        </div>
      </Modal>

      {/* Modal Ver Información */}
      <Modal
        isOpen={isInfoModalOpen}
        onClose={handleCloseInfoModal}
        title="Información del Prospecto"
        size="lg"
      >
        {selectedProspecto && (
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
                    {selectedProspecto.nombre || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Cargo</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspecto as any).cargo || '-'}
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
                    {selectedProspecto.empresa || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Sector</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspecto as any).sector || '-'}
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
                    {selectedProspecto.telefono || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                  <p className="text-sm text-gray-900">
                    {selectedProspecto.email || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">WhatsApp</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspecto as any).whatsapp || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Página Web</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspecto as any).website ? (
                      <a 
                        href={(selectedProspecto as any).website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {(selectedProspecto as any).website}
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
                    {(selectedProspecto as any).ciudad || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Provincia</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspecto as any).provincia || '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">País</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspecto as any).pais || '-'}
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
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getEstadoColor(selectedProspecto.estado)}`}>
                    {selectedProspecto.estado}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Prioridad</label>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getPrioridadColor(selectedProspecto.prioridad)}`}>
                    {selectedProspecto.prioridad}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Origen</label>
                  <p className="text-sm text-gray-900">
                    {(selectedProspecto as any).fuenteOrigen || 'WEB'}
                  </p>
                </div>
              </div>
            </div>

            {/* Notas */}
            {(selectedProspecto as any).notas && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b">
                  📝 Notas
                </h3>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                  {(selectedProspecto as any).notas}
                </p>
              </div>
            )}

            {/* Botón Cerrar */}
            <div className="flex justify-end pt-4">
              <Button onClick={handleCloseInfoModal}>
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
