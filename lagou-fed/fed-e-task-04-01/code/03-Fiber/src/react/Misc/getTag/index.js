import { Component } from '../../Component'

const getTag = vdom => {
  if (typeof vdom.type === 'string') { // 普通节点
    return 'host_component'
  } else if (Object.getPrototypeOf(vdom.type) === Component) {
    return 'class_component'
  } else {
    return 'function_component'
  }
}

export default getTag
