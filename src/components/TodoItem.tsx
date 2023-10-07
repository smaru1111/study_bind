import { Todo } from '../types/index'

interface TodoItemProps {
  // 追加のpropsも許容する
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  todo: Todo
  onDelete: () => void
}

function TodoItem({ todo, onDelete }: TodoItemProps) {
  return (
    <div className='todo-item'>
      <span>{todo.todoName}</span>
      <span>{todo.todoStatus ? 'true' : ''}</span>
      <span>{todo.todoStatus ? '' : 'false'}</span>
      <button onClick={onDelete}>削除</button>
    </div>
  )
}

export default TodoItem
