import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'

export default function mountComponent(virtualDOM, container, oldDOM) {
  // 存放组件调用后的 virtual DOM 的容器
  let nextVirtualDOM = null
  let component = null

  // 判断组件时类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件 调用 buildFunctionalComponent 方法处理函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
    component = nextVirtualDOM.component
  }

  // 判断得到的 Virtual DOM 是否是组件(组件调用组件的情况【父子组件】)
  if (isFunction(nextVirtualDOM)) {
    // 如果是组件 继续调用 mountComponent 解剖组件
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    // 如果是Navtive Element 就去渲染
    mountNativeElement(nextVirtualDOM, container, oldDOM)
  }

  // 如果组件实例对象存在的话
  if (component) {
    component.componentDidMount()
    // 判断组件实例对象身上是否有 props 属性 props 属性中是否有 ref 属性
    if (component.props && component.props.ref) {
      // 调用 ref 方法并传递组件实例对象
      component.props.ref(component)
    }
  }
}

/**
 * type: function Heart(props) {
 *   return <div>&heart;{props.title}</div>
 * }
 * @param virtualDOM
 * @returns {*}
 */
function buildFunctionComponent(virtualDOM) {
  // 通过 Virtual DOM 中的 type 属性获取到组件函数并调用
  // 调用组件函数是将 Virtual DOM 对象中的 props 属性传递给组件函数 这样在组件中就可以通过 props 属性获取数据了
  // 组件返回要渲染的 Virtual DOM
  return virtualDOM.type(virtualDOM.props || {})
}

// 处理类组件
function buildClassComponent(virtualDOM) {
  // 实例化类组件 得到类组件实例对象 并将 props 属性传递进类组件
  const component = new virtualDOM.type(virtualDOM.props || {})
  // 调用类组件中的render方法得到要渲染的 virtualDOM 并返回
  const nextVirtualDOM = component.render()
  nextVirtualDOM.component = component // 保存实例对象
  return nextVirtualDOM
}
