import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: Request) {

  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { description: 'Ir al gym', complete: true },
      { description: 'Estudiar curso de Next' },
      { description: 'Leer libro de metafisica' },
      { description: 'Estudiar algoritmos' },
    ]
  })

  return NextResponse.json({
    message: 'seed executed'
  })
}