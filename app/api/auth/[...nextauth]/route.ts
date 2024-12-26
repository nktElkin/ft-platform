// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import NextAuth from "next-auth"
// import EmailProvider from "next-auth/providers/email";
// import { adapter } from "next/dist/server/web/adapter";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "@/lib/db";


// export const authOptions = {
//   // Configure one or more authentication providers
//   adapter: PrismaAdapter(db),
//   providers: [
//         GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//         authorization: {
//           params: {
//             prompt: "consent",
//             access_type: "offline",
//             response_type: "code"
//           }
//         }
//       })
//         // EmailProvider({
//         //   server: process.env.EMAIL_SERVER,
//         //   from: process.env.EMAIL_FROM
//         // }),
//         // GitHubProvider({
//         //     clientId: process.env.GITHUB_ID ?? '',    
//         //     clientSecret: process.env.GITHUB_SECRET ?? ''
//         //   })
//     // ...add more providers here
//   ],

// }

// export const handler = NextAuth(authOptions)

// export {handler as GET, handler as POST}

export { GET, POST } from "@/auth"