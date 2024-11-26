import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  if (isNaN(take)) return NextResponse.json(
    { message: 'take tiene que ser un numero' },
    { status: 400 }
  )
  if (isNaN(skip)) return NextResponse.json(
    { message: 'skip tiene que ser un numero' },
    { status: 400 }
  )

  const todos = await prisma.todo.findMany({ take, skip });

  return NextResponse.json(todos);
}

export async function POST(request: Request) {

  const body = await request.json();
  const { description, complete } = body;

  const todo = await prisma.todo.create({ data: { description, complete } });

  return NextResponse.json(todo)

}