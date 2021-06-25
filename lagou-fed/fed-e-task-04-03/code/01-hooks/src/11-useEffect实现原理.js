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
