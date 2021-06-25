import React, { useEffect, useState } from 'react'

function App(props) {
  const [count, setCount] = useState(0)
  const [person, setPerson] = useState({ name:'张三' })
  
  useEffect(() => {
    document.title = count
  },[count])

  return (
    <div>
    <span>{count}</span>
    <div>{person.name}</div>
    <button onClick={() => setCount(count + 1)}>+1</button>
    <button onClick={() => setPerson({ name: '李四' })}>setPerson</button>
  </div>
  )
}

export default App
