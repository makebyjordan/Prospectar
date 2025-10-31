'use client'

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reportes y Analytics</h1>
        <p className="text-gray-600 mt-1">Visualiza métricas y estadísticas de tu actividad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Tasa de Conversión</h3>
          <p className="text-3xl font-bold text-green-600">0%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Tiempo Promedio</h3>
          <p className="text-3xl font-bold text-blue-600">0d</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Valor Pipeline</h3>
          <p className="text-3xl font-bold text-purple-600">€0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-600 mb-2">ROI</h3>
          <p className="text-3xl font-bold text-orange-600">0%</p>
        </div>
      </div>

      <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">Próximamente</h3>
          <p className="text-gray-600">
            Análisis detallados, gráficos interactivos y reportes exportables
            estarán disponibles pronto.
          </p>
        </div>
      </div>
    </div>
  )
}
