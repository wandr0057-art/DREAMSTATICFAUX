import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const allRooms = await prisma.room.findMany()
  console.log('All rooms:', allRooms)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
