import { Todo } from '../types'

interface ItemProps {
  // 追加のpropsも許容する
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  todo: Todo
  onDelete?: (id: number) => Promise<void>
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const Item: React.FC<ItemProps> = ({ todo, onDelete }) => {
  return (
    <div className='w-full h-[50px] flex items-center justify-center px-10 my-2.5 border border-black rounded-lg bg-gray-100'>
      {todo.todoName}
    </div>
  )
}
export default Item
