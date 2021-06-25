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
