import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // fetch api/getData
  const [data, setData] = useState('')

  useEffect(() => {
    fetch('/api/getData')
      .then(res => res.text())
      .then(data => setData(data))
  }, [])
  return (
    <div className="App">
      fetching:{data}
    </div>
  )
}

export default App