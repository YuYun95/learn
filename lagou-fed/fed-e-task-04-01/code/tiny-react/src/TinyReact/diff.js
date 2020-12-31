import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // 如果oldDOM 不存在，直接转换为DOM挂载到页面
    mountElement(virtualDOM, container)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素节点属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 循环子元素，更新子元素
    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })
  }
}
