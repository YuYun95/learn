## React Hooks
### Hooks
#### 1. React Hooks 介绍
##### 1.1 React Hooks是用来做什么的
对函数型组件进行增强，让函数型组件可以存储状态，可以拥有处理副作用的能力。

让开发者在不使用类组件的情况下，实现相同的功能

##### 1.2 类组件的不足（Hooks要解决的问题）
* 缺少逻辑复用机制
  * 为了复用逻辑增加无实际渲染效果的组件，增加了组件层级 显示十分臃肿
  * 增加了调试的难度以及运行效率的降低
* 类组件经常会变得很复杂难以维护
  * 将一组相干的业务逻辑拆分到了多个生命周期函数中
  * 在一个生命周期函数内 存在多个不相干的业务逻辑
* 类成员方法不能保证this指向的正确性

#### 2. React Hooks使用
Hooks意为钩子，React Hooks就是一堆钩子函数，React通过这些钩子函数对函数型组件进行增强，不同的钩子函数提供了不同的功能

##### 2.1 useState()
用于为函数组件引入状态
```js
import React, { useState } from 'react'

function App() {
  const { count, setCount } = useState(0)
  return <div>
    <span>{ count }</span>
    <button onClick={() => setCount(count + 1)}> +1 </button>
  </div>
}

export default App
```
1. 接收唯一的参数即状态初始值，初始值可以是任意数据类型
  ```js
    const [count, setCount] = useState(0)
    const [person, setPerson] = useState({ name: '张三', age: 20 })
  ```
2. useState返回值是一个数组，第一个是保存的状态，第二个是设置状态的方法，
   数组中存储状态值和更改状态值的方法，**方法名称约定以set开头，后面加上状态名称**
  ```js
    const [count, setCount] = useState(0)
  ```
3. 方法可以被调用多次，用以保存不同状态值
  ```js
    <button onClick={() => setCount(count + 1)}>+1</button>
    <button onClick={() => setPerson({ name: '李四', age: 30 })}>setPerson</button>
    <button onClick={() => setPerson({ ...person, name: '李四' })}>setPerson(只改变一个属性，其他属性不变)</button>
  ```
4. 参数可以是一个函数，函数返回什么，初始状态就是什么，函数只会被调用一次，用在初始值是动态值的情况
  ```js
    // 当初始值是动态值
    // 这样写每次渲染都会执行
    const propsCount = props.count || 0
    const [count, setCount] = useState(propsCount)

    // 应该这样写
    const [count, setCount] = useState(() => {
      return props.count || 0
    })
  ```

5. 设置状态值方法的参数可以是一个值也可以是一个函数；设置状态值方法的方法本身是异步的，如果代码依赖状态值，那要写在回调函数中
  ```js
  function handleCount() {
    setCount(count => {
      const newCount = count + 1
      document.title = newCount
      return newCount
    })  
  }
  <button onClick={handleCount}>+1</button>
  ```

##### 2.2 useReducer
useReducer是另一种让函数组件保存状态的方法，可以将dispatch传给子组件使用

第一个参数是reducer函数；第二个参数是状态的初始值

返回值是数组，第一个元素是存储的状态，第二个参数是触发action的dispatch方法

useReducer相对于useState的好处：子组件想修改count值，就不需要传递多个修改数据的方法，
可以直接把dispatch方法传递给子组件，子组件调用dispatch方法就可以触发任意action对状态进行修改

```jsx
import React, { useReducer } from 'react'

function App(props) {
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return state + 1
      case 'decrement':
        return state - 1
      default:
        return state
    }
  }
  const [count, dispatch] = useReducer(reducer, 0)
  return (
    <div className="App">
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
    </div>
  )
}

export default App

```

##### 2.3 钩子函数useContext

在跨组件层级获取数据时简化获取数据的代码，实现共享

useContext：解决的是组件之间值传递的问题

redux：是应用中统一管理状态的问题

```jsx
import React, { createContext } from 'react'

const countContext = createContext()

function App(props) {
  return <countContext.Provider value={100}>
   <Foo />
 </countContext.Provider>
}

function Foo() {
  return <countContext.Consumer>
    {
      value => {
        return <div>{ value }</div>
      }
    }
  </countContext.Consumer>
}

export default App
```

使用useContext简化
```jsx
import React, { createContext, useContext } from 'react'

const countContext = createContext()

function App(props) {
  return <countContext.Provider value={100}>
   <Foo />
 </countContext.Provider>
}

function Foo() {
  const value = useContext(countContext)
  return <div>{value}</div>
}

export default App
```

##### 2.4 钩子函数useEffect

让函数型组件拥有处理副作用的能力，类似生命周期函数

1. useEffect执行时机
   可以把useEffect看做 componentDidMount、componentDidUpdate 和 componentWillUnmount这三个函数的组合

   useEffect(() => {})                      =>    componentDidMount、componentDidUpdate
   useEffect(() => {}, [allNumber])         =>    componentDidMount
   useEffect(() => () => {}, [])            =>    componentWillUnMount

   allNumber值发生变化后会再次执行，传递一个空数组（[]）作为第二个参数，这个 Effect 将永远不会重复执行，因此可以达到componentDidMount的效果

```jsx
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function App(props) {
  const [count, setCount] = useState(0)
  // 组件挂载完成之后执行 组件数据更新完成之后执行
  useEffect(() => {
    console.log('123')
  })

  // 组件挂载完成之后执行
  useEffect(() => {
    console.log('456')
  }, [])

  // 组件被卸载之前执行
  useEffect(() => {
    return () => {
      console.log('组件被卸载')
    }
  }, [])

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => ReactDOM.unmountComponentAtNode(document.getElementById('root'))}>卸载组件</button>
    </div>
  )
}

export default App

```

2. useEffect使用方法

* 为window对象添加滚动事件
* 设置定时器让count数值每隔一秒增加1

```jsx
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
```

3. useEffect解决的问题
  * 按照用途将代码进行分类（将一组相干的业务逻辑归置到了同一个副作用函数中）
  * 简化重复代码，使组件内部代码更加清晰（生命周期）

4. 只有指定数据发生变化时触发effect
```jsx
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
```

5. useEffect钩子函数结合异步函数

  useEffect中的参数函数不能是异步，因为useEffect函数要返回清理资源的函数，如果是异步函数就变成了返回Promise

  使用自执行
  ```jsx
  import React, { useEffect } from 'react'

  function App(props) {
    useEffect(() => {
      (async function() {
        let response = await getData()
        console.log(response)
      })()
    }, [])

    return <div>app</div>
  }

  function getData() {
    return new Promise(resolve => {
      resolve({ msg: 'Hello' })
    })
  }

  export default App
  ```

##### 2.5 钩子函数useMemo
useMemo 的行为类似Vue中的计算属性，可以监测某个值的变化，根据变化值计算新值

useMemo 会缓存计算结果，如果监测值没有发生变化，即使组件重新渲染，也不会重新计算，此行为可以有助于避免在每个渲染上进行昂贵的计算

```jsx
import { useMemo } from 'react'

const result = useMemo(() => {
  // 如果count值发生变化此函数重新执行
  return result
}, [count])
```

```jsx
import React, { useState, useMemo } from 'react'

function App(props) {
  const [count, setCount] = useState(0)
  const [bool, setBool] = useState(true)
  const result = useMemo(() => {
    console.log(1)
    return count * 2
  }, [count])

  return (
    <div>
      <span>{count}-{result}</span>
      <span>{ bool ? '真' : '假' }</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setBool(!bool)}>setBool</button>
    </div>
  )
}

export default App
```

##### 2.6 使用memo方法提高组件性能
性能优化，如果本组件中的数据没有发生变化，阻止组件更新，类似类组件中的PureComponent 和 shouldComponentUpdate

会在组件发生重新渲染之前，判断组件当中的数据有没发生变化，如果没有变化阻止组件进行更新（重新渲染）
```jsx
import React, { memo } from 'react'
function Counter () {
  return <div>Counter组件</div>
}

export default memo(Counter)
```

##### 2.7 钩子函数useCallback
性能优化、缓存函数，使组件重新渲染时得到相同的函数实例
```jsx
import React, { useState, useCallback } from 'react'

function Counter() {
  const [count, setCount]  = useState(0)
  const resetCount = useCallback(() => setCount(0), [setCount])
  return <div>
    <span>{count}</span>
    <button onClick={() => setCount(count + 1)}> +1 </button>
    <Test resetCount={resetCount} />
  </div>
}
```

```jsx
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
```

##### 2.8 钩子函数useRef
* 获取DOM元素对象

```jsx
import React, { useRef } from 'react'

function App(props) {
  const box = useRef()

  return (
    <div ref={box}>
      <button onClick={() => console.log(box)}>获取div</button>
    </div>
  )
}

export default App
```

* useRef钩子函数保存数据（跨组件周期）
即使组件重新渲染，保存的数据仍然还在，保存的数据被更改不会触发组件重新渲染

useRef和useState区别
* useState保存的是状态数据，当数据发生改变会触发组件重新渲染
* useRef保存的不是状态数据，更改数据也不会触发重新渲染

通常使用useRef保存一些程序在运行过程中的辅助数据

```jsx
import React, { useState, useEffect, useRef } from 'react'

function App(props) {
  const [count, setCount] = useState(0)

  // 如果timerId为null，count发生改变重新渲染组件timerId还是为null，清除不了定时器
  // useRef即使组件重新渲染，保存的数据仍然还在，useRef将数据保存在current属性
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
```

#### 3 自定义Hook
* 自定义Hook是标准的封装和共享逻辑的方式
   * 在一个组件内部有哪些逻辑是共享的（其他组件也需要用到）就可以把这些逻辑写在自定义Hook中，谁使用谁调用自定义Hook

* 自定义Hook是一个函数，名称以use开头

* 自定义Hook其实就是逻辑和内置Hook的组合

案例一
```jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function useGetPost() {
  const [post, setPost] = useState({})
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => setPost(response.data))
  }, [])
  return [post, setPost]
}

function App(props) {
  const [post, setPost] = useGetPost()
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </div>
  )
}

export default App
```

案例二
```jsx
import React, { useState } from 'react'

function useUpdateInput(initialValue) {
  const [value, setValue] = useState(initialValue)
  return {
    value,
    onChange: event => setValue(event.target.value)
  }
}

function App(props) {
  const usernameInput = useUpdateInput('')
  const passwordInput = useUpdateInput('')
  const submitForm = event => {
    event.preventDefault()
    console.log(usernameInput.value);
    console.log(passwordInput.value);
  }
  
  return (
    <form onSubmit={submitForm}>
      <input type="text" name="username" {...usernameInput} />
      <input type="password" name="password" {...passwordInput} />
      <input type="submit"  />
    </form>
  )
}

export default App

```

#### 4 路由钩子函数
* react-router-dom路由提供的钩子函数
  useHistory、useLocation、useRouteMatch、useParams

```jsx
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
```

```jsx
// App.js
import React from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'


function App() {
  return (
    <div>
    <div>
      <Link to="/home/zhangsan">首页</Link>
      <Link to="/list">列表页</Link>
    </div>
    <Route path="/home/:name" component={Home} />
    <Route path="/list" component={List} />
    </div>
  )
}

export default App
```

```jsx
// src/pages/Home.js
import React from 'react'
import { useHistory, useLocation, useRouteMatch, useParams } from 'react-router-dom'

export default function Home(props) {
  console.log(props)
  console.log(useHistory())
  console.log(useLocation())
  console.log(useRouteMatch())
  console.log(useParams())
  return <div>Home works</div>
}
```

```jsx
// src/pages/List.js
import React from 'react'

export default function List() {
  return <div>List works</div>
}
```



























































