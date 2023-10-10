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
    <div className=' w-[30%] mx-3 h-full '>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          // スクロールバー
          className=' w-full h-[450px] overflow-y-scroll border-black rounded-lg border-2 border-gray-500/75 pl-5 pr-3 py-5 mt-5'
        >
          <div className={`mb-6 ${titleStyle}`}>
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
