import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { getUserSessionServer } from '@/auth/actions/auth-actions';

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
  const user = await getUserSessionServer();

  try {

    if (!user) {
      return NextResponse.json('No autorizado', { status: 401 });
    }

    const body = await request.json();

    const { description, complete } = body;
    if (!description) return NextResponse.json(
      { message: 'la descripcion es requerida' },
      { status: 400 }
    );

    const todo = await prisma.todo.create({
      data: {
        description,
        complete,
        userId: user.id
      }
    });

    return NextResponse.json(todo)

  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }

}

export async function DELETE(request: Request) {
  const user = await getUserSessionServer();

  try {
    if (!user) {
      return NextResponse.json('No autorizado', { status: 401 });
    }

    const deleteTodo = await prisma.todo.deleteMany({
      where: { complete: true, userId: user.id },
    });

    return NextResponse.json({
      ok: true,
      msg: 'Todos completados eliminados',
      todo: deleteTodo
    })

  } catch (error) {

    return NextResponse.json(error, { status: 400 })
  }
}