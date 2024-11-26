import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

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

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
})

export async function PUT(request: Request, { params }: Segments) {

  const { id } = await params;
  const { complete, description } = await putSchema.validate(await request.json());

  try {
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      return NextResponse.json({ message: `Tdoo con id: ${id} no encontrado` }, { status: 404 })
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description }
    })

    return NextResponse.json(updatedTodo)

  } catch (error) {

    return NextResponse.json(error, { status: 400 })
  }
}