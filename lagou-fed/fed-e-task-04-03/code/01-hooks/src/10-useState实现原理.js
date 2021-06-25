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
  stateIndex = 0 // 将索引值重新赋值为0
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
