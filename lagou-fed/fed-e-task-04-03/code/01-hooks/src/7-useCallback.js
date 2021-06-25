import React, { useState, memo, useCallback } from 'react'

function App(props) {
  const [count, setCount] = useState(0)

  // 当count改变时组件重新渲染，resetCount就不是上一个的resetCount了所以Foo组件被重新渲染
  // 让App组件在每次重新渲染的时候都让我们得到同一个resetCount函数，这样每次向Foo组件传递的就是同一个函数，Foo就不会重新渲染了
  // const resetCount = () => {
  //   setCount(0)
  // }
  const resetCount = useCallback(() => setCount(0), [setCount])

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}> +1 </button>
      <Foo resetCount={resetCount} />
    </div>
  )
}

const Foo = memo(function Foo(props) {
  console.log('Foo组件重新渲染了')
  return <div>
    我是Foo组件
    <button onClick={props.resetCount}>resetCount</button>
    </div>
})


export default App
