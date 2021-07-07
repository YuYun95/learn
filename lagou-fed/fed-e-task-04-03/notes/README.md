## React Hooks
### Hooks
#### 1、React Hooks 介绍
##### 1.1、 React Hooks是用来做什么的
对函数型组件进行增强，让函数型组件可以存储状态，可以拥有处理副作用的能力。

让开发者在不使用类组件的情况下，实现相同的功能

##### 1.2、 类组件的不足（Hooks要解决的问题）
* 缺少逻辑复用机制
  * 为了复用逻辑增加无实际渲染效果的组件，增加了组件层级 显示十分臃肿
  * 增加了调试的难度以及运行效率的降低
* 类组件经常会变得很复杂难以维护
  * 将一组相干的业务逻辑拆分到了多个生命周期函数中
  * 在一个生命周期函数内 存在多个不相干的业务逻辑
* 类成员方法不能保证this指向的正确性

#### 2、 React Hooks使用
Hooks意为钩子，React Hooks就是一堆钩子函数，React通过这些钩子函数对函数型组件进行增强，不同的钩子函数提供了不同的功能

##### 2.1、 useState()
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

##### 2.2、 useReducer
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

##### 2.3、 钩子函数useContext

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

##### 2.4、 钩子函数useEffect

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

##### 2.5、 钩子函数useMemo
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

##### 2.6、 使用memo方法提高组件性能
性能优化，如果本组件中的数据没有发生变化，阻止组件更新，类似类组件中的PureComponent 和 shouldComponentUpdate

会在组件发生重新渲染之前，判断组件当中的数据有没发生变化，如果没有变化阻止组件进行更新（重新渲染）
```jsx
import React, { memo } from 'react'
function Counter () {
  return <div>Counter组件</div>
}

export default memo(Counter)
```

##### 2.7、 钩子函数useCallback
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

##### 2.8、 钩子函数useRef
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

#### 3、 自定义Hook
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

#### 4、路由钩子函数
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

#### 5、 useState钩子函数的实现原理

useState使用方式
* useState方法传递一个state初始值
* useState方法返回一个数组，第一个元素是state，第二是元素是设置state的方法
* useState方法可以被多次调用，存储多个状态
* state值改变后重新渲染组件

采用数组的方式存储state和设置state的方法，并且这两个数组使用索引值建立对应关系，当调用useState时先判断state数组对应的索引是否存在值，
如果存在就用，不存在就是初始值；接着创建一个设置状态值的方法，需要使用闭包的方式把索引值保存，这样在点击按钮设置state的时候才能拿到对应的方法，
设置方法后重新渲染组件，然后useState要让索引值加一，把state和设置state的方法返回

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

let state = []
let setters = []
let stateIndex = 0

function createSetter(index) {
  return function(newState) {
    state[index] = newState
    render()
  }
}

function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  setters.push(createSetter(stateIndex))
  let value = state[stateIndex]
  let setter = setters[stateIndex]
  stateIndex ++
  return [value, setter]
}

// state改变重新渲染
function render() {
  stateIndex = 0 // 将索引值重新赋值为0，重新渲染时从0开始判断是否有
  ReactDOM.render(<App />, document.getElementById('root'))
}

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('张三')
console.log(state)
  return (
    <div>
    {count}
    <button onClick={() => setCount(count + 1)}>setCount</button>
    {name}
    <button onClick={() => setName('李四')}>setCount</button>
    </div>
  )
}

export default App
```

#### 6、useEffect钩子函数的实现原理

useEffect使用方式
* 第一个参数是回调函数；第二参数可传可不传，第二个参数类型是数组
* 当第二个参数不传递时，任何一个state改变都要执行useEffect
* 当第二个参数传递时且不为空数组，依赖值改变时再执行useEffect
* 当第二个参数传递时且为空数组，只在初始化执行，后面重新渲染组件将不再执行
* useEffect可以被多次调用

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

let state = []
let setters = []
let stateIndex = 0

function createSetter(index) {
  return function(newState) {
    state[index] = newState
    render()
  }
}

function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  setters.push(createSetter(stateIndex))
  let value = state[stateIndex]
  let setter = setters[stateIndex]
  stateIndex ++
  return [value, setter]
}

// 上一次的依赖值
let prevDepsAry = []
let effectIndex = 0
function useEffect(callback, depsAry) {
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new Error('useEffect函数第一个参数必须是函数')
  }
  // 判断depsAry有没有传递
  if (typeof depsAry === 'undefined') {
    // 没有传递
    callback()
  } else {
    // 判断depsAry是不是数组
    if (Object.prototype.toString.call(depsAry) !== '[object Array]') throw Error('useEffect第二个参数必须是数组')
    // 获取上一次的状态值
    let prevDeps = prevDepsAry[effectIndex]
    // 将当前的依赖值和上一次的依赖值作对比 如果有变化 调用callback
    let hasChange = prevDeps ?  depsAry.every((dep,index) => dep === prevDeps[index]) === false : true
    // 判断值是否有变化
    if (hasChange) {
      callback()
    }
    // 同步依赖值
    prevDepsAry[effectIndex] = depsAry
    effectIndex ++
  }
}

// state改变重新渲染
function render() {
  stateIndex = 0 // 将索引值重新赋值为0
  effectIndex = 0
  ReactDOM.render(<App />, document.getElementById('root'))
}

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('张三')
  useEffect(() => {
    console.log('hello')
  }, [count])

  useEffect(() => {
    console.log('world')
  }, [name])
  
  return (
    <div>
    {count}
    <button onClick={() => setCount(count + 1)}>setCount</button>
    {name}
    <button onClick={() => setName('李四')}>setCount</button>
    </div>
  )
}

export default App
```

#### 7、useReducer钩子函数的实现原理

useReducer使用方式
* useReducer函数接收两个参数，第一个参数是reducer函数，在这个函数内容要匹配action的类型，做相应的处理逻辑；
  第二个参数是state
* useReduce函数返回值是一个数组，第一个值是state，第二个值是dispatch方法，通过调用dispatch方法可以触发action

useReducer内部调用useState储存state；定义dispatch方法，dispatch方法接收一个action对象，dispatch方法内部调用reducer方法传递最新的state和action，返回最新的state，调用setState方法储存最新的state；useReducer方法返回一个数组，第一个值是state，第二个值是dispatch方法

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

let state = []
let setters = []
let stateIndex = 0

function createSetter(index) {
  return function(newState) {
    state[index] = newState
    render()
  }
}

function useState(initialState) {
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState
  setters.push(createSetter(stateIndex))
  let value = state[stateIndex]
  let setter = setters[stateIndex]
  stateIndex ++
  return [value, setter]
}

// 上一次的依赖值
let prevDepsAry = []
let effectIndex = 0
function useEffect(callback, depsAry) {
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new Error('useEffect函数第一个参数必须是函数')
  }
  // 判断depsAry有没有传递
  if (typeof depsAry === 'undefined') {
    // 没有传递
    callback()
  } else {
    // 判断depsAry是不是数组
    if (Object.prototype.toString.call(depsAry) !== '[object Array]') throw Error('useEffect第二个参数必须是数组')
    // 获取上一次的状态值
    let prevDeps = prevDepsAry[effectIndex]
    // 将当前的依赖值和上一次的依赖值作对比 如果有变化 调用callback
    let hasChange = prevDeps ?  depsAry.every((dep,index) => dep === prevDeps[index]) === false : true
    // 判断值是否有变化
    if (hasChange) {
      callback()
    }
    // 同步依赖值
    prevDepsAry[effectIndex] = depsAry
    effectIndex ++
  }
}

function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState)
  function dispatch(action) {
    const newState = reducer(state, action)
    setState(newState)
  }
  return [state, dispatch]
}

// state改变重新渲染
function render() {
  stateIndex = 0 // 将索引值重新赋值为0
  effectIndex = 0
  ReactDOM.render(<App />, document.getElementById('root'))
}

function App() {
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

  const [count, dispatch] =useReducer(reducer, 0)
  return (
    <div>
     {count}
     <button onClick={() => dispatch({ type: 'increment'})}>+1</button>
     <button onClick={() => dispatch({ type: 'decrement'})}>-1</button>
    </div>
  )
}

export default App

```

### Formik
#### 1、Formik介绍及基本使用
##### 1.1、Formik介绍
增强表单处理能力，简化表单处理流程


##### 1.2、下载
npm install formik

#### 2、Formik增强表单
##### 2.1、Formik基本使用
使用formik进行表单数据绑定以及表单提交处理
```jsx
import React from 'react'
import { useFormik } from 'formik'

function App() {
  const formik = useFormik({
    initialValues: { username:'zhangsan', password: '123456'},
    onSubmit: value => {
      console.log(value)
    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} />
      <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
      <input type="submit" />
    </form>
  )
}

export default App
```

#### 2、Formik表单验证
##### 2.1、初始验证方式
```jsx
import React from 'react'
import { useFormik } from 'formik'

function App() {
  const formik = useFormik({
    initialValues: { username:'zhangsan', password: '123456'},
    validate: values => {
      const errors = {}
      if (!values.username) {
        errors.username ='请输入用户名'
      } else if (values.username.length > 15) {
        errors.username = '用户名的长度不能大于15'
      }

      if (values.password.length < 6) {
        errors.password = '密码的长度不能小于6'
      }
      
      return errors
    },
    onSubmit: value => {
      console.log(value)
    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} />
      <p>{ formik.errors.username ? formik.errors.username : null}</p>
      <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
      <p>{ formik.errors.password ? formik.errors.password : null}</p>
      <input type="submit" />
    </form>
  )
}

export default App
```

##### 2.2、完善错误信息提示时的用户体验
开启离开焦点时触发验证；提示信息时检查表单元素的值是否被改动过

给input添加onBlur={formik.handleBlur}；显示提示信息还需要判断表单元素是否被改动

```jsx
<form onSubmit={formik.handleSubmit}>
  <input
    type="text"
    name="username"
    value={formik.values.username}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  <p>{ formik.touched.username && formik.errors.username ? formik.errors.username : null}</p>
  <input
    type="password"
    name="password"
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  <p>{ formik.touched.password && formik.errors.password ? formik.errors.password : null}</p>
  <input type="submit" />
</form>
```

##### 2.3、使用yup验证
* 下载yup：`npm install yup`
* 引入 `import * as Yup from 'yup'`
* 定义验证规则
```jsx
const formik = useFormik({
  initialValues: { username:'', password: ''},
  validationSchema: Yup.object({
    username: Yup.string()
              .max(15, '用户名的长度不能大于15')
              .required('请输入用户名'),
    password: Yup.string()
              .min(6, '密码的长度不能小于6')
              .required('请填写密码')
  }),
  onSubmit: value => {
    console.log(value)
  }
})
```

#### 3、使用getFieldProps方法简化表单代码
减少模板代码，getFieldProps会把value、onChange、onBlur属性返回
```jsx
<input
  type="text"
  name="username"
  autoComplete="off"
  { ...formik.getFieldProps('username')}
/>
```

#### 4
##### 4.1、使用组件的方式构建表单
```jsx
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function App() {
  const initialValues = {
    username: ''
  }
  const handleSubmit = (values) => {
    console.log(values)
  }
  const schema = Yup.object({
    username: Yup.string()
              .max(15, '用户名的长度不能大于15')
              .required('请输入用户名')
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />
        <input type="submit" />
      </Form>
    </Formik>
  )
}

export default App
```

##### 4.2、Field组件的as属性
默认情况下，Field组件渲染的是文本框，如要生成其他表单元素可以使用一下语法

```jsx
<Field name="content" as="textarea" />
<Field name="subject" as="select">
  <option value="前端">前端</option>
  <option value="Java">Java</option>
  <option value="Python">Python</option>
</Field>
```

##### 4.3、构建自定义表单控件
使用useField构建自定义表单控件

```jsx
import { useField } from 'formik'

function MyInput({ label, ...props }) {
  const [field, meta] = useField(props)
  
  return <div>
    <label htmlFor={props.id}>{label}</label>
    <input { ...field } { ...props } />
    { meta.touched && meta.error ? <span>{meta.error}</span> : null }
  </div>
}

<MyInput id="myPass" label="密码" name="password" type="password" placeholder="请输入密码" />
```

##### 4.4、构建自定义表单控件复选框
```jsx
function Checkbox({ label, ...props }) {
  const [field, meta, helper] = useField(props)
  const { value } = meta
  const { setValue } = helper
  const handleChange = () => {
    const set = new Set(value)
    if (set.has(props.value)) {
      set.delete(props.value)
    } else {
      set.add(props.value)
    }

    setValue([...set])
  }

  return <div>
    <label htmlFor="">
      <input checked={value.includes(props.value)} type="checkbox" { ...props } onChange={handleChange} /> {label}
    </label>
  </div>
}

<Checkbox value="足球" label="足球" name="hobbies" />
<Checkbox value="篮球" label="篮球" name="hobbies" />
<Checkbox value="橄榄球" label="橄榄球" name="hobbies" />
```

### Component
受控组件与非受控组件的选用标准

非受控组件：表单数据交由DOM节点管理，特点是表单数据在需要时进行获取，代码实现相对简单
```jsx
function App() {
  const userInput = useRef()
  function handleSubmit () {
    const username = userInput.current.value
  }
  return <form onSubmit={handleSubmit}>
    <input type="text" ref={userInput}>
    <input type="submit">
  </form>
}
```

受控组件：表单数据交由state对象管理，特点是可以实时得到表单数据，代码相对复杂
```jsx
class App extends Component {
  state = { username: '' }

  handleChange (event) { this.setState({ username: event.target.value })}

  render() {
    return <form>
      <input type="text" value={this.state.username} onChange={this.handleChange.bind(this)}>
      <span>{ this.state.username }</span>
    </form>
  }
}
```

选用标准：受控组件和非受控组件都有其特点，应该根据需求场景进行选择，
在大多数情况下，推荐使用受控组件处理表单数据，
如果表单在数据交换方面比较简单，使用非受控表单，否则使用受控表单

|  场景   | 非受控  | 受控 |
|  ----  | ----  | ----  |
| 表单提交时取值  | √ | √ |
| 表单提交时验证  | √ | √ |
| 表单项元素实时验证  | × | √ |
| 根据条件禁用提交按钮  | × | √ |
| 强制输入内容的格式  | × | √ |
| 一个数据的多个输入  | × | √ |


### CSS-IN-JS
集成css代码在javascript代码中

#### 1、为什么会有CSS-IN-JS
CSS-IN-JS 是 WEB 项目中将css代码捆绑在javascript代码中的解决方案

这种方案旨在解决css的局限性，例如缺乏动态功能，作用域和可移植性

#### 2、CSS-IN-JS优缺点
优点：
* 让css代码拥有独立的作用域，阻止css代码泄露到组件外部，防止样式冲突
* 让组件更具可移植性，实现开箱即用，轻松创建松耦合的应用程序
* 让组件更具可重用性，只需缩写一次即可，可以在任何地方运行，不仅可以在同一应用程序中重用组件，而且可以在使用相同框架构建的其他应用程序中重用组件
* 让样式具有动态功能，可以将复杂的逻辑应用于样式规则，如果要创建需要动态功能的复杂UI，它是理想的解决方案

缺点：
* 为项目增加了额外的复杂性
* 自动生成的选择器大大降低了代码的可读性

#### 3 Emotion 库
##### 3.1、Emotion 介绍
Emotion 是一个旨在使用javascript编写css样式的库

npm install @emotion/core @emotion/styled @emotion/react

##### 3.2、css属性支持
1. JSX Pragma，通知babel，不需要将jsx语法转换为React.createElement方法，而是需要转换为jsx方法

   |     | Input  | Output |
   |  ----  | ----  | ----  |
   | Before  | `<img src="avatar.png">` | React.createElement('img', { src: 'avatar.png' }) |
   | After  | `<img src="avatar.png">` | jsx('img', { src: 'avatar.png' }) |

    文件添加一下内容
    ```js
    /** @jsx jsx */
    import { jsx } from '@emotion/core'
    ```

2. Babel Preset
   
   npm run eject

   安装依赖 npm install @emotion/babel-preset-css-prop

   在package.json文件中找到babel属性，加入如下内容
   ```json
   "presets": [
     "react-app"
     "@emotion/babel-preset-css-prop"
   ]
   ```
##### 3.3、css方法的使用方式
1. String Styles
```jsx
const style = css`
  width: 100px;
  height: 100px;
  background: skyblue;
`
<div css={style}>App works ... </div>
```

2. Object Styles
```jsx
const style = css({
  width: 200,
  height: 200,
  background: 'red'
})

function App() {
  return <div css={style}>App work</div>
}
```

##### 3.4、css属性优先级
props对象中的css属性优先级高于组件内部的css属性

在调用组件时可以在覆盖组件默认样式
```jsx
const styles = css`
  width: 200px;
  height: 200px;
  background: skyblue;
`
function Css(props) {
  return <div css={styles} {...props}>Css</div>
}

const style = css`
  background: pink
`
function App() {
  return (
    <div >
      <Css css={style} />
    </div>
  )
}
```
##### 3.5、Style Components样式化组件
样式化组件就是用来构建用户界面的，是emotion库提供的另一种为元素添加样式的方法

###### 3.5.1、创建样式化组件
```jsx
import styled from '@emotion/styled'
```

1. String Styles
```jsx
const Button = styled.button`
  color: red
`
```
2. Object Styles
```jsx
const Button = styled.button({
  color: 'red'
})
```

###### 3.5.2、根据props属性覆盖样式
1. String Styles
```jsx
const Button = styled.button`
  width: 100px;
  height: 30px;
  background: ${props => props.bgColor || 'skyblue'};
`
```
2. Object Styles
```jsx
const Container = styled.div(props => ({
  width: props.w || 1000,
  background: 'pink',
  margin: '0 auto'
}))

const Button = styled.button({
  color: 'red'
}, props => ({
  color: props.color
}))
```

###### 3.5.3、为任何组件添加样式
1. String Styles
```jsx
const Demo = ({ className }) => <div className={className}>Demo</div>

const Fancy = styled(Demo)`
  color: red;
`

<Fancy />
```
2. Object Style
```jsx
const Demo = ({ className }) => <div className={className}>Demo</div>

const Fancy = styled(Demo)({
  color: 'green'
})

<Fancy />
```
###### 3.5.4、通过父组件设置子组件样式
1. String Styles
```jsx
const Child = styled.div`
  color: red;
`
const Parent = styled.div`
  ${Child} {
    color: green;
  }
`
```
2. Object Styles
```jsx
const Child = styled.div({
  color: 'red'
})
const Parent = styled.div({
  [Child]: {
    color: 'green'
  }
})

<Child>Child</Child>
<Parent>
  <Child>Child Parent</Child>
</Parent>
```
###### 3.5.5、嵌套选择器 &
& 表示组件本身
```jsx
const Container = styled.div`
  color: red;
  & > span {
    color: pink;
  }
`

<Container>
  <span>span</span>
</Container>
```

###### 3.5.6、as属性
要使用组件中的样式，但是要改呈现的元素，可以使用as属性
```jsx
const Button = styled.button`
  color: red
`
<Button as="a" href="#">button</Button>
```

##### 3.6、样式组合
在样式组合中，后调用的样式优先级高于先调用的样式
```jsx
const base = css`
  color: yellow;
`
const danger = css`
  color: red;
`
<button css={[base, danger]}>button</button>
```

##### 3.7、全局样式
```jsx
import { css, Global } from '@emotion/react'

const styles = css`
  body { margin: 0; }
`

function App() {
  return <div>
    <Global styles={styles} />
    App works ...
  </div>
}
```

##### 3.8、使用keyframes方法定义关键帧动画
```jsx
const move = keyframes`
  0% { left: 0; top: 0; background: pink; }
  100% { top: 300px; left: 600px; background: skyblue; }
`
const box = css`
  width: 100px;
  height: 100px;
  position: absolute;
  animation: ${move} 2s ease infinite alternate;
`

function App() {
  return <div css={box}>
    App work ...
  </div>
}
```

##### 3.9、主题
1. 下载主题模块
  npm install @emotion-react

2. 引入ThemeProvider组件
  `import { ThemeProvider } from '@emotion-react'`

3. 将ThemeProvider放置在视图最外层
  ```jsx
  function App() {
    return <ThemeProvider></ThemeProvider>
  }
  ```

4. 添加主题内容
  ```jsx
    const theme= {
      colors: {
        primary: 'hotpink'
      }
    }
    <ThemeProvider theme={theme}></ThemeProvider>
  ```

5. 获取主题内容
  ```jsx
  // 方式一
  const getPrimaryColor = props => css`
    color: ${props.colors.primary}
  `
  <div css={getPrimaryColor}></div>

  // 方式二
  import { useTheme } from 'emotion-theming'
  function Demo() {
    const theme = useTheme()
  }
  ```

### Chakra UI
现代化React UI框架Chakra-UI

#### 1、Chakra-UI介绍
Chakra UI是一个简单的、模块化的、易于理解的UI组件库，提供了丰富的构建React应用所需的UI组件

文档: https://next.chakra-ui.com/docs/getting-started

1. Chakra UI 内置Emotion，是CSS-IN-JS 解决方案的集大成者
2. 基于Styled-Systems https://styled-system.com/
3. 支持开箱即用的主题功能
4. 默认支持白天和黑夜两种模式
5. 拥有大量功能丰富且非常有用的组件
6. 使响应式设计变得轻而易举
7. 文档清晰而全面，查找API更加容易
8. 适用于构建用于展示的给用户的界面
9. 框架正在变得越来越完善

#### 2、Chakra-UI 快速开始
##### 2.1、下载chakra-ui

注意react17用的是@chakra-ui/react

react16是@chakra-ui/core

`npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion`

##### 2.2、克隆默认主题
Chakra-UI提供的组件是建立在主题基础之上的，只有先引入了主题组件才能够使用其他组件

`npm install @chakra-ui/theme`

##### 2.3、引入主题
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import theme from '@chakra-ui/theme'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
)
```

##### 2.4、依赖清单
```json
"dependencies": {
  "@chakra-ui/react": "^1.0.4",
  "@chakra-ui/theme": "^1.2.2",
  "@emotion/react": "^11.1.3",
  "@emotion/styled": "^11.0.0",
  "@testing-library/jest-dom": "^5.11.4",
  "@testing-library/react": "^11.1.0",
  "@testing-library/user-event": "^12.1.10",
  "framer-motion": "^4.1.17",
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "react-scripts": "4.0.3",
  "web-vitals": "^1.0.1"
}
```

##### 2.5、应用组件
```jsx
import { Button } from '@chakra-ui/react'

function App() {
  return (
    <div >
      <Button>按钮</Button>
    </div>
  )
}

export default App
```

#### 3、Style Props 样式属性
https://chakra-ui.com/docs/features/style-props

Style Props是用来更改组件样式的，通过为组件传递属性的方式实现，通过传递简化的样式属性以达到提升开发效率的目的

注意react17用的是@chakra-ui/react

react16是@chakra-ui/core

```jsx
import { Box } from '@chakra-ui/react'

function App() {
  return (
    <div >
      <Box w="200px" h="200px" bgColor="tomato"></Box>
    </div>
  )
}
export default App
```

| 样式属性 | css属性| 主题 |
| ---- | ---- | ---- |
| m，margin | margin | space |
| mx | margin-left and margin-right | space |
| p, padding | padding | space |
| py | padding-top and padding-bottom | space |
| bg | background | colors |
| bgColor | background-color | colors |
| color | color | colors |
| border | border | borders |
| textAlign | text-align | none |
| w，width | width | sizes |
| boxSize | width and height | sizes |
| d，display | display | none |
| pos，position | position | none |
| left | left | space |
| shadow，boxShadow | box-shadow | shadows |

#### 4、主题
##### 4.1、颜色模式（color mode）
chakra-ui提供的组件都支持两种颜色模式，浅色模式（light）和暗色模式（dark），可以通过useColorMode进行颜色模式的更改。

```jsx
import { Box, Text, Button, useColorMode } from '@chakra-ui/react'

function App() {
  const {colorMode, toggleColorMode} = useColorMode() // 注意这里是对象解构，不是数组解构
  return (
    <Box w={256} h={200} bg='tomato'>
      <Text>当前的颜色模式为 {colorMode}</Text>
      <Button onClick={toggleColorMode}>切换颜色模式</Button>
    </Box>
  );
}

export default App
```

Chakra 将颜色模式存储在localStorage中，并使用类名策略来确保颜色模式是持久的

##### 4.2、根据颜色模式设置样式
chakra运行在为元素设置样式时根据颜色模式产生不同值，通过useColorModeValue钩子函数实现

```jsx
import { Box, useColorModeValue } from '@chakra-ui/react'

const bgColor = useColorModeValue('tomato', 'skyblue')
<Box w={256} h={200} bg={bgColor}></Box>
```

##### 4.3、强制组件颜色模式
使组件不受颜色模式的影响，始终保持在某个颜色模式下的样式，使用LightMode组件包裹需要作用的组件只显示浅色模式，使用DarkMode组件包裹需要作用的组件只显示暗色模式

当颜色模式为暗色模式时，被包裹的组件依然是浅色模式
```jsx
import { LightMode, DarkMode } from '@chakra-ui/react'

<LightMode>
  <Button onClick={toggleColorMode}>切换颜色模式</Button>
</LightMode>
```

##### 4.4、颜色模式通用设置
1. 设置默认颜色模式
   通过theme.config.initialColorMode可以设置应用的默认主题
2. 使用操作系统所使用的颜色模式
   通过theme.config.useSystemColorMode可以设置将应用的颜色模式设置为操作系统所使用的颜色模式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import theme from '@chakra-ui/theme'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'

// 1. 设置默认颜色模式
// theme.config.initialColorMode = 'dark'

// 2. 使用操作系统所使用的颜色模式
theme.config.useSystemColorMode = true

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
)

```

##### 4.5、主题对象
1. Colors
   在设置颜色时，可以但不限于取主题中提供的颜色值
    ```jsx
    function App() {
      return <Box w={256} h={200} bg="gray.500"></Box>
    }
    ```
2. Space
   使用space可以自定义项目间距，这些间距值可以由padding，margin 和 top，left，right，bottom样式引用
   ```jsx
   // lg => 32rem
   <Box mt={6} w="lg" h="2xl" bg="gray.500"></Box>
   ```
3. Breakpoints
   配置响应数组值中使用的默认断点，这些值将用于生成移动优先（即最小宽度）的媒体查询
   ```jsx
   // theme.js
   export default {
     breakpoints: ['30em', '48em', '62em', '80em']
   }
   ```
   ```jsx
   // 数组中第一个值是默认值，后面的值和上面的theme值一一对应关系
   <Box fontSize={['12px', '14px', '16px', '18px', '20px']}>
   ```

##### 4.6、创建标准的Chakra-UI组件
1. 创建chakra-UI组件
    ```jsx
    import { chakra } from '@chakra-ui/react'

    const LaGouButton = chakra("button", {
      baseStyle: {
        borderRadius: 'lg'
      },
      sizes: {
        sm: {
          px: '3', // padding-left/padding-right
          py: '1', // padding-right/padding-bottom
          fontSize: '12px'
        },
        md: {
          px: '4',
          py: '2',
          fontSize: '14px'
        }
      },
      variants: { // 风格化样式
        primary: {
          bgColor: 'blue.500',
          color: 'white'
        },
        danger: {
          bgColor: 'red.500',
          color: 'white'
        }
      }
    })

    LaGouButton.defaultProps = {
      size: 'sm',
      variant: 'primary'
    }

    function App() {
      return (
        <div>
          <LaGouButton> 按钮 </LaGouButton>
        </div>
      )
    }

    export default App
    ```
2. 全局化Chakra-UI组件样式
    * 在src文件夹中创建LaGou文件夹用于放置自定义Chakra-UI组件
    * 在LaGou文件夹中创建button.js文件并将组件样式放置于当前文件中并进行默认导出
      ```jsx
      const LaGouButton = {
        baseStyle: {
          borderRadius: 'lg'
        },
        sizes: {
          sm: {
            px: '3', // padding-left/padding-right
            py: '1', // padding-right/padding-bottom
            fontSize: '12px'
          },
          md: {
            px: '4',
            py: '2',
            fontSize: '14px'
          }
        },
        variants: { // 风格化样式
          primary: {
            bgColor: 'blue.500',
            color: 'white'
          },
          danger: {
            bgColor: 'red.500',
            color: 'white'
          }
        },
        defaultProps: {
          size: 'sm',
          variant: 'primary'
        }
      }

      export default LaGouButton
      ```

    * 在LaGou文件夹中创建index.js文件用于导入所有自定义的Chakra-UI再导出所有的自定义组件
      ```jsx
      import LaGouButton from './Button'

      export default {
        LaGouButton
      }
      ```

    * 在src文件夹中的index.js文件中导入自定义Chakra-UI组件并和theme.components属性进行合并
      ```jsx
      import React from 'react'
      import ReactDOM from 'react-dom'
      import App from './App'
      import theme from '@chakra-ui/theme'
      import { ChakraProvider, CSSReset } from '@chakra-ui/react'
      import LaGouComponents from './LaGou'

      const myThem = {
        ...theme,
        components: {
          ...theme.components,
          ...LaGouComponents
        }
      }

      console.log(myThem)

      ReactDOM.render(
        <ChakraProvider theme={myThem}>
          <App />
        </ChakraProvider>,
        document.getElementById('root')
      )
      ```

    * 在组件中使用样式化组件
      ```jsx
      import { chakra } from '@chakra-ui/react'

      const LaGouButton = chakra("button", {
        themeKey: 'LaGouButton'
      })

      function App() {
        return (
          <div>
            <LaGouButton size="md"> 按钮 </LaGouButton>
          </div>
        )
      }

      export default App
      ```

### React组件性能优化
React 组件性能优化的核心是减少真实DOM节点的频率，减少Virtual DOM对比的频率

#### 1、组件卸载前进行清理操作
在组件中为window注册的全局事件，以及定时器，在组件卸载前要清理掉，防止组件卸载后继续执行影响应用性能。

需求：开启定时器然后卸载组件，查看组件中的定时器是否还在运行
```jsx
function Test() {
  useEffect(() =>{
    let timer = setInterval(() => {
      console.log('定时器在执行')
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return <div>Test</div>
}
```

#### 2、通过纯组件提升组件性能（类组件）
1. 什么是纯组件
   * 纯组件会对组件输入数据进行浅层比较，如果当前输入数据和上次输入数据相同，组件不会重新渲染

2. 什么是浅层比较
   * 比较引用数据类型在内存中的引用地址是否相同，比较基本数据类型的值是否相同

3. 如何实现纯组件
   * 类组件继承 PureComponent 类，函数组件使用 memo 方法

4. 为什么不直接进行diff操作，而是要先进行浅层比较，浅层比较难道没有性能消耗吗
   * 和进行 diff 比较操作相比，浅层比较将消耗更少的性能。diff 操作会重新遍历整顿 virtualDOM 树，而浅层比较只操作当前组件的state和props

需求：在状态对象中存储 name 值为张三，组件挂载完成后将 name 属性的值再次更改为张三，然后分别将 name 传递给纯组件和非纯组件，查看结果
```jsx
import { Component, PureComponent } from 'react'

class App extends Component {
  constructor() {
    super()
    this.state = {
      name: '张三'
    }
  }

  updateName() {
    setInterval(() => {
      this.setState({ name: '张三' })
    }, 1000)
  }

  componentDidMount() {
    this.updateName()
  }

  render() {
    return <>
      <ReguarComponent name={this.state.name} />
      <PureComponentDemo name={this.state.name} />
    </>
  }
}

// 非纯组件
class ReguarComponent extends Component {
  render() {
    console.log('ReguarComponent')
    return <div>{ this.props.name }</div>
  }
}

//纯组件
class PureComponentDemo extends PureComponent {
  render() {
    console.log('PureComponentDemo')
    return <div>{ this.props.name }</div>
  }
}

export default App
```

#### 3、通过shouldComponentUpdate生命周期函数提升组件性能
纯组件只能进行浅层比较，要进行深层比较，使用 shouldComponentUpdate，他用于编写自定义比较逻辑

返回 true 重新渲染组件，返回 false 阻止重新渲染

函数的第一个参数为nextProps，第二个参数为nextState

需求：在页面中展示员工信息，员工信息包括，姓名，年龄，职位，但是在页面中只想展示姓名和年龄，也就是说只有姓名和年龄发生变化时才有必要重新渲染组件，如果员工的其他信息发生了变化没必要重新渲染组件

```jsx
import { Component } from 'react'

class App extends Component {
  constructor() {
    super()
    this.state = {
      person: {
        name: '张三',
        age: 20,
        job: 'waiter'
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ person: {...this.state.person, job: 'chef'}})
    }, 2000)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.person.name !== this.state.person.name || nextState.person.age !== this.state.person.age) {
      return true
    }
    return false
  }

  render() {
    console.log('render') // 没调用shouldComponentUpdate做处理更改数据会执行多次
    return (
      <div>
        { this.state.person.name } { this.state.person.age }
      </div>
    )
  }
}
export default App
```

#### 4、通过纯组件提升组件性能（函数组件【React.memo】）
1. memo 基本使用
   
   将函数组件变为纯组件，将当前props和上一次的props进行浅层比较，如果相同就阻止组件重新渲染。

   需求：父组件维护两个状态，index 和 name，开启定时器让 index 不断发生变化，name 传递给子组件，查看父组件更新子组件是否也更新了
   ```jsx
    import { useEffect, useState, memo } from "react"

    const ShowName = memo(function ({ name }) {
      console.log('render.......');
      return <div>{ name }</div>
    })

    function App() {
      const [name] = useState('张三')
      const [index, setIndex] = useState(0)
      useEffect(() => {
        setInterval(() => {
          setIndex(prev => prev + 1)
        }, 1000)
      }, [])
      return (
        <div>
          { index }
          <ShowName name={name} />
        </div>
      )
    }

    // function ShowName ({ name }) {
    //   console.log('render.......');
    //   return <div>{ name }</div>
    // }

    export default App

   ```
2. 为memo传递比较逻辑
   
   使用memo方法自定义比较逻辑，用于执行深层比较

   比较函数的第一个参数为上一次的props，比较函数的第二个参数为下一次的props，比较函数返回true，不进行渲染，比较函数返回false，组件重新渲染
   ```jsx
    import { useEffect, useState, memo } from "react"

    function compare(prevProps, nextProps) {
      if (prevProps.person.name !== nextProps.person.name || prevProps.person.age !== nextProps.person.age) {
        return false
      }
      return true
    }

    const ShowName = memo(function ({ person }) {
      console.log('render.......');
      return <div>{ person.name } {person.age}</div>
    }, compare)

    function App() {
      const [person, setPerson] = useState({ name: '张三', age: 20, job: 'waiter' })
      
      useEffect(() => {
        setInterval(() => {
          setPerson({ ...person, job: 'chef' })
        }, 1000)
      }, [])
      
      return (
        <div>
          <ShowName person={person} />
        </div>
      )
    }

    export default App
   ```

#### 5、通过组件懒加载提供应用性能
1. 创建执行异步操作的Action创建函数
   ```jsx
   import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
   import axios from 'axios'

   export const loadTodos = createAsyncThunk(
     'todos/loadTodos',
     (payload, thunkAPI) => {
       axios.get(payload).then(response => thunkAPI.dispatch(setTodos(response.data)))
     }
   )
   ```
2. 创建接收异步操作结果的Reducer
   ```jsx
   const { reducer: TodosReducer, actions } = createSlice({
     reducers: {
       setTodos: (state, action) => {
         action.payload.forEach(todo => state.push(todo))
       }
     }
   })
   ```
#### 6、根据条件进行组件懒加载
1. 创建执行异步操作的Action创建函数
   ```jsx
   import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
   import axios from 'axios'

   export const loadTodos = createAsyncThunk('todos/loadTodos', playload => {
     return axios.get(payload).then(response => response.data)
   })
   ```
2. 创建接收异步操作结果的Reducer
   ```jsx
   createSlice({
     extraReducers: {
       [loadTodos.fulfilled]: (state, action) => {
         action.playload.forEach(todo => state.push(todo))
       }
     }
   })
   ```
#### 7、通过使用占位符标记提升React组件的渲染性能
配置中间件`npm i redux-logger`

```jsx
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

export default configureStore({
  middleware: [...getDefaultMiddleware(), logger]
})
```
#### 8、不要使用内联函数定义
在使用内联函数后，render 方法每次运行时都会创建该函数的新实例，
导致 React 在进行 Virtual DOM对比时，新旧函数比对不相等，
导致 React 总是为元素绑定新的函数实例，而旧的函数实例又要交给垃圾回收处理。
```jsx
import { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: ''
    }
  }

  render() {
    return (
      <input
        value={this.state.inputValue}
        onChange={e => this.setState({ inputValue: e.target.value })}
      />
    )
  }
}
```

正确的做法是在组件中单独定义函数，将函数绑定给事件
```jsx
import { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: ''
    }
  }

  setInputValue = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    return (
      <input
        value={this.state.inputValue}
        onChange={this.setInputValue}
      />
    )
  }
}
```
#### 9、在构造函数中进行函数this绑定
在类组件中如果使用 fn(){} 这种方式定义函数，函数`this`默认指向`undefined`，也就是说函数内部的this指向需要被更正，
可以在构造函数中对函数的`this`进行更正，也可以在行内进行更正，两者看起来没有太大区别，但是对性能的影响是不同的

```jsx
export default class App extends Component {
  constructor() {
    super()
    // 方式一
    // 构造函数只执行一次，所以函数this指向更正的代码也只执行一次
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log(this)
  }

  render() {
    // 方式二
    // 问题：render方法每次执行时都会调用bind方法生成新的函数实例
    return <button onClick={this.handleClick.bind(this)}>按钮</button>
  }
}
```

结论：所以在构造函数中进行`this`指向的更正性能比较高，因为他只执行一次

#### 10、类组件中的箭头函数
在类组件中使用箭头函数不会存在`this`指向问题，因为箭头函数本身并不绑定`this`

```jsx
export default class App extends Component {
  handleClick = () => console.log(this)

  render() {
    return <button onClick={this.handleClick}>按钮</button>
  }
} 
```

箭头函数在`this`指向问题上占优势，但是同时也有不利的一面。

当使用箭头函数，该函数被添加为类的实例对象属性，而不是原型对象属性，如果组件被多次重用，每个组件实例对象中都将会有一个相同的函数实例，降低了函数实例的可重用性造成了资源浪费

综上所诉，更正函数内部`this`指向的最佳做法仍是在构造函数中使用`bind`方法进行绑定

#### 11、避免使用内联样式属性
当使用内联`style`为元素添加样式时，内联`style`会被编译为`Javascript`代码，通过`Javascript`代码将样式规则映射到元素的身上，浏览器就会花费更多的时间执行脚本和渲染`UI`，从而增加了组件的渲染时间

```jsx
function App() {
  return <div style={{ backgroundColor: 'skyblue' }}>App works</div>
}
```

在上面的组件中，为元素附加了内联样式，添加的内联样式为`Javascript`对象，`backgroundColor`需要被转换为等效的`CSS`样式规则，然后将其应用到元素，这样涉及到脚本的执行。内联样式问题在于，它是在执行时为元素添加样式，而不是在编译时添加样式，所以的性能非常低

更好的办法是将`CSS`文件导入样式组件，能通过`CSS`直接做的事情就不要通过`Javascript`去做，因为`Javascript`操作`DOM`非常慢

#### 12、优化条件渲染
频繁的挂载和卸载组件是一项耗性能的操作，组件的挂载和卸载就是进行`DOM`操作，为了确保应用程序的性能，应该减少组件挂载和卸载的次数。

在`React`中我们经常会根据条件渲染不同的组件，条件渲染是一项必做的优化操作

```jsx
function App() {
  if (true) {
    return (
      <>
        <AdminHeader />
        <Header />
        <Content />
      </>
    )
  } else {
    return (
      <>
        <Header />
        <Content />
      </>
    )
  }
}
```

在上面的代码中，当渲染条件发生变化时，React内部在做`Virtual DOM`对比时发现，刚刚第一个组件是`AdminHeader`，现在第一个组件是`Header`，刚刚第二个组件是`Header`，现在第二个组件是`Content`，组件发生了变化，`React`就会卸载`AdminHeader`、`Header`、`Content`，重新挂载`Header`和`Content`，这种挂载和卸载就是没有必要的。只需要根据需要判断是否渲染`AdminHeader`就可以了

```jsx
function App() {
  return(
    <>
      {true && <AdminHeader />}
      <Header />
      <Content />
    </>
  )
}
```

#### 13、避免重复无限渲染
当应用程序状态发生更改时，`React`会调用`render`方法，如果`render`方法中继续更改应用程序状态，就会发生`render`方法递归调用导致应用报错

```jsx
export default class App extends Component{
  constructor() {
    super()
    this.state = { name: '张三'}
  }
  render() {
    this.setState({ name: '李四' })
    return <div>{ this.state.name }</div>
  }
}
```

与其他生命周期函数不同，`render`方法应该被作为纯函数，这意味着在`render`方法中不要做以下事情，比如不要调用`setState`方法；不要使用其他手段查询更改原生`DOM`元素，以及其他更改应用程序的任何操作，`render`方法的执行要根据状态的改变，这样可以保持组件的行为和渲染方式一致。

#### 14、为组件创建错误边界
默认情况下，组件渲染错误会导致整个应用程序中断，创建错误边界可确保在特定组件发生错误时应用程序不会中断。

错误边界是一个`React`组件，可以捕获子级组件在渲染时发生的错误，当错误发生时，可以将错误记录下来，可以显示备用`UI`界面

错误边界涉及到两个生命周期函数，分别为`getDerivedStateFromError`和`componentDidCatch`

`getDerivedStateFromError`为静态方法，方法中需要返回一个对象，该对象会和`state`对象进行合并，用于更改应用程序状态

`componentDidCatch`方法用于记录应用程序错误信息，该方法的参数就是错误对象

```jsx
// ErrorBoundaries.js
import { Component } from 'react'
import App from './App'

export default class ErrorBoundaries extends Component {
  constructor() {
    super()
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error) {
    console.log('componentDidCatch')
  }

  static getDerivedStateFromError() {
    console.log('getDerivedStateFromError')
    return {
      hasError: true
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>发生错了</div>
    } 
    return <App />
  }
}
```

```jsx
// App.js
import { Component } from 'react'

export default class App extends Component {
  render() {
    // throw new Error('抛出的错误')
    return <div>App work </div>
  }
}
```

```jsx
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import ErrorBoundaries from './ErrorBoundaries'

ReactDOM.render(<ErrorBoundaries />, document.getElementById('root'))
```

注意：错误边界不能捕获异步错误，比如点击按钮时发生的错误

#### 15、避免数据结构突变
组件中`props`和`state`的数据结构应该保持一致，数据结构突变会导致输出不一致

```jsx
import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      employee: {
        name: '张三',
        age: 20
      }
    }
  }

  render() {
    const { name, age } = this.state.employee

    return (
      <div>
        { name } { age }
        <button onClick={() => this.setState({
          ...this.state,
          employee: {
            ...this.state.employee, // 正确做法，不能把name丢了
            age: 30
          }
        })}>
          change name
        </button>
      </div>
    )
  }
}
```

#### 16、优化依赖项大小
在应用程序中经常会依赖第三方包，当我们不想引用包中的所有代码，我们只想用到哪些代码就包含哪些代码，此时可以使用插件对依赖项进行优化

当我们就使用`lodash`举例，应用基于`create-react-app`脚手架创建
1. 下载依赖`yarn add react-app-rewired customize-cra lodash babel-plugin-lodash`

   1. `react-app-rewired`：覆盖`create-react-app`的默认配置
       ```jsx
       module.exports = function(oldConfig) {
         return newConfig
       }
       // 参数中的oldConfig就是默认的webpack config
       ```

   2. `customize-cra`：导出了一些辅助方法，可以让以上写法更加简洁
      ```jsx
      const { override, useBabelRc } = require('customize-cra')

      module.exports = override(
        (oldConfig) => newConfig,
        (oldConfig) => newConfig
      )
      ```
      override：可以接收多个参数，每个参数都是一个配置函数，函数接收`oldConfig`，返回`newConfig`
      useBabelRc：允许使用`.babelrc`文件进行`babel`配置

    3. `babel-plugin-lodash`：对应用中的`lodash`进行精简

2. 在项目的根目录下新建 `config-overrides.js` 并加入配置代码
   ```jsx
   const { override, useBabelRc } = require('customize-cra')
   module.exports = override(useBabelRc())
   ```

3. 修改 `package.json` 文件中的构建命令
   ```jsx
   "scripts": {
     "start": "react-app-rewired start",
     "build": "react-app-rewired build",
     "test": "react-app-rewired test --env=jsdom",
     "eject": "react-scripts eject"
   }
   ```

4. 创建 `.babelrc` 文件并加入配置
   ```jsx
   {
     "plugins": ["lodash"]
   }
   ```

5. 生产环境下的三种JS文件
   * `main.[hash].chunk.js`：这是你的应用程序代码，App.js等
   * `1.[hash].chunk.js`：这是第三方库的代码，包含你在`node_modules`中导入的模块
   * `runtime-main.[hash].js`：webpack运行时代码
   
6. App组件
   ```jsx
   import React from 'react'
   import _ from 'lodash'

   function App() {
     console.log(_.chunk(['a','b','c','d'],2))
     return <div>App work</div>
   }

   export default App
   ```

总结：
1. 下载依赖`yarn add react-app-rewired customize-cra lodash babel-plugin-lodash`
2. 在项目的根目录下新建 `config-overrides.js` 并加入配置代码
3. 修改 `package.json` 文件中的构建命令
4. 创建 `.babelrc` 文件并加入配置
5. 项目中使用第三方包，打包对依赖项进行优化


