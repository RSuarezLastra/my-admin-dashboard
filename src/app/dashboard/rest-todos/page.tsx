import prisma from "@/app/lib/prisma";
import { TodosGrid } from "@/todos";

export const metadata = {
  title: 'Rest todo page',
  description: 'descripcion'
}

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany();

  return (
    <div>
      <h1>Rest Todos Page</h1>
      {
        <TodosGrid todos={todos} />
      }
    </div>
  );
}