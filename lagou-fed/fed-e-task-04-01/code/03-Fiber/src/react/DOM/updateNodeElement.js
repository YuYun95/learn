export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM = {}) {
  // 获取要解析的Virtual DOM节点对象的属性对象
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}

  // 文本节点
  if (virtualDOM.type === 'text') {
    // 文本内容有变化
    if (newProps.textContent !== oldProps.textContent) {
      // 新旧父级节点不相同
      if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
        // 把最新节点追加到父级节点中
        virtualDOM.parent.stateNode.appendChild(document.createTextNode(newProps.textContent))
      } else {
        // 新旧父级节点相同
        virtualDOM.parent.stateNode.replaceChild(
          document.createTextNode(newProps.textContent),
          oldVirtualDOM.stateNode
        )
      }
    }
    return
  }

  // 将属性对象中的属性名称放到一个数组中并循环数组
  Object.keys(newProps).forEach(propName => {
    // 获取属性值
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (newPropsValue !== oldPropsValue) {
      // 考虑属性名称是否以 on 开头，如果是就表示是个事件属性
      // 判断属性是否是事件属性
      if (propName.startsWith('on')) {
        // 事件名称
        const eventName = propName.toLowerCase().slice(2)
        // 为元素添加事件
        newElement.addEventListener(eventName, newPropsValue)

        // 删除原有的事件处理函数
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue)
        }

        // 如果属性名称是 value 或者 checked 需要通过 [] 的形式添加
      } else if (propName === 'value' || propName === 'checked') {
        newElement[propName] = newPropsValue
        // 刨除 children 因为他是子元素 不是属性
      } else if (propName !== 'children') {
        if (propName === 'className') {
          // className 属性单独处理 不直接在元素上添加 class 属性是因为 class 是 javascript 中的关键字
          newElement.setAttribute('class', newPropsValue)
        } else {
          // 普通属性
          newElement.setAttribute(propName, newPropsValue)
        }
      }
    }


  })

  // 判断属性被删除的情况
  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (!newPropsValue) {
      // 属性被删除了
      if (propName.startsWith('on')) {
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropsValue)
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName)
      }
    }
  })
}
