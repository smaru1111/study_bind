import { useEffect, useState } from 'react'
import './App.css'

type Todo = {
  id: number
  todoName: string
  todoStatus: boolean
}

function App() {
  // fetch api/getData
  const [todoData, setTodoData] = useState<Todo[]>([])
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  // fetch api/addData
  const [todoName, setTodoName] = useState('')
  const [todoStatus, setTodoStatus] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/getData`);
      const info = await response.json();
      setTodoData(() => ([...info ]));
      console.log(todoData);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = await fetch('/api/addData', {
      method: 'POST',
      body: JSON.stringify({
        todoName: todoName,
        todoStatus: todoStatus
      }
      ),
    })
    const result = await res.text()
    console.log(result)
    fetchData();
    setTodoName('')
    setTodoStatus(false)
  }

  const handleChangetodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handleChangetodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoStatus(e.target.checked)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChangetodoName} value={todoName}/>
        <input type="checkbox" onChange={handleChangetodoStatus} checked={todoStatus}/>
        <button type="submit">submit</button>
      </form>
      <h1>all Data</h1>
      <ul>
        {isLoading && <p>...loading</p>}
        {isError && <p>Error!</p>}
        {
          todoData.map((todo) => (
            <li key={todo.id}>
              <p>{todo.todoName}</p>
              <p>{todo.todoStatus}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App