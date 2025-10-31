'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">¡Algo salió mal!</h2>
        <p className="text-gray-600 mb-6">Ha ocurrido un error inesperado.</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
