### 1、请简述 Vue 首次渲染的过程
* 首先初始化Vue的实例成员和静态成员
* 初始化后，调用构造函数，在构造函数中调用 `this._init()`
* 在 `_init()`中合并 `options`、初始化生命周期相关变量、`render`、`provide`初始化、把 `inject` 的成员注入的 `vm` 上，触发`beforeCreate`和`created`钩子函数，最终执行`vm.$mount()`方法挂载页面
* `$mount()`方法在 `entry-runtime-with-compiler.js`和 `web/runtime/index.js`两个文件中都有定义，首先会调用 `entry-runtime-with-compiler.js`中的`$mount()`方法，获取`el`对象，判断选项是否传入了`render`函数，如何没有传入`render`函数，则把`template`或者`el`转换成`render`函数，它是通过`compileToFunctions()`函数，帮我们把模板编译成`render`函数的,当把`render`函数编译好之后，它会把`render`函数存在我们的`options.render`中
* 那接下来会调用`runtime/index.js`中的`$mount()`方法，这个方法首先会重新获取`el`，因为如果是运行时版本的话，是不会走`entry-runtime-with-compiler.js`这个入口中获取`el`，所以如果是运行时版本的话，我们会在`runtime/index.js`的`$mount()`中重新获取`el`
* 接下来调用`mountComponent()`，`mountComponent()`是在`src/core/instance/lifecycle.js`中定义的，在`mountComponent()`中，首先会判断`render`选项，如果没有`render`，但是传入了模板，并且当前是开发环境的话会发送警告，警告运行时版本不支持编译器
* 触发`beforeMount`钩子函数
* 然后定义了`updateComponent`方法，该方法调用了`_update`和`_render`方法，`_render`方法生成虚拟DOM，`_update`方法将虚拟DOM转换为真实DOM，并且挂载到页面
* 再接下来就是创建`Watcher`对象，在创建`Watcher`时，传递了`updateComponent`这个函数，这个函数最终是在`Watcher`内部调用的。在`Watcher`创建完之后还调用了`get`方法，在`get`方法中，会调用`updateComponent()`
* 然后触发了生命周期的钩子函数`mounted`,挂载结束，最终返回Vue实例
* [首次渲染过程](http://naotu.baidu.com/file/cdbee9a84390935a0033b2d2ad3bdd87?token=ba670d8fe9b92850)

### 2、请简述 Vue 响应式原理
* Vue 的响应式从`_init()`方法中开始，在`_init()`方法中调用了`initState()`方法初始化Vue实例的状态，`initState()`方法调用了`initData()`方法变量`data`属性注入到Vue实例，调用`observe()`把`data`转为响应式对象
* 在创建`observer`对象时，给`value`对象定义不可枚举的`__ob__`属性，记录当前的`observer`对象，然后再进行数组的响应式处理和对象的响应式处理，数组的响应式处理就是拦截数组的几个特殊的方法，`push`、`pop`、`shift`等，然后找到数组对象中的`__ob__`对象中的`dep`,调用`dep`的`notify()`方法，再遍历数组中每一个成员，对每个成员调用`observer()`；如果这个成员是对象的话，也会转换成响应式对象。对象的响应式处理，就是调用`walk`方法，遍历对象的每一个属性，调用`defineReactive`方法把属性转为`getter`和`setter`
* `defineReactive`会为每一个属性创建`dep`对象，为当前属性收集依赖，如果当前属性的值是对象，会继续调用`observe()`方法，把属性值也转为`getter`和`setter`，即监视多层属性的变化。`defineReactive`中最核心的方法是`getter`和`setter`。`getter`的作用是收集依赖，为每一个属性收集依赖，如果这个属性的值是对象，那也要为子对象收集依赖，给子对象收集依赖，目的是子对象添加和删除成员时发送通知；最后返回属性的值。在`setter`中，先保存新值，如果新值是对象，调用`observe`，然后派发更新（发送通知），调用`dep.notify()`
* 收集依赖时，在`watcher`对象的`get`方法中调用`pushTarget`记录`Dep.target`属性，访问`data`中的成员的时候收集依赖，`defineReactive`的`getter`中收集依赖，把属性对应的`watcher`对象添加到`dep`的`subs`数组
* 在数据发生变化的时候，会调用`dep.notify()`发送通知，`dep.notify()`会调用`watcher`对象的`update()`方法，`update()`中的调用的`queueWatcher()`会去判断`watcher`是否被处理，如果这个`watcher`对象没有的话添加到`queue`队列中，并调用`flushScheduleQueue()`，`flushScheduleQueue()`触发`beforeUpdate`钩子函数调用`watcher.run()`： `run() --> get() --> getter() --> updateComponent()`
* 然后清空上一次的依赖
* 触发`actived`的钩子函数
* 触发`updated`钩子函数

* [响应式处理过程](http://naotu.baidu.com/file/88f290b66057aa8647fc1664e85134cc?token=322e530a5e0dcaca)

### 3、请简述虚拟 DOM 中 Key 的作用和好处
在v-for的过程中，可以给每一个节点设置key属性，以便它能够跟踪每个节点的身份，从而重用和重新排序现有元素，设置key比不设置key的DOM操作要少很多，会优化DOM操作

### 4、请简述 Vue 中模板编译的过程
* 模板编译函数在`entry-runtime-with-compiler.js`文件中调用，函数名为`compileToFunction`，把`template`编译为`render
`函数，在`compileToFunction`方法中调用了`createCompiler`方法，该方法又调用了`createCompilerCreator
`方法，传递`baseCompile`方法作为参数
* `baseCompile`方法做了三件事情，第一，调用`parse`方法把模板编译成`AST(抽象语法树)`；第二，调用`optimize`方法优化`AST`，标记模板中的静态内容，在`patch
`的时候直接跳过静态内容，在`patch`的过程中静态内容不需要对比和重新渲染；第三，调用`generate
`方法把`AST`转换为`js`形式的代码；最后返回一个包含`AST`、`render`(此时的render是字符串形式的)、`staticRenderFns`属性的对象
* 在`createCompilerCreator`方法中返回了`createCompileToFunctionFn`方法(会缓存编译之后的结果)，该方法先从缓存中加载编译好的`render
`函数(这是拿空间换时间)，如果缓存中没有的话，就去调用`compile`函数，在`compile`函数中，首先去合并选项，然后调用`baseCompile`函数编译模板，把编译后字符串形式的代码转换为js代码
* 所以入口文件中调用`compileToFunction`方法返回`render`方法和`staticRenderFns`并且调用这两个方法，最后调用`$mount`方法，渲染`DOM`

[模板编译过程](http://naotu.baidu.com/file/b1152b57f8b3d3a5d501c1464e81f2f2?token=82b8bb5bdd4d7776)
