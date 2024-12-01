'use client';

import { Todo } from "@prisma/client";
import style from './TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => void
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

  const [todoOptimistic, setTodoOptimistic] = useOptimistic(todo,
    (state, newValue: boolean) => ({ ...state, complete: newValue })
  )

  const onToggleTodo = async () => {
    try {
      startTransition(() => setTodoOptimistic(!todoOptimistic.complete));
      await toggleTodo(todo.id, !todoOptimistic.complete);
    } catch (error) {
      startTransition(() => setTodoOptimistic(!todoOptimistic.complete));
    }

  }

  return (
    <div className={todo.complete ? style.todoDone : style.todoPending}>
      <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
        <div
          onClick={() => onToggleTodo()}
          className={`felx p-2
          ${todo.complete ? 'bg-blue-100' : 'bg-red-100'}  rounded-md hover:bg-opacity-60 cursor-pointer`} >
          {
            todo.complete
              ? <IoCheckboxOutline size={30} />
              : <IoSquareOutline size={30} />
          }
        </div>
        <div className="text-center sm:text-left">
          {todo.description}
        </div>
      </div>
    </div>
  )
}
