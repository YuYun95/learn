/*
 * @Author: your name
 * @Date: 2021-06-09 14:08:12
 * @LastEditTime: 2021-06-09 14:08:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \hooks\src\8-1-useRef.js
 */
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