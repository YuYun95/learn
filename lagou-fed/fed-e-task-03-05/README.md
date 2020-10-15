### 一、Vue3.0 性能提升主要是通过哪几方面体现的
1. 响应式系统升级

    Vue3.0 使用 Proxy 对象重写了响应式系统
    * Vue.js 2.x 中响应式系统的核心 defineProperty
        * 初始化的时候递归遍历所有的属性转换为 getter 和 setter
        * 动态添加属性调用 Vue.set() 处理
        * 监听不到属性的删除，数组的索引和 length 属性也监听不到
     
     Vue.js 3.0 使用 Proxy 对象重写响应式系统
        * 可以监听动态添加的属性
        * 可以监听删除的属性
        * 可以监听数组的索引和length属性

2. 编译优化
    
    优化编译过程和重写虚拟DOM提升渲染性能
    * Vue.js 2.x 通过标记静态根节点优化 diff 的过程
    * Vue.js 3.0 标记和提升所有静态根节点，diff 的时候只需要对比动态节点内容
        * Fragments
        * 静态提升
        * Patch flag
        * 缓存事件处理函数

3. 源码体积优化
    
    优化代码体积和Tree-shaking支持，减小打包体积
    * Vue.js 3.0 移除了一些不常用的API
        * 例如：inline-template 等
    * Tree-shaking
        * 例如：Vue3中没用到的模块不会打包，但是核心模块会打包。Keep-Alive、transition等都是按需引入

### 二、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别
* Options API
    * 包含一个描述组件选项（data、methods、props等）的对象
    * Options API 开发复杂组件，同一个功能逻辑的代码被拆分到不同选项
* Composition API
    * Vue.js 3.0 新增的一组 API
    * 一组基于函数的 API
    * 可以更灵活的组织组件的逻辑

### 三、Proxy 相对于 Object.defineProperty 有哪些优点
* 可监听动态新增的属性
* 可以监听删除的属性
* 可以监听数组的索引和length属性
* 返回一个新对象，可以只操作新对象达到目的

### 四、Vue 3.0 在编译方面有哪些优化
* Vue.js 3.0 标记和提升所有静态根节点，diff 的时候只需要对比动态节点内容
    * Fragments
    * 静态提升
    * Patch flag
    * 缓存事件处理函数

### 五、Vue.js 3.0 响应式系统的实现原理

Vue.js 3.0 中reactive函数创建响应式数据，reactive函数会先判断参数是否是对象，如果不是对象就直接返回，如果是对象使用 Proxy 对象转换为响应式对象

在属性的get方法调用track方法收集依赖，track会先判断当前是否有要收集的依赖activeEffect，没有就直接return。然后检查对象是否已经收集过了（收集过的依赖存储在WeakMap
中），如果不存在就先在WeakMap中创建一个该对象的位置，指向一个存放属性的Map，然后去WeakMap获取到该对象对应的Map，然后判断Map对象是否有值，如果没有就给Map创建一个Set对象，然后把activeEffect加入到Set

在属性的set、deleteProperty方法中触发更新函数trigger，trigger会先在WeakMap中获取目标对象，如果没有就直接返回，如果有就获取目标对象的Map遍历触发Set监听函数activeEffect，执行更新
