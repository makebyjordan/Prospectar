import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-6xl font-bold text-center mb-8">
          🚀 CRM Prospector Pro
        </h1>
        <p className="text-2xl text-center mb-12 text-muted-foreground">
          Sistema Avanzado de Gestión de Prospección Multi-Canal con IA
        </p>
        
        <div className="flex justify-center mb-12">
          <Link
            href="/login"
            className="px-8 py-4 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition"
          >
            Acceder al Sistema
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 border rounded-lg hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">📞 Multi-Canal</h3>
            <p className="text-muted-foreground">
              Cold calling, LinkedIn, WhatsApp y Email integrados
            </p>
          </div>
          
          <div className="p-6 border rounded-lg hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">🤖 Agente IA Mañosa</h3>
            <p className="text-muted-foreground">
              Búsqueda inteligente de nichos y verificación automática
            </p>
          </div>
          
          <div className="p-6 border rounded-lg hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">📊 Analytics</h3>
            <p className="text-muted-foreground">
              Métricas avanzadas y reportes de conversión
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 p-4 border rounded-lg bg-green-50">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-medium">Sistema activo y funcionando ✓</span>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Credenciales: admin@crm.com / admin@1111
          </p>
        </div>
      </div>
    </main>
  )
}
