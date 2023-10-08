import { useDroppable } from '@dnd-kit/core'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import SortableItem from './SortableItem'
import { Todo } from '../types'

interface Props {
  id: string
  label: string
  items: Todo[]
  onDelete: (id: number) => Promise<void>
}

const SortableContainer: React.FC<Props> = ({ id, label, items, onDelete }) => {
  const { setNodeRef } = useDroppable({
    id,
  })
  let titleStyle = ''
  switch (id) {
    case 'container1':
      titleStyle = 'bg-blue-100'
      break
    case 'container2':
      titleStyle = 'bg-red-100'
      break
    case 'container3':
      titleStyle = 'bg-green-100'
      break
    default:
  }
  return (
    <div className='issue-item mx-3'>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          className=' w=full border-2 border-gray-500/75 p-5 mt-2 rounded-md'
        >
          <div className={`issue-title-container ${titleStyle}`}>
            <h3 className='text-xl font-bold text-center'>{label}</h3>
          </div>
          <div className='items-container'>
            {items.map((item) => (
              <SortableItem key={item.id} todo={item} onDelete={onDelete} />
            ))}
          </div>
        </div>
      </SortableContext>
    </div>
  )
}

export default SortableContainer
