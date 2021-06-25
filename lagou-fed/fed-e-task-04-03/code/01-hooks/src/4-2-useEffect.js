import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function App(props) {
  function onScroll() {
    console.log('页面发生滚动了')
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const [count, setCount] = useState(0)

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount(count => {
        document.title = count + 1
        return count + 1
      })
    }, 1000)
    return () => {
      clearInterval(timerId)
    }
  }, [])
  return <div>
    <span>{count}</span>
    <button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('root'))}>卸载组件</button>
  </div>
}

export default App
