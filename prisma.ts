import { PrismaClient } from "@prisma/client"
import { cache } from "react"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export const findOrganizer = cache(async (email: string) => {
  return prisma.organizer.findUnique({
    where: {
      email: email,
    },
  })
})

export const findEventMany = cache(async (email: string) => {
  return prisma.event.findMany({
    where: {
      organizer: {
        email: email,
      }
    },
  })
})
