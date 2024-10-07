import { prisma } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth, } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },
    }),
  ],
})
