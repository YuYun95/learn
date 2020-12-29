import createDOMElement from './createDOMElement'

export default function mountNativeElement(virtualDOM, container) {
  let newElement = createDOMElement(virtualDOM) // 创建的新元素

  // 将转换后的DOM对象放置页面（子节点添加到父节点，最外层的将添加到根节点root）
  container.appendChild(newElement)
}
