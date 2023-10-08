import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Item from './Item'
import { Todo } from '../types'

interface ItemProps {
  // 追加のpropsも許容する
  todo: Todo
  onDelete: (id: number) => Promise<void>
}

const SortableItem: React.FC<ItemProps> = ({ todo, onDelete }) => {
  const id = todo.id
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  return (
    <div
      className=''
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <Item todo={todo} onDelete={onDelete} />
    </div>
  )
}

export default SortableItem
