import { Todo } from "@prisma/client"

interface Props {
  todo: Todo;
}

export const TodoItem = ({todo}: Props) => {
  return (
    <div>{todo.description}</div>
  )
}
