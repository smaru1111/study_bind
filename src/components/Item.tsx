import { Todo } from '../types'
import './Item.css'

interface ItemProps {
  // 追加のpropsも許容する
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  id?: number
  todo?: Todo
  onDelete?: (id: number) => Promise<void>
  findTodoName?: (id: number) => string | undefined
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const Item: React.FC<ItemProps> = ({ todo, id, onDelete, findTodoName }) => {
  const todoName = todo ? todo.todoName : findTodoName!(id!)

  return (
    <div className='w-full h-[50px] relative flex items-center justify-between px-10 my-2.5 text-xs border border-black rounded-lg bg-gray-100'>
      <p className='nowraper'>{todoName}</p>
      <button
        className=' absolute right-5 before:text-black before:content-["×"] before:font-bold before:text-xl before:font-sans before:cursor-pointer before:z-50 hover:before:opacity-60 before:transition-opacity before:duration-300 before:ease-in-out'
        onClick={() => onDelete!(todo ? todo.id : id!)}
      ></button>
    </div>
  )
}
export default Item
