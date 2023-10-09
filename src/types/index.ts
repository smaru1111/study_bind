export type Todo = {
  id: number
  todoName: string | undefined
  todoStatus: string | undefined
}

export type Todos = {
  yet: Todo[]
  doing: Todo[]
  done: Todo[]
}
