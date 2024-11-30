'use client';

import { Todo } from "@prisma/client";
import style from './TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  return (
    <div className={todo.complete ? style.todoDone : style.todoPending}>
      <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
        <div
          onClick={() => toggleTodo(todo.id, !todo.complete)}
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
