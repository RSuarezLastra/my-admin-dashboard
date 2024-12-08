import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email! } });
      
      if(dbUser?.isActive === false) {
        throw Error('Usuario no esta activo')
      }

      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-uuid'

      return token
    },
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token?.roles ?? ['no-roles']
        session.user.id = token?.id ?? 'no-uuid'
      }

      return session
    },
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }