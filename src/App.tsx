import { useEffect, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core'

import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import Item from './components/Item'
import SortableContainer from './components/SortableContainer'
import './App.css'
import { Todos, Todo } from './types'

function App() {
  const [items, setItems] = useState<Todos>({
    yet: [],
    doing: [],
    done: [],
  })

  //リストのリソースid（リストの値）
  const [activeId, setActiveId] = useState<number | string | undefined>(undefined)

  // ドラッグの開始、移動、終了などにどのような入力を許可するかを決めるprops
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // どのコンテナに居るのか取得する関数
  const findContainer = (id: number) => {
    // もしコンテナの中にidが無い時でもitemsの中にidがあればそれを返す
    // これをしないとドラッグしたリソースがコンテナの中に無い時にエラーが出る。
    // どういう理屈で動いてるのか確実にはわからないが、
    // 恐らくこの関数でコンテナの中にidが無い時に、event.over.idが出力される時間が少し遅れるので
    // とりあえず、idを返して無限ループさせて時間を稼ぐためにやっていると考えている。

    if (id in items) {
      return id as unknown as keyof Todos
    }

    const containerKeys = Object.keys(items)
    for (const key of containerKeys) {
      const container = items[key as keyof Todos]
      const foundItem = container.find((item) => item.id === id)
      if (foundItem) {
        return key as keyof Todos
      }
    }
  }

  const findTodoName = (id: number) => {
    const containerKeys = Object.keys(items)
    for (const key of containerKeys) {
      const container = items[key as keyof typeof items]
      const foundItem = container.find((item) => item.id === id)
      if (foundItem) {
        return foundItem.todoName
      }
    }
  }

  // ドラッグ開始時に発火する関数
  const handleDragStart = (event: DragStartEvent) => {
    console.log('🕹')
    console.log(event)

    const { active } = event
    //ドラッグしたリソースのid
    const id = active.id
    setActiveId(id as number)
  }

  //ドラッグ可能なアイテムがドロップ可能なコンテナの上に移動時に発火する関数
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    //ドラッグしたリソースのid
    const id = active.id
    //ドロップした場所にあったリソースのid
    const overId = over?.id

    console.log(event)
    console.log(id)
    console.log('aaa' + over?.id)

    if (!overId) return

    // ドラッグ、ドロップ時のコンテナ取得
    // yet,doing,doneのいずれかを持つ
    const activeContainer = findContainer(id as number)
    const overContainer = findContainer(over?.id as number)

    console.log('activeContainer is' + activeContainer)
    console.log('overContainer is' + overContainer)

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      // コンテナが同じ場合
      console.log('finn')
      return
    }

    // コンテナが異なる場合
    setItems((prev) => {
      // 移動元のコンテナの要素配列を取得
      const activeItems = prev[activeContainer]
      // 移動先のコンテナの要素配列を取得
      const overItems = prev[overContainer]

      // 配列のインデックス取得
      const activeIndex = activeItems.findIndex((item: Todo) => item.id === id)
      const overIndex = overItems.findIndex((item: Todo) => item.id === overId)

      let newIndex
      if (overId in prev[overContainer]) {
        // 下以外の要素にドロップした場合
        newIndex = overItems.length + 1
      } else {
        // containerの最後の要素にドロップした場合
        const isBelowLastItem = over && overIndex === overItems.length - 1

        const modifier = isBelowLastItem ? 1 : 0

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }

      // 移動元の配列と移動先の配列の状態を反映したprevをreturnしてsetItemsに渡す
      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item: Todo) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      }
    })
  }

  // ドラッグ終了時に発火する関数
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    //ドラッグしたリソースのid
    const id = active.id
    //ドロップした場所にあったリソースのid
    const overId = over?.id

    if (!overId) return

    // ドラッグ、ドロップ時のコンテナ取得
    // yet,doing,doneのいずれかを持つ
    const activeContainer = findContainer(id as number)
    const overContainer = findContainer(over?.id as number)

    // 配列のインデックス取得
    // ！マークは、nullやundefinedを除外するための非nullアサーション演算子
    const activeIndex = items[activeContainer!].findIndex((item: Todo) => item.id === id)
    const overIndex = items[overContainer!].findIndex((item: Todo) => item.id === overId)

    // ドロップ時にリストの要素をとっかえひっかえのアレコレ
    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer!]: arrayMove(items[overContainer!], activeIndex, overIndex),
      }))
      handleChangePosition(id as number, overContainer!)
    }
    setActiveId(undefined)
  }

  const list1 = items.yet.map((item) => item.id)
  const list2 = items.doing.map((item) => item.id)
  const list3 = items.done.map((item) => item.id)

  console.log(list1)
  console.log(list2)
  console.log(list3)

  // ---------ここからはAPIの処理---------

  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  const [todoName, setTodoName] = useState('')
  const [todoStatus, setTodoStatus] = useState('yet')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/getData`)
      const info = await response.json()
      // setTodoData(() => [...info])
      setItems(() => ({
        yet: info.filter((item: Todo) => item.todoStatus === 'yet'),
        doing: info.filter((item: Todo) => item.todoStatus === 'doing'),
        done: info.filter((item: Todo) => item.todoStatus === 'done'),
      }))
      // objectの中身を確認する
      console.log('%o', items)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const deleteData = async (id: number) => {
    await fetch(`/api/delData?id=${id}`, {
      method: 'GET',
    })
    fetchData()
  }

  // ドロップした時にDBのtodoStatusを更新する関数
  const handleChangePosition = async (id: number, overContainer: string) => {
    const res = await fetch('/api/addData', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        todoStatus: overContainer,
      }),
    })
    const result = await res.text()
    console.log(result)
    fetchData()
  }

  // const updateData = async (todo: Todo) => {
  //   await fetch("/api/addData", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       id: todo.id,
  //       todoName: todo.todoName,
  //       todoStatus: todo.todoStatus,
  //     }),
  //   })
  //   fetchData();
  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch('/api/addData', {
      method: 'POST',
      body: JSON.stringify({
        todoName: todoName,
        todoStatus: todoStatus,
      }),
    })
    const result = await res.text()
    console.log(result)
    fetchData()
    setTodoName('')
    setTodoStatus('yet')
  }

  const handleChangetodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChangetodoName} value={todoName} />
        <button type='submit'>submit</button>
      </form>
      <h1>all Data</h1>
      {isLoading ? (
        <div>loading...</div>
      ) : isError ? (
        <div>error</div>
      ) : (
        <main className=''>
          <div className=''>
            <h1 className='issue-title'>ISSUEリスト</h1>
            <div className='issue-container flex justify-center align-middle w-full'>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                {/* SortableContainer */}

                <SortableContainer
                  id='yet'
                  label='ToDo'
                  items={items.yet}
                  onDelete={deleteData}
                />
                <SortableContainer
                  id='doing'
                  label='Doing'
                  items={items.doing}
                  onDelete={deleteData}
                />
                <SortableContainer
                  id='done'
                  label='Done'
                  items={items.done}
                  onDelete={deleteData}
                />
                {/* DragOverlay */}
                <DragOverlay>
                  {activeId ? (
                    <Item
                      id={activeId as number}
                      findTodoName={findTodoName}
                      findContainer={findContainer}
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

export default App
