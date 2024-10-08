"use server"
import { prisma } from "@/prisma"

const upsertOrganizer = async (email: string, name: string) => {
  const upsertData = {
    email: email,
    name: name,
  }

  return await prisma.organizer.upsert({
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      email: email,
    },
    create: upsertData,
    update: upsertData,
  })
}

export default upsertOrganizer