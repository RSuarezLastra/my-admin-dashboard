import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'user@test.com',
      password: bcrypt.hashSync('123456'),
      todos: {
        create: [
          { description: 'Ir al gym', complete: true },
          { description: 'Estudiar curso de Next' },
          { description: 'Leer libro de metafisica' },
          { description: 'Estudiar algoritmos' },
        ]
      }
    }
  })

  return NextResponse.json({
    message: 'seed executed'
  })
}