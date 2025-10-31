'use client'

export default function CampanasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Campañas</h1>
        <p className="text-gray-600 mt-1">Crea y gestiona campañas de email y WhatsApp</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Activas</h3>
            <span className="text-2xl">🚀</span>
          </div>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Programadas</h3>
            <span className="text-2xl">⏰</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Completadas</h3>
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-3xl font-bold text-gray-600">0</p>
        </div>
      </div>

      <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">📧</div>
          <h3 className="text-xl font-semibold mb-2">Próximamente</h3>
          <p className="text-gray-600">
            Podrás crear campañas masivas de email y WhatsApp,
            programarlas y hacer seguimiento de resultados.
          </p>
        </div>
      </div>
    </div>
  )
}
