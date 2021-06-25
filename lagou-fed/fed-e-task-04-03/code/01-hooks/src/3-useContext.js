import React, { createContext, useContext } from 'react'

const countContext = createContext()

function App(props) {
  return <countContext.Provider value={100}>
   <Foo />
 </countContext.Provider>
}

function Foo() {
  const value = useContext(countContext)
  return <div>我是Foo组件{value}</div>
}

export default App
