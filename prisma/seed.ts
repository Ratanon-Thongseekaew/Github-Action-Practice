import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "john@example.com",
        name: "John Doe",
      },
      {
        email: "jane@example.com",
        name: "Jane Smith",
      },
      {
        email: "alex@example.com",
        name: "Alex Johnson",
      },
    ],
  })

  console.log("Seed completed")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })