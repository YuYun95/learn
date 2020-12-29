import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement(virtualDOM) {
  let newElement = null // 创建的新元素
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    updateNodeElement(newElement, virtualDOM) // 为元素设置属性
  }
  // 递归创建子节点
  virtualDOM.children.forEach(child => {
    // 这里没有直接调用 mountNativeElement，是因为不知道virtualDOM 是 NativeElement 还是 Component
    mountElement(child, newElement)
  })

  return newElement
}
