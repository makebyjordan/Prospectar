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
