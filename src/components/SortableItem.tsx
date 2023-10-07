import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UniqueIdentifier } from '@dnd-kit/core'
import Item from './Item'

const SortableItem: React.FC<{ id: UniqueIdentifier; name: string }> = ({ id, name }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  return (
    <div
      className=']'
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <Item name={name} />
    </div>
  )
}

export default SortableItem
