import createDOMElement from './createDOMElement'
import unmountNode from "./unmountNode";

export default function mountNativeElement(virtualDOM, container, oldDOM) {
  let newElement = createDOMElement(virtualDOM) // 创建的新元素

  if (oldDOM) {
    container.insertBefore(newElement, oldDOM)
  } else  {
    // 将转换后的DOM对象放置页面（子节点添加到父节点，最外层的将添加到根节点root）
    container.appendChild(newElement)
  }

  // 判断旧的DOM对象是否存在，如果存在删除
  if(oldDOM) {
    unmountNode(oldDOM)
  }

  let component = virtualDOM.component
  if (component) {
    component.setDOM(newElement)
  }
}
