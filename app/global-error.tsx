'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¡Error Global!</h2>
            <p className="text-gray-600 mb-6">Ha ocurrido un error inesperado.</p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Reintentar
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
