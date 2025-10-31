'use client'

export default function InteraccionesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Interacciones</h1>
        <p className="text-gray-600 mt-1">Registra todas las comunicaciones con tus prospectos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Llamadas</h3>
            <span className="text-2xl">📞</span>
          </div>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Emails</h3>
            <span className="text-2xl">✉️</span>
          </div>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">WhatsApp</h3>
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">LinkedIn</h3>
            <span className="text-2xl">🔗</span>
          </div>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">Próximamente</h3>
          <p className="text-gray-600">
            La gestión completa de interacciones estará disponible pronto.
            Podrás registrar llamadas, emails, mensajes y más.
          </p>
        </div>
      </div>
    </div>
  )
}
