// app/users/page.tsx
import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

export default async function Home() {
  const users = await prisma.user.findMany()

  return (
    <main style={{ padding: "2rem", fontFamily: "monospace", maxWidth: "600px" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Users Management</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #333", textAlign: "left" }}>
            <th style={{ padding: "0.5rem" }}>Name</th>
            <th style={{ padding: "0.5rem" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "0.5rem" }}>{user.name}</td>
              <td style={{ padding: "0.5rem" }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <p style={{ color: "#999", marginTop: "1rem" }}>No users found. Run the seed first.</p>
      )}
    </main>
  )
} 