import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // fetch api/getData
  const [data, setData] = useState('')
  // fetch api/addData
  const [todoName, setTodoName] = useState('')
  const [todoStatus, setTodoStatus] = useState(false)

  useEffect(() => {
    fetch('/api/getData')
      .then(res => res.text())
      .then(data => setData(data))
  }, [])

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
  }

  const handleChangetodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handleChangetodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoStatus(e.target.checked)
  }

  return (
    <div className="App">
      fetching:{data}
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChangetodoName} />
        <input type="checkbox" onChange={handleChangetodoStatus} />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default App