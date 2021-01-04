import { createTaskQueue, arrified, createStateNode, getTag } from '../Misc'

const taskQueue = createTaskQueue()

// 要执行的子任务
let subTask = null

const getFirstTask = () => {
  // 从任务队列中获取任务
  const taks = taskQueue.pop()

  // 返回最外层节点的fiber对象
  return {
    props: taks.props,
    stateNode: taks.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
}

const reconcileChildren = (fiber, children) => {
  // children可能是对象 也可能是数组，将children转换成数组
  const arrifiedChildren = arrified(children)

  let index = 0
  let numberOfElement = arrifiedChildren.length
  let element = null
  let newFiber = null
  let prevFiber = null

  while (index < numberOfElement) {

    // 子级 Virtual DOM 对象
    element = arrifiedChildren[index]

    // 子级fiber对象
    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'placement',
      parent: fiber
    }
    // 为fiber节点添加DOM对象或组件实例对象
    newFiber.stateNode = createStateNode(newFiber)

    // 为父级 fiber 添加子级 fiber
    if (index === 0) { // 如果索引为0那么就认为是子节点
      fiber.child = newFiber
    } else { // 否则就认为是兄弟节点
      // 为fiber添加下一个兄弟fiber
      prevFiber.sibling = newFiber // 兄弟节点
    }
    prevFiber = newFiber
    index++
  }
}

const executeTask = fiber => {
  // 构建子级fiber对象
  reconcileChildren(fiber, fiber.props.children)
  if (fiber.child) {
    // 返回子级作为父级，构建孙子fiber（构建节点树的左侧关系）
    return fiber.child
  }
  console.log(fiber)
}

const workLoop = deadline => {
  // 如果子任务不存在 就去获取子任务
  if (!subTask) {
    subTask = getFirstTask()
  }
  /**
   * 因为任务拆分为一个个小任务，所以要循环执行
   * 如果任务存在并且浏览器有空余时间(空闲时间大于1ms)就调用
   * executeTask 方法执行任务 接收任务 返回新的任务
   */
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask)
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline)
  /**
   * 判断任务是否存在 判断任务队列中是否还有任务没有执行
   * 再一次告诉浏览器在空闲的时间执行任务
   */
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask)
  }
}

export const render = (element, dom) => {
  /**
   * 1. 向任务队列中添加任务
   * 2. 指定在浏览器空闲时执行任务
   */

  /**
   * 任务就是通过 vdom 对象构建 fiber 对象
   */
  taskQueue.push({
    dom,
    props: { children: element }
  })

  // 指定在浏览器空闲的时候执行任务
  requestIdleCallback(performTask)
}
