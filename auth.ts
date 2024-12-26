// import { PrismaClient } from "@prisma/client"
// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { db } from "./lib/db"
// import Google from "next-auth/providers/google"
// import Github from "next-auth/providers/github"
 
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
// export const prisma = globalForPrisma.prisma || new PrismaClient()
 
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// export const { handlers, auth, signIn, signOut } = NextAuth({
//     adapter: PrismaAdapter(db),
//     providers: [],
    
//   })

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db" 
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"


 
export const { handlers:{GET, POST}, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {strategy: 'jwt'},
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECTRET || "",
    }),
  ],
})