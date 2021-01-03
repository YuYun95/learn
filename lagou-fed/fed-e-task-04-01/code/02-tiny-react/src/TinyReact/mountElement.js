import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'
import mountComponent from './mountComponent'

export default function mountElement(virtualDOM, container, oldDOM) {
  // 无论是类组件还是函数组件，其实本质上都是函数
  // 如果 Virtual DOM 的type 属性值为函数 就说明当前这个 Virtual DOM 为组件
  if (isFunction(virtualDOM)) {
    // Component 如果是组件Virtual DOM 调用 mountComponent 方法进行组件渲染
    mountComponent(virtualDOM, container,oldDOM)
  } else {
    // NativeElement
    // 如果是普通的Virtual DOM对象，直接转换为DOM
    mountNativeElement(virtualDOM, container, oldDOM)
  }
}
