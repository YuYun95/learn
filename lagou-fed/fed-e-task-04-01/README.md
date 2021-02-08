### 1. 请简述 React 16 版本中初始渲染的流程
要将 React 元素渲染到页面中，分为两个阶段，render 阶段和 commit 阶段。

render 阶段负责创建 Fiber 数据结构并为 Fiber 节点打标记，标记当前 Fiber 节点要进行的 DOM操作。

commit 阶段负责根据 Fiber 节点标记(effectTag)进行相应的 DOM 操作

### 2. 为什么 React 16 版本中 render 阶段放弃了使用递归
React 16之前的版本对比更新Virtual DOM是采用循环加递归实现。这种对比方式有一个问题，就是一旦任务开始进行就无法中断，如果应用中组件数量庞大，主线程长期占用，直到整颗Virtual DOM
树对比完成之后主线程才能被释放，主线程才能执行其他任务。这就导致一些用户交互、动画等任务无法立即得到执行，页面就产生卡顿，非常的影响用户体验

核心问题：递归无法中断，执行重任务耗时长。javascript又是单线程，无法同时执行其他任务，导致任务延迟页面卡顿，用户体验差

### 3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情
commit 第一个子阶段(before mutation)之前 DOM 操作之前，调用类组件的 getSnapshotBeforeUpdate 生命周期函数

commit 第二个子阶段(mutation)根据 effectTag 执行 DOM 操作

commit 第三个子阶段(layout)执行 DOM 操作后
    
### 4. 请简述 workInProgress Fiber 树存在的意义是什么
React 中，DOM 更新采用了双缓存技术，双缓存技术致力于更快快速的DOM更新

在 React 中，最多会同时存在两棵 Fiber 树，当前在屏幕中显示的内容对应的 Fiber 树叫做 current Fiber 树，当发生更新时，React 会在内存中重新构建一棵新的 Fiber 树，这棵重在构建的 Fiber
 树 叫做 workInProgress Fiber 树。在双缓存技术中 workInProgress Fiber 树就是即将要显示在页面中的 Fiber树，当这棵 Fiber 树构建完成后，React会使用它直接替换 current Fiber 树达到快速更新 DOM的目的，因为workInProgress Fiber树是在内存中构建的所以构建他的速度是非常快的

一旦workInProgress Fiber 树在屏幕呈现，它就会变成current Fiber树

在 current Fiber 节点对象中有一个 alternate 属性指向对应的workInProgress Fiber 节点对象，在workInProgress Fiber 节点中有一个 alternate
 属性也指向对应的 current Fiber 节点对象
