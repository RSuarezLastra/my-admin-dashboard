import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs';

export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
}

export const signInEmailAndPassword = async (email: string, password: string) => {

  if (!email || !password) return null

  const dbUser = await prisma.user.findUnique({ where: { email } });

  if (!dbUser) {
    const user = await createUser(email,password);
    return user
  }
  
  if(!bcrypt.compareSync(password,dbUser.password)){
    return null
  }

  return dbUser
}

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split('@')[0]
    }
  });

  return user;
}