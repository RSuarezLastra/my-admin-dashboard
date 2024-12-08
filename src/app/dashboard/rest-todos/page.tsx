export const dynamic = 'force-dynamic';
export const revalidate = 0;


import prisma from "@/app/lib/prisma";
import { getUserSessionServer } from "@/auth/actions/auth-actions";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: 'Rest todo page',
  description: 'descripcion'
}

export default async function RestTodosPage() {

  const user = await getUserSessionServer();

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { description: 'asc' }
  });

  return (
    <div>
      <div className="w-full mx-5 mb-5 px-5">
        <NewTodo />
      </div>
      {
        <TodosGrid todos={todos} />
      }
    </div>
  );
}