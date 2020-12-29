## VirtualDOM 及 Diff 算法
### 1. JSX到底是什么
使用React就一定会写JSX，JSX到底是什么呢？他是一种javascript语法扩展，React使用它来描述用户界面长什么样子，虽然他看起来非常像HTML，但他确实是javascript。在React代码执行之前，Babel会将JSX编译为React API
```react
<div className="container">
    <h3>Hello React</h3>
    <p>React is great</p>
</div>
```
```js
React.createElement(
    'div',
    {
        className: 'container'
    },
    React.createElement('h3', null, 'Hello React'),
    React.createElement('p', null, 'React is great')
)
```
从两种语法对比来看，JSX语法的出现是为了让React开发人员编写用户界面代码更加轻松
[Babel REPL](https://babeljs.io/repl)

### 2. DOM操作问题
在现代web应用程序中使用javascript操作DOM是必不可少的，但遗憾的是他比其他大多数javascript操作要慢的多。

大多数javascript框架对应DOM的更新远远超过其必须进行的更新，从而使得这种缓慢操作变得更糟

例如假设你有包含是个项目的列表，你仅仅更改了列表中的第一项，大多数javascript框架会重建整个列表，这比必要的工作要多十倍。

更新效率低下宜家成为严重问题，为了解决这个问题，React普及了一种Virtual DOM的东西

### 3. 什么是 Virtual DOM
Virtual DOM出现的目的就是为了提高javascript操作DOM对象的效率

在React中，每个DOM对象都有一个对应的Virtual DOM对象，他是DOM对象的javascript对象表现形式，其实就是使用javascript对象来描述DOM对象信息，比如DOM对象的类型是什么，他身上有哪些属性，它拥有哪些子元素

可以把Virtual DOM对象理解为DOM对象的副本，但是他不能直接显示在屏幕上
```html
<div className="container">
  <h3>Hello React</h3>
  <p>React is great</p>
</div>
```
```js
{
  type: 'div',
  props: { className: 'container' },
  children: [
    {
      type: 'h3',
      props: null,
      children:[
        {
          type: 'text',
          props: { textContent: 'Hello React' }
        }
      ]
    },
    {
      type: 'p',
      props: 'null',
      children: [
        {
          type: 'text',
          props: { textContent: 'React is great' }
        }
      ]
    }
  ]
}
```

### 4. Virtual DOM 如何提升效率
精准找出发生改变的DOM对象，只更新发生变化的部分

在React第一次创建DOM对象后，会为每个DOM对象创建其对应的Virtual DOM对象，在DOM对象发生变化更新之前，React会先更新所有的Virtual DOM对象，然后React会将更新后的Virtual DOM和更新前的Virtual DOM进行比较，从而找出发生变化的部分，React会将发生变化的部分更新到真实DOM对象中，React仅更新必要更新的部分

Virtual DOM对象的更新和比较仅发生在内存中，不会在视图中渲染任何内容，所以这一部分的性能损耗成本是微不足道的。

![](../img/04.jpg)

```html
<div id="container">
	<p>Hello React</p>
</div>
```
```html
<div id="container">
	<p>Hello Angular</p>
</div>
```
```js
const before = {
  type: "div",
  props: { id: "container" },
  children: [
    {
      type: "p",
      props: null,
      children: [
        { type: "text", props: { textContent: "Hello React" } }
      ]
    }
  ]
}
```
```js
const after = {
  type: "div",
  props: { id: "container" },
  children: [
    {
      type: "p",
      props: null,
      children: [
        { type: "text", props: { textContent: "Hello Angular" } }
      ]
    }
  ]
}
```

### 5. 创建 Virtual DOM
在React代码执行前，JSX不被Babel转为React.createElement方法的调用，在调用从reactElement方法时会传入元素的类型，元素的属性，以及元素的子元素，createElement方法的返回值为构建好的Virtual DOM 对象
```js
{
  type: "div",
  props: null,
  children: [{type: "text", props: {textContent: "Hello"}}]
}
```
```js
/**
 * 创建 Virtual DOM
 * @param {string} type 类型
 * @param {object | null} props 属性
 * @param  {createElement[]} children 子元素
 * @return {object} Virtual DOM
 */
function createElement (type, props, ...children) {
	return {
    type,
    props,
    children
  } 
}
```
从createElement方法的第三个参数开始就都是子元素了，在定义createElement方法时，通过...children将所有的子元素放置到children数组中。
```js
const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
  </div>
)
console.log(virtualDOM)
```
通过以上代码测试，发现返回的 Virtual DOM 存在一些问题，第一个问题是文本节点被直接放入到了数组中

![](../img/05.jpg)

而我们期望是文本节点应该是这样的

```js
children: [
  {
    type: "text",
    props: {
      textContent: "React is great"
    }
  }
]
```
通过以下代码对 Virtual DOM 进行改造，重新构建 Virtual DOM。
```js
// 将原有 children 拷贝一份 不要在原有数组上进行操作
const childElements = [].concat(...children).map(child => {
  // 判断 child 是否是对象类型
  if (child instanceof Object) {
    // 如果是 什么都不需要做 直接返回即可
    return child
  } else {
    // 如果不是对象就是文本 手动调用 createElement 方法将文本转换为 Virtual DOM
    return createElement("text", { textContent: child })
  }
})
return {
  type,
  props,
  children: childElements
}
```

![](../img/06.jpg)

通过观察返回的 Virtual DOM，文本节点已经被转化成了对象类型的 Virtual DOM，但是布尔值也被当做文本节点被转化了，在 JSX 中，如果 Virtual DOM 被转化为了布尔值或者null，是不应该被更新到真实 DOM 中的，所以接下来要做的事情就是清除 Virtual DOM 中的布尔值和null。
```js
// 由于 map 方法无法从数据中刨除元素, 所以此处将 map 方法更改为 reduce 方法
const childElements = [].concat(...children).reduce((result, child) => {
  // 判断子元素类型 刨除 null true false
  if (child != null && child != false && child != true) {
    if (child instanceof Object) {
      result.push(child)
    } else {
      result.push(createElement("text", { textContent: child }))
    }
  }
  // 将需要保留的 Virtual DOM 放入 result 数组
  return result
}, [])
```

在 React 组件中，可以通过 props.children 获取子元素，所以还需要将子元素存储在 props 对象中。
```js
return {
  type,
  props: Object.assign({ children: childElements }, props),
  children: childElements
}
```

### 6.渲染 Virtual DOM 对象为真实 DOM 对象
通过调用render方法可以将Virtual DOM对象更新为真实DOM对象

在更新之前需要确定是否存在旧的 Virtual DOM，如果存在需要比较差异，如果不存在可以直接将Virtual DOM 转为 DOM对象

目前先只考虑不存在旧 Virtual DOM 的情况，就是说想直接将Virtual DOM对象更新为真实DOM对象

```js
// render.js
import diff from './diff'

export default function render(virtualDOM, container, oldDOM) {
  diff(virtualDOM, container, oldDOM)
}
```

```js
// diff.js
import mountElement from './mountElement'

export default function diff(virtualDOM, container, oldDOM) {
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // 如果 oldDOM 不存在 不需要对比 直接将Virtual DOM 转换为真实DOM
    mountElement(virtualDOM, container)
  }
}
```

在进行 Virtual DOM 转换之前还需要确定 Virtual DOM 的是普通的Virtual DOM对象还是组件形式的Virtual DOM（Component VS Native Element）

类型不同需要做不同的处理，如果是Native Element直接转换

如果是组件 还需要等到组件实例对象，通过组件实例对象获取组件返回的Virtual DOM然后再进行转换

目前只考虑Native Element的情况
```js
// mountElement.js
import mountNativeElement from './mountNativeElement'

export default function mountElement(virtualDOM, container) {
  // Component VS NativeElement
  // 如果是普通的Virtual DOM对象，直接转换为DOM
  mountNativeElement(virtualDOM, container)

  // 如果是组件Virtual DOM
}
```

```js
// mountNativeElement.js
import createDOMElement from './createDOMElement'

export default function mountNativeElement(virtualDOM, container) {
  let newElement = createDOMElement(virtualDOM) // 创建的新元素

  // 将转换后的DOM对象放置页面（子节点添加到父节点，最外层的将添加到根节点root）
  container.appendChild(newElement)
}
```

```js
// createDOMElement.js
import mountElement from './mountElement'

export default function createDOMElement(virtualDOM) {
  let newElement = null // 创建的新元素
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
  }
  // 递归创建子节点
  virtualDOM.children.forEach(child => {
    // 这里没有直接调用 mountNativeElement，是因为不知道virtualDOM 是 NativeElement 还是 Component
    mountElement(child, newElement)
  })

  return newElement
}
```

### 7. 为元素节点添加属性
```js
// createDOMElement.js
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement(virtualDOM) {
  let newElement = null // 创建的新元素
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    updateNodeElement(newElement, virtualDOM) // 为元素设置属性
  }
  // 递归创建子节点
  virtualDOM.children.forEach(child => {
    // 这里没有直接调用 mountNativeElement，是因为不知道virtualDOM 是 NativeElement 还是 Component
    mountElement(child, newElement)
  })

  return newElement
}
```

```js
// updateNodeElement.js
export default function updateNodeElement(newElement, virtualDOM) {
  // 获取要解析的Virtual DOM节点对象的属性对象
  const newProps = virtualDOM.props
  // 将属性对象中的属性名称放到一个数组中并循环数组
  Object.keys(newProps).forEach(propName => {
    const newPropsValue = newProps[propName]
    // 考虑属性名称是否以 on 开头，如果是就表示是个事件属性
    // 判断属性是否是事件属性
    if (propName.startsWith('on')) {
      // 事件名称
      const eventName = propName.toLowerCase().slice(2)
      // 为元素添加事件
      newElement.addEventListener(eventName, newPropsValue)
      // 如果属性名称是 value 或者 checked 需要通过 [] 的形式添加
    } else if (propName === 'value' || propName === 'checked') {
      newElement[propName] = newPropsValue
      // 刨除 children 因为他是子元素 不是属性
    } else if (propName !== 'children') {
      if (propName === 'className') {
        // className 属性单独处理 不直接在元素上添加 class 属性是因为 class 是 javascript 中的关键字
        newElement.setAttribute('class', newPropsValue)
      } else {
        // 普通属性
        newElement.setAttribute(propName, newPropsValue)
      }
    }
  })
}
```

### 8.组件渲染
#### 8.1函数组件
在渲染组件之前首先要明确的是，组件的Virtual DOM 类型值为函数，函数组件和类组件都是这样的
```base
// 原始组件
const Heart = () => <span>&hearts;</span>
```
```base
<Heart />
```
```js
// 组件的 Virtual DOM
{
  type: f function() {},
  props: {},
  children: []
}
```
在渲染组件时，要先将Component 与 Native Element 区分开，如果是 Native Element 可以直接开始渲染，如果是组件，特别处理
```js
// mountElement.js
import isFunction from './isFunction'

export default mountElement(virtualDOM, container) {
  // 无论是类组件还是函数组件，其实本质上都是函数
  // 如果 Virtual DOM 的type 属性值为函数 就说明当前这个 Virtual DOM 为组件
  if (isFunction(virtualDOM)) {
    // 如果是组件 调用 mountComponent 方法进行组件渲染
    mountComponent(virtualDOM, container)
  } else {
    mountNativeElement(virtualDOM, container)
  }
}
```

```js
// isFunction.js
// Virtual DOM 是否为函数类型
export default function isFunction(virtualDOM) {
  return virtualDOM && typeof virtualDOM.type === "function"
}
```

在 mountComponent 方法中再进行函数组件和类型的区分，然后再分别进行处理
```js
// mountComponent.js
import mountNativeElement from './mountNativeElement'
import isFunctionComponent from './isFunctionComponent'

export default function mountComponent(virtualDOM, container) {
  // 存放组件调用后的 virtual DOM 的容器
  let nextVirtualDOM = null
  // 区分函数类型组件和类组件
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件 调用 buildFunctionalComponent 方法处理函数组件
    nextVirtualDOM = buildFunctionalComponent(virtualDOM)
  } else {
    // 类组件
  }
  // 判断得到的 Virtual DOM 是否是组件（组件调用组件的情况）
  if (isFunction(nextVirtualDOM)) {
    // 如果是组件 继续调用 mountComponent 解剖组件
    mountComponent(nextVirtualDOM, container)
  } else {
    // 如果是Navtive Element 就去渲染
    mountNativeElement(nextVirtualDOM, container)
  }
}

/**
 * 函数组件处理
 * type: function Heart(props) {
 *   return <div>&heart;{props.title}</div>
 * }
 * @param virtualDOM
 * @returns {*}
 */
function buildFunctionalComponent(virtualDOM) {
  // 通过 Virtual DOM 中的 type 属性获取到组件函数并调用
  // 调用组件函数是将 Virtual DOM 对象中的 props 属性传递给组件函数 这样在组件中就可以通过 props 属性获取数据了
  // 组件返回要渲染的 Virtual DOM
  return virtualDOM && virtualDOM.type(virtualDOM.props || {})
}
```

```js
// isFunctionComponent.js
// Virtual DOM 是否是函数型组件
// 条件有两个：1. Virtual DOM 的 type 属性值为函数 2.函数的原型对象中不能有render方法
// 只有类组件的原型对象中有render方法
export default function isFunctionComponent(virtualDOM) {
  const type = virtualDOM && virtualDOM.type
  return (
    type && isFunction(virtualDOM) && !(type.prototype && prototype.render)
  )
}
```

#### 8.2类组件
类组件也是 Virtual DOM，可以通过 Virtual DOM 中的 type 属性确定当前需要渲染的组件时类组件还是函数组件

在确定当前渲染的组件为类组件后，需要实例化类组件得到类组件实例对象，通过类组件实例对象调用类组件中的 render 方法，获取组件要渲染的 Virtual DOM。

类组件需要基础Component父类，子类需要通过 super 方法将自身的 props 属性传递给 Component 父类，父类会将props属性挂载为父类属性，子类继承了父类，所以子类也就拥有了props属性。这样做的好处是当 props 发生更新后，父类可以根据更新后的props帮助子类更新视图
```js
class Alert extends TinyReact.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.title}
        {this.props.message}
      </div>
    )
  }
}
```
```js
// Component.js
export default class Component {
  constructor(props) {
    this.props = props
  }
}
```
在 mountComponent 方法中通过调用 buildStatefulComponent 方法得到类组件要渲染的 Virtual DOM
```js
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'

export default function mountComponent(virtualDOM, container) {
  // 存放组件调用后的 virtual DOM 的容器
  let nextVirtualDOM = null
  // 判断组件时类组件还是函数组件
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件 调用 buildFunctionalComponent 方法处理函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
  }

  // 判断得到的 Virtual DOM 是否是组件(组件调用组件的情况【父子组件】)
  if (isFunction(nextVirtualDOM)) {
    // 如果是组件 继续调用 mountComponent 解剖组件
    mountComponent(nextVirtualDOM, container)
  } else {
    // 如果是Navtive Element 就去渲染
    mountNativeElement(nextVirtualDOM, container)
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
  return component.render()
}
```


















































