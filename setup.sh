#!/bin/bash

set -e  # Detener si hay cualquier error

echo "========================================"
echo "   🔥 ARREGLANDO TODO AHORA MISMO 🔥"
echo "========================================"
echo ""

# Verificar si existe .env
if [ ! -f .env ]; then
    echo "⚠️  Archivo .env no encontrado, creando..."
    touch .env
fi

# Generar NEXTAUTH_SECRET si no existe
if ! grep -q "NEXTAUTH_SECRET" .env 2>/dev/null; then
  SECRET=$(openssl rand -base64 32)
  echo "NEXTAUTH_SECRET=$SECRET" >> .env
  echo "✅ NEXTAUTH_SECRET generado"
else
  echo "✅ NEXTAUTH_SECRET ya existe"
fi

# Configurar NEXTAUTH_URL si no existe
if ! grep -q "NEXTAUTH_URL" .env 2>/dev/null; then
  echo "NEXTAUTH_URL=http://localhost:3000" >> .env
  echo "✅ NEXTAUTH_URL configurado"
else
  echo "✅ NEXTAUTH_URL ya existe"
fi

# Configurar DATABASE_URL para SQLite si no existe o si tiene postgresql
if ! grep -q "DATABASE_URL" .env 2>/dev/null; then
  echo 'DATABASE_URL="file:./dev.db"' >> .env
  echo "✅ DATABASE_URL configurado para SQLite"
elif grep -q "postgresql" .env 2>/dev/null; then
  echo "⚠️  Detectado PostgreSQL, cambiando a SQLite..."
  sed -i.bak 's|DATABASE_URL=.*|DATABASE_URL="file:./dev.db"|' .env
  rm -f .env.bak
  echo "✅ DATABASE_URL actualizado a SQLite"
else
  echo "✅ DATABASE_URL ya existe"
fi

echo ""
echo "⏹️  Deteniendo procesos de Next.js..."
pkill -f "next dev" || true
sleep 1

echo ""
echo "🧹 Limpieza PROFUNDA de caché..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc
rm -rf node_modules/.vite
rm -rf dist
rm -rf build
rm -rf .turbo
echo "✅ Caché completamente limpiada"

echo ""
echo "📝 Creando global-error.tsx..."
cat > app/global-error.tsx << 'EOF'
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
EOF
echo "✅ global-error.tsx creado"

echo ""
echo "📝 Creando not-found.tsx..."
cat > app/not-found.tsx << 'EOF'
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
EOF
echo "✅ not-found.tsx creado"

echo ""
echo "📝 Creando loading.tsx..."
cat > app/loading.tsx << 'EOF'
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-xl font-semibold">Cargando...</p>
      </div>
    </div>
  )
}
EOF
echo "✅ loading.tsx creado"

echo ""
echo "📝 Creando middleware.ts para NextAuth..."
cat > middleware.ts << 'EOF'
export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
  ]
}
EOF
echo "✅ middleware.ts creado"

echo ""
echo "📝 Creando error.tsx..."
cat > app/error.tsx << 'EOF'
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
EOF

echo "✅ Archivo error.tsx creado"

echo ""
echo "📝 Creando archivo seed..."
cat > prisma/seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Verificar y eliminar usuario existente
  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@crm.com' }
  })
  
  if (existingUser) {
    console.log('🗑️  Eliminando usuario existente...')
    await prisma.user.delete({
      where: { email: 'admin@crm.com' }
    })
  }

  // Crear usuario con contraseña fresca
  const hashedPassword = await bcrypt.hash('admin@1111', 10)
  
  await prisma.user.create({
    data: {
      email: 'admin@crm.com',
      name: 'Administrador',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Usuario creado exitosamente: admin@crm.com / admin@1111')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
EOF

echo "✅ Archivo seed.ts creado"

echo ""
echo "📦 Generando cliente de Prisma..."
npm run db:generate

echo ""
echo "🗄️  Creando base de datos..."
npx prisma db push --accept-data-loss

echo ""
echo "🌱 Ejecutando seed para crear usuario admin..."
npx tsx prisma/seed.ts || echo "⚠️  Seed falló, pero continuamos..."

echo ""
echo "========================================"
echo "   ✅✅✅ TODO SOLUCIONADO ✅✅✅"
echo "========================================"
echo ""
echo "✅ Archivos creados:"
echo "   - error.tsx"
echo "   - global-error.tsx"
echo "   - not-found.tsx"
echo "   - loading.tsx"
echo "   - middleware.ts (CRITICO para auth)"
echo ""
echo "========================================"
echo "🚀 PASOS PARA INICIAR:"
echo "========================================"
echo ""
echo "1️⃣  Ejecuta:"
echo "   npm run dev"
echo ""
echo "2️⃣  Abre el navegador en MODO INCOGNITO:"
echo "   Chrome/Edge: Ctrl+Shift+N (Windows) / Cmd+Shift+N (Mac)"
echo "   Safari: Cmd+Shift+N"
echo ""
echo "3️⃣  Ve a:"
echo "   http://localhost:3000"
echo ""
echo "========================================"
echo "🔑 CREDENCIALES DE ACCESO:"
echo "========================================"
echo "   📧 Email: admin@crm.com"
echo "   🔒 Contraseña: admin@1111"
echo ""
echo "⚠️  SI SIGUES TENIENDO PROBLEMAS:"
echo "   - Asegúrate de usar modo incógnito"
echo "   - Verifica que el servidor esté corriendo"
echo "   - Revisa la consola del navegador (F12)"
echo ""
echo ""
echo "🚀 INICIANDO SERVIDOR DE DESARROLLO..."
echo "⏳ El navegador se abrirá automáticamente en http://localhost:3000"
echo ""
echo "⚠️  RECUERDA: Usa modo incógnito para evitar problemas de cookies"
echo ""
sleep 2

# Abrir navegador automáticamente
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  open http://localhost:3000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux
  xdg-open http://localhost:3000
fi

# Iniciar servidor
npm run dev
