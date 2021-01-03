import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";
import diffComponent from "./diffComponent";

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // 如果oldDOM 不存在，直接转换为DOM挂载到页面
    mountElement(virtualDOM, container)

    // 如果 Virtual DOM 类型一样,并且 Virtual DOM 不是组件 因为组件要单独进行处理
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 如果节点类型不相同直接替换，不用再对比子节点了
    const newElement = createDOMElement(virtualDOM)
    oldDOM.parentNode.replaceChild(newElement, oldDOM)

  } else if (typeof virtualDOM.type === 'function') { // 如果virtualDOM是组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container)

  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素节点属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }


    // 1.将拥有key属性的子元素放置在一个单独的对象中
    let keyedElement = {}
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      let domElement = oldDOM.childNodes[i]
      if (domElement.nodeType == 1) { // 判断为元素节点
        let key = domElement.getAttribute('key')
        if (key) {
          keyedElement[key] = domElement
        }
      }
    }

    // 是否找到了拥有key属性的元素
    let hasNoKey = Object.keys(keyedElement).length === 0

    // 如果没有找到拥有key属性的元素 就按照索引进行比较
    if (hasNoKey) {
      // 递归子元素，更新子元素
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i])
      })
    } else {
      // 2. 循环 virtualDOM 的子元素 获取子元素的key属性
      virtualDOM.children.forEach((child, i) => {
        // 获取要进行比对的元素的key属性
        let key = child.props.key
        // 如果key属性存在
        if (key) {
          // 到已存在的DOM属性对象中查找对应的DOM元素
          let domElement = keyedElement[key]
          // 如果找到元素就说明该元素已经存在 不需要重新渲染
          if (domElement) {
            // 3. 看看当前位置的元素是不是我们期望的元素
            // 虽然 DOM 元素不需要重新渲染 但是不能确定元素的位置就一定没有发生变化
            // 所以还要查看一下元素的位置
            // 看一下 oldDOM 对应的(i)子元素和 domElement 是否是同一个元素 如果不是就说明元素位置发生了变化
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              // 元素位置发生了变化
              // 将 domElement 插入到当前元素位置的前面 oldDOM.childNodes[i] 就是当前位置
              // domElement 就被放入了当前位置
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }

    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes
    // 判断旧节点的数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        // 有节点需要被删除
        for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          unmountNode(oldChildNodes[i])
        }
      } else {
        // 通过key属性删除旧节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i]
          let oldChildKey = oldChild._virtualDOM.props.key
          let found = false
          for (let n = 0; n < virtualDOM.children.length; n++) {
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true
              break
            }
          }
          if (!found) {
            unmountNode(oldChild)
            i--
          }
        }
      }
    }
  }
}
