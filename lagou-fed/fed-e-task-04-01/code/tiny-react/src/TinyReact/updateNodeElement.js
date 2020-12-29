export default function updateNodeElement(newElement, virtualDOM) {
  // 获取要解析的Virtual DOM节点对象的属性对象
  const newProps = virtualDOM.props
  // 将属性对象中的属性名称放到一个数组中并循环数组
  Object.keys(newProps).forEach(propName => {
    const newPropsValue = newProps[propName]
    // 考虑属性名称是否以 on 开头，如果是就表示是个事件属性
    // 判断属性是否是事件属性
    if (propName.startsWith('on')) {
      // 事件名称
      const eventName = propName.toLowerCase().slice(2)
      // 为元素添加事件
      newElement.addEventListener(eventName, newPropsValue)
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
  })
}
