import React, { useState } from 'react'

function App(props) {
  const [count, setCount] = useState(() => props.count || 0)
  const [person, setPerson] = useState({ name: '张三', age: 20 })

  return (
    <div className="App">
      <span>
        {count} {person.name} {person.age}
      </span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setPerson({ name: '李四', age: 30 })}>setPerson</button>
      <button onClick={() => setPerson({ ...person, name: '李四' })}>setPerson(只改变一个属性，其他属性不变)</button>
    </div>
  )
}

export default App
