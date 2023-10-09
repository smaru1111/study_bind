import { Todo, Todos } from '../types'

interface ItemProps {
  // 追加のpropsも許容する
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  id?: number
  todo?: Todo
  onDelete?: (id: number) => Promise<void>
  findTodoName?: (id: number) => string | undefined
  findContainer?: (id: number) => keyof Todos | undefined
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const Item: React.FC<ItemProps> = ({
  todo,
  id,
  onDelete,
  findContainer,
  findTodoName,
}) => {
  if (!todo) {
    const todo: Todo = {
      id: id!,
      todoName: findTodoName!(id!),
      todoStatus: findContainer!(id!),
    }
    return (
      <div className='w-full h-[50px] flex items-center justify-center px-10 my-2.5 border border-black rounded-lg bg-gray-100'>
        {todo.todoName}
      </div>
    )
  } else {
    return (
      <div className='w-full h-[50px] flex items-center justify-center px-10 my-2.5 border border-black rounded-lg bg-gray-100'>
        {todo.todoName}
      </div>
    )
  }
}
export default Item
