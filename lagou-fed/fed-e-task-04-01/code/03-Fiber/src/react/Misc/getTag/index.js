const getTag = vdom => {
  if (typeof vdom.type === 'string') { // 普通节点
    return 'host_component'
  }
}

export default getTag
