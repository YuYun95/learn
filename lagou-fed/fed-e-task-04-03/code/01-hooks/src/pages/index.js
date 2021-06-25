/*
 * @Author: your name
 * @Date: 2021-03-15 14:47:37
 * @LastEditTime: 2021-06-09 18:06:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \hooks\src\index.js
 */
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