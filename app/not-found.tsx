import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-6xl font-bold mb-4">404</h2>
        <h3 className="text-2xl font-semibold mb-4">Página no encontrada</h3>
        <p className="text-gray-600 mb-6">Lo sentimos, la página que buscas no existe.</p>
        <Link 
          href="/dashboard"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition inline-block"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  )
}
