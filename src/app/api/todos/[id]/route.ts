import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

interface Segments {
  params: {
    id: string;
  }
}

export async function GET(request: Request, { params }: Segments) {

  const { id } = await params;

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    return NextResponse.json({ message: `Tdoo con id: ${id} no encontrado` }, { status: 404 })
  }

  return NextResponse.json(todo)
}
export async function PUT(request: Request, { params }: Segments) {

  const { id } = await params;
  const body = await request.json();

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    return NextResponse.json({ message: `Tdoo con id: ${id} no encontrado` }, { status: 404 })
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: body
  })

  return NextResponse.json(updatedTodo)
}