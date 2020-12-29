import mountElement from './mountElement'

export default function diff(virtualDOM, container, oldDOM) {
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // 如果oldDOM 不存在，直接转换为DOM挂载到页面
    mountElement(virtualDOM, container)
  }
}
