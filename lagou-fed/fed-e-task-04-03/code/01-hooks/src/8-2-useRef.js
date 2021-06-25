import React, { useState, useEffect, useRef } from 'react'

function App(props) {
  const [count, setCount] = useState(0)

  // 如果timerId为null，count发生改变重新渲染组件timerId还是为null，清除不了定时器
  // useRef即使组件重新渲染，保存的数据仍然还在
  let timerId = useRef()

  useEffect(() => {
     timerId.current = setInterval(() => {
      setCount(count => count +1)
    }, 1000)
  }, [])

  const stopCount = () => {
    clearInterval(timerId.current)
  }

  return (
    <div>
      <span>{count}</span>
      <button onClick={stopCount}>停止</button>
    </div>
  )
}

export default App
