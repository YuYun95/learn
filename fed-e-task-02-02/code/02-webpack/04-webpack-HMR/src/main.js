import createEditor from './editor'
import background from './better.png'
import './global.css'

const editor = createEditor()
document.body.appendChild(editor)

const img = new Image()
img.src = background
document.body.appendChild(img)

// ============== 一下用于处理HMR 与业务代码无关
console.log(createEditor)

// js 热更新：报存旧数据，代码发生变化后把数据回填
if (module.hot) {
  let lastEditor = editor
  module.hot.accept('./editor', () => {
    // console.log('editor HMR')
    // console.log(createEditor)
    const value = lastEditor.innerHTML
    document.removeChild(editor)
    const newEditor = createEditor()
    newEditor.innerHTML = value
    document.body.appendChild(newEditor)
    lastEditor = newEditor
  })

  // 图片热更新
  module.hot.accept('./better.png', () => {
    img.src = background
    console.log(background)
  })
}


