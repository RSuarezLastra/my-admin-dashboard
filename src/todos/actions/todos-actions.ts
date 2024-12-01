'use server'

import prisma from "@/app/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

  const todo = await prisma.todo.findFirst({
    where: { id }
  });

  if (!todo) {
    throw `Todo con id ${id} no encontrado`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete }
  });

  revalidatePath('/dashboard/server-actions');
  return updatedTodo;
}

export const addTodo = async (description: string) => {
  try {
    if (!description) {
      throw 'La descripcion es requeridas';
    }

    const todo = await prisma.todo.create({ data: { description } });

    revalidatePath('/dashboard/server-actions');
    return todo;

  } catch (error) {
    return {
      message: 'Error al crear todo'
    }
  }

}

export const deleteTodo = async () => {
  try {

    const deleteTodo = await prisma.todo.deleteMany({
      where: { complete: true },
    });
    
    revalidatePath('/dashboard/server-actions');
    return {
      ok: true,
      msg: 'Todos completados eliminados exitosamente',
      todo: deleteTodo
    }

  } catch (error) {
    return `Error al eleiminar todos`;
  }

}