import { NextResponse } from 'next/server'

let rconectContactos: any[] = []

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const seccion = searchParams.get('seccion')
    const search = searchParams.get('search')
    const estado = searchParams.get('estado')

    let filteredContactos = [...rconectContactos]

    if (seccion) {
      filteredContactos = filteredContactos.filter(c => c.seccion === seccion)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredContactos = filteredContactos.filter(c =>
        c.nombre.toLowerCase().includes(searchLower) ||
        c.empresa.toLowerCase().includes(searchLower) ||
        c.email?.toLowerCase().includes(searchLower)
      )
    }

    if (estado) {
      filteredContactos = filteredContactos.filter(c => c.estado === estado)
    }

    filteredContactos.sort((a, b) => new Date(b.fechaDerivacion).getTime() - new Date(a.fechaDerivacion).getTime())

    return NextResponse.json(filteredContactos)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener contactos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const nuevoContacto = {
      id: Date.now().toString(),
      nombre: body.nombre,
      empresa: body.empresa,
      email: body.email,
      telefono: body.telefono,
      origen: body.origen || 'Manual',
      seccion: body.seccion,
      fechaDerivacion: new Date().toISOString(),
      estado: 'PENDIENTE',
      notas: body.notas,
      prospectoId: body.prospectoId
    }

    rconectContactos.push(nuevoContacto)
    
    return NextResponse.json(nuevoContacto, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear contacto' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()
    const body = await request.json()

    const index = rconectContactos.findIndex(c => c.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Contacto no encontrado' }, { status: 404 })
    }

    rconectContactos[index] = { ...rconectContactos[index], ...body }
    
    return NextResponse.json(rconectContactos[index])
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar contacto' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()

    const index = rconectContactos.findIndex(c => c.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Contacto no encontrado' }, { status: 404 })
    }

    const eliminado = rconectContactos.splice(index, 1)[0]
    
    return NextResponse.json({ message: 'Contacto eliminado', contacto: eliminado })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar contacto' }, { status: 500 })
  }
}
