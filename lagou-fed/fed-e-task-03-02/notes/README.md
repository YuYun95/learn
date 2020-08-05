# 一、Vue.js 源码剖析-响应式原理

### Vue的不同构建版本
* **完整版**：同时包含**编译器**和**运行时**的版本
* **编译器**：用来将模板字符串编译成为 javascript 渲染函数的代码，体积大、效率低
* **运行时**：用来车间 Vue 实例、渲染并处理虚拟 DOM 等代码，体积小、效率高。基本上就是除去编译器的代码
* **UMD**：UMD 版本**通用的模块版本**，支持多种模块方式。vue.js 默认文件就是运行时 + 编译器的 UMD 版本
* **Commonjs(cjs)**：Commonjs 版本用来配合老的打包工具比如 Browserify 或 webpack 1
* **ES Module**：从2.6开始 Vue会提供两个 ES Module(ESM)构建文件，为现代打包工具提供的版本
    * ESM 该是被设计为可以可以被静态分析，所以打包工具可以利用这一点来进行‘tree-shaking’并将用不到的代码排除出最终的包

### 寻找入口文件
* 执行构建
```
npm run dev
# "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"
# --environment TARGET:web-full-dev 设置环境变量 TARGET
```
* script/config.js 的执行过程
    * 作用：生成 rollup 构建的配置文件
    * 使用环境变量 TARGET = web-full-dev
```javascript
// 判断环境变量是否有 TARGET
// 如果有的话，使用 genConfig() 生成 rollup 配置文件
if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  // 否则获取全部配置
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}

```

### 从入口开始
* src/platform/web/entry-runtime-with-compiler.js

通过查看源码解决下面问题
* 观察以下代码，通过阅读源码，回答页面上输出的结果
```javascript
const vm = new Vue({
  el: '#app',
  template: '<h3>Hello template</h3>',
  render (h) {
    return h('h4', 'Hello render')
  }
})
```
阅读源码记录
* el不能是 body 或者 html 标签
* 如果没有 render 方法，把 template 转换成 render 函数
* 如果后 render方法，直接调用 mount 挂载 DOM
```javascript
// 1. el 不能是 body 或者 html
if (el === document.body || el === document.documentElement) {
  process.env.NODE_ENV !== 'production' && warn(
    `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
  )
  return this
}
const options = this.$options
if (!options.render) {
  // 2. 把 template/el 转换成 render 函数
  // ...
}
// 3. 调用 mount 方法，挂载 DOM
return mount.call(this, el, hydrating)
```
* 调试代码
    * 调试的方法
```javascript
const vm = new Vue({
  el: '#app',
  template: '<h1>Hello Template</h1>',
  render(h) {
  return h('h1', 'Hello Render')
 }
})
```
![](./img/02-debug.jpg)

> Vue 的构造函数在哪？
>
> Vue 实例的成员、Vue 的静态成员从哪里来的？

### Vue初始化的过程
四个导出 Vue 的模块
* src/platforms/web/entry-runtime-with-compiler.js
    * web 平台相关的入口
    * 重写了平台相关的 $mount() 方法
    * 注册了 Vue.compile() 方法，传递一个 HTML 字符串返回 render 函数
* src/platforms/web/runtime/index.js
    * web 平台相关
    * 注册和平台相关的全局指令：v-model、v-show
    * 注册和平台相关的全局组件：v-transition、v-transition-group
    * 全局方法：
        * __patch__：把虚拟 DOM 转换成真实 DOM
        * $mount：挂载方法
* src/core/index.js
    * 与平台无关
    * 设置了 Vue 的静态方法，initGlobalAPI(Vue)
* src/core/instance/index.js
    * 与平台无关
    * 定义了构造函数，调用了 this._init(options)方法
    * 给 Vue 中混入了常用的实例成员

### 首次渲染过程
* Vue 初始化，实例成员，静态成员
* new Vue()
* this._init()
* vm.$mount()
    * src/platforms/web/entry-runtime-with-compiler.js 核心作用：把模板编译为 render 函数
    * 如果没有传递 render，获取 template，如果没有 template 获取 el 属性作为模板，把模板编译成 render 函数
    * compileToFunctions() 生产 render() 渲染函数
    * options.render = render
* vm.$mount()
    * src/platforms/web/runtime/index.js
    * mountComponent() 会重新获取 el 
* mountComponent(this,el)
    * src/core/instance/lifecycle.js
    * 判断是否有render选项，如果没有但是传入了模板，并且当前是开发环境的话会发出警告
    * 触发 beforeMount
    * 定义 updateComponent(此处仅仅定义改函数)
        * vm._update(vm._render(),...)
        * vm._render渲染，渲染虚拟DOM
        * vm._update()更新，将虚拟DOM转换成真实DOM
    * 创建 Watcher 实例
        * updateComponent传递
        * 调用 get() 方法
    * 触发 mounted
    * return vm
* watcher.get()
    * 创建完watcher会调用一次get
    * 调用updateComponent()
    * 调用vm._render()创建VNode
        * 调用render.call(vm._renderProxy,vm.$createElement)
        * 调用实例化时Vue传入的render()
        * 或者编译template生产render()
        * 返回VNode
    * 调用vm._update(vnode,...)
        * 调用vm.__patch__(vm.$el,vnode)挂载真实DOM
        * 记录vm.$el

### 三种类型的 Watcher
* 没有静态方法，因为 $watch 方法中要使用 Vue 的实例
* Watcher 分三种：计算属性Watcher、用户Watcher(侦听器)、渲染Watcher
    * 创建顺序：计算属性Watcher、用户Watcher(侦听器)、渲染Watcher
* vm.$watch()
    * 位置：src/core/instance/state.js

# 二、虚拟 DOM
### h 函数
* vm.$createElement(tag, data, children, normalizeChildren)
    * tag
        * 标签名称或者组件对象
    * data
        * 描述 tag，可以设置 DOM 的属性或者标签的属性
    * children
        * tag 中的文本内容或者子节点
* h 函数返回值是一个虚拟 DOM
    * tag：、data、children、text
    * elm：记录真实 dom，当前vnode转换为真实 dom 后记录在该属性
    * key：作用是用来复用元素

### 总结
* vm._init()
* vm.$mount()
* mountComponent()
* 创建 Watcher 对象
* updateComponent()
* vm._render()：调用了用户传递的render函数，或者是模板编译生成的render函数，返回vnode
    * vnode = render.call(vm._renderProxy, vm.$createElement)
    * vm.$createElement()：用户传递
        * h 函数，用户设置的render函数中调用
        * createElement(vm, a, b, c, d, true)
    * vm._c()：模板编译生成
        * h 函数，模板编译的render函数中调用
        * createElement(vm, a, b, c, d, true)
    * _createElement()：无论是编译生成，还是用户传递，都调用_createElement()
        * vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context)
        * vm._render()结束，返回vnode
* vm._update()：处理vnode
    * 负责把虚拟DOM，渲染成真实DOM
    * 首次执行：vm.__path__(vm.$el, vnode, hydrating, false)
    * 数据更新：vm.__path__(prevVnode, vnode)
* vm.__patch__()
    * 位置：runtime/index.js 中挂载 Vue.prototype.__patch__
    * 位置：runtime/patch.js的patch函数
    * 设置 modules 和 nodeOps(nodeOps作用是操作dom)
    * 调用 createPatchFunction() 函数返回 patch 函数
* patch()
    * 位置：vdom/patch.js 中的 createPatchFunction返回patch函数
    * 挂载 cbs 节点的属性/事件/样式 操作的钩子函数
    * 判断第一个参数是真实DOM还是虚拟DOM；首次加载，第一个参数就是真实DOM，转换成VNode，调用createElm
    * 如果是数据更新的时候，新旧节点是sameVnode 执行 patchVnode，也就是diff
    * 删除旧节点
* createElm(vnode, insertedVnodeQueue)
    * 把虚拟节点，转换为真实DOM，并插入到DOM树
    * 把虚拟节点的children，转为真实DOM，并插入到DOM树
* patchVnode
    * 对比新旧VNode，以及新旧VNode的子节点更新差异
    * 如果新旧VNode都有子节点并且子节点不同的话，会调用updateChildren对比子节点的差异
* updateChildren
    * 从头和尾开始一次找到相同的子节点进行比较patchVnode，总共有四种比较方式
    * 在老节点的子节点中查找newStartVnode，并进行处理
    * 如果新节点比老节点多，把新节点插入到DOM中
    * 如果老节点比新节点多，把多余的老节点删除

# 三、模板编译
* compileToFunctions(template, {}, this)，返回 { render, staticRenderFns } ----把模板编译成render函数，由 createCompiler 函数生产
* createCompiler(baseOptions) ----由 createCompilerCreator 函数生成
    * 定义compile(template, options) 函数
    * 生产 compileToFunctions  createCompileToFunctionFn(compile)
    * 返回 { compile, compileToFunctions }
    * compileToFunctions 函数是模板编译的入口
* createCompilerCreator(function baseCompile(){})
    * 传入了 baseCompile(template, finalOptions)函数
    * baseCompile 解析parse、优化optimize 生产generate
    * 返回 createCompiler 函数

### 抽象语法树
* 抽象语法树简称AST(Abstract Syntax Tree)
* 使用对象的形式描述树形的代码结构
* 此处的抽象语法树是用来描述树形结构的 HTML 字符串

### 为什么要使用抽象语法树
* 模板字符串转换成AST后，可以通过AST对模板做优化处理
* 标记模板中的静态内容，在patch的时候直接跳过静态内容
* 在patch的过程中静态内容不需要对比和重新渲染

### 模板编译过程总结
* compileToFunctions(template,...)：先从缓存中加载编译好的render函数；缓存中没有，调用complie(template, options)
* complie(template, options)：合并options，baseCompile(template.trim(), finalOptions)
* baseCompile(template.trim(), finalOptions)
    * parse(): 把template转换成 AST tree
    * optimize()：标记 AST tree中的静态sub trees；检测到静态子树，设置为静态，不需要在每次重新渲染的时候重新生成节点；patch 阶段跳过静态子树
    * generate()：AST tree 生成js的创建代码
* compileToFunctions(template,...)
    * 继续把上一步中生成的字符串形式js代码转为函数
    * createFunction()
    * render和staticRenderFns初始化完毕，挂载到Vue实例的options对应的属性中
