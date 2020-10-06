# Vue.js 3.0 Composition APIs 及 3.0 原理剖析
## Vue.js 3.0介绍
### 一、Vue.js 源码组织方式
1. 源码采用 Typescript 重写

   提高了代码的可维护性。大型项目的开发都推荐使用类型化的语言，在编码的过程中检查类型的问题

2. 使用 Monorepo 管理项目结构
   
   使用一个项目管理多个包，把不同功能的代码放到不同的package中管理，这样每个功能模块划分明确，模块之间的依赖关系也明确，每个功能模块都可以单独测试、单独发布、单独使用

3. 不同的构建版本

    Vue3不再构建UMD模块化的方式，因为UMD会让代码有更多的冗余，它要支持多种模块化的方式。Vue3中将CJS、ESModule和自执行函数的方式分别打包到了不同的文件中。在package/vue中有Vue3的不同构建版本
    * cjs(commonjs模块化方式，两个都是完整版，包含运行时和编译器)
        * vue.cjs.js 开发版，代码没有被压缩
        * vue.cjs.prod.js 生产版，代码被压缩过
    * global 四个文件在浏览器中都可以通过script标签导入，导入后去增加一个全局的Vue对象
        * vue.global.js 完整版，包含编译器和运行时
        * vue.global.prod.js 完整版，生产版代码压缩，包含编译器和运行时
        * vue.runtime.global.js 只包含运行时的构建版本
        * vue.runtime.global.prod.js 只包含运行时的构建版本
    * browser 四个版本都包含esm，浏览器的原生模块化方式，可以直接通过`<script type="module" />`的方式来导入模块
        * vue.esm-browser.js
        * vue.esm-browser.prod.js
        * vue.runtime.esm-browser.js
        * vue.runtime.esm-browser.prod.js
    * bundler 这两个版本没有打包所有的代码，只会打包使用的代码，需要配合打包工具来使用，会让Vue体积更小
        * vue.esm-bundler.js
        * vue.runtime.esm-bundler.js

### 二、Composition API
* RFC(Request For Comments)
   * https://github.com/vuejs/rfcs
* Composition API RFC
   * https://composition-api.vuejs.org

1. 设计动机

   * Options API
       * 包含一个描述组件选项（data、methods、props等）的对象
       * Options API 开发复杂组件，同一个功能逻辑的代码被拆分到不同选项
   * Composition API
       * Vue.js 3.0 新增的一组 API
       * 一组基于函数的API
       * 可以更灵活的组织组件的逻辑

### 三、性能提升
1. 响应式系统升级

   Vue 3.0 使用 Proxy 对象重写了响应式系统
   * Vue.js 2.X 中响应式系统的核心 defineProperty
       * 初始化的时候递归遍历所有的属性，转化为getter、setter
       * 动态添加属性调用vue.set()处理
       * 监听不到属性的删除，数组的索引和length属性也监听不到
   * Vue.js 3.0 中使用 Proxy 对象重写响应式系统
       * 可以监听动态新增的属性
       * 可以监听删除的属性
       * 可以监听数组的索引和length属性
   
2. 编译优化
   
   优化编译过程和重写虚拟DOM提升渲染性能
   * Vue.js 2.x 中通过标记静态根节点，优化 diff 的过程
   * Vue.js 3.0 中标记和提升所有的静态根节点，diff 的时候只需要对比动态节点内容
       * Fragments(vscode升级vetur插件)
       * 静态提升
       * Patch flag
       * 缓存事件处理函数
   
3. 源码体积的优化
   
   优化代码体积和Tree-shaking支持，减小打包体积
   * Vue.js 3.0 中移除了一些不常用的API
       * 如：inline-template、filter 等
   * Tree-shaking
       * 如：Vue3中的没用到的模块不会被打包，但是核心模块会打包。Keep-Alive、transition等都是按需引入的

### 四、Vite
Vue的打包工具。Vite是法语中的"快"的意思

1.ES Module
   * 现代浏览器都支持 ES Module（IE不支持）
   * 通过下面的方式加载模块 `<script type="module" src="..."></script>`
   * 有了type="module"的模块是延迟加载的，类似于 script 标签设置 defer
       * 在文档解析完成后，也就是DOM树生成之后，触发 DOMContentLoaded 事件前执行

2. Vite as Vue-CLI
   * Vite 在开发模式下不需要打包可以直接运行
   * Vue-CLI开发模式下必须对项目打包才可以运行
   * Vite 开发模式使用浏览器原生支持的ESM加载模块，也就是通过import导入模块，支持ESM的现代浏览器通过`<script type="module" src="..."></script>`的方式加载模块
   * Vite在生产环境下使用Rollup打包，Rollup基于浏览器原生ESM打包，不需要使用babel把import转换为require，以及一些辅助函数，所以打包体积小
       * 基于ES Module的方式打包
    * Vue-CLI使用Webpack打包

3. Vite 特点
   * 快速冷启动
   * 按需编译
   * 模块热更新

4. Vite 创建项目
   * Vite 创建项目
       * `npm init vite-app <project-name>`
       * `cd <project-name>`
       * `npm install`
       * `npm run dev`
   * 基于模板创建项目
       * npm init vite-app --template react
       * npm init vite-app --template preact
   
   * Vite开启的web服务会劫持`.vue`请求，首先会把`.vue`文件解析成js文件，并且把响应头中的`Content-Type`设置为`application/javascript`，目的是告诉浏览器发送的是javascript脚本

## Composition API
### 一、Composition API使用
1. 使用Vue3.0

   先创建一个空文件夹，然后进入文件夹执行`npm init -y`，再执行`npm install vue@3.0.0-rc.1`安装vue3.0

   ```base
   <div id="app">
     x: {{position.x}} <br/>
     y: {{position.y}}
   </div>
   <script type="module">
   import {createApp} from './node_modules/vue/dist/vue.esm-browser.js'
   
   const app = createApp({
     data() {
       return {
         position: {
           x: 0,
           y: 0
         }
       }
     }
   })
   console.log(app)
   
   app.mount('#app')
   </script>
   ```

2. setup、reactive的使用
   * createAPP：创建Vue对象
   * setup：Composition API入口
   * reactive：把一个对象转换为响应式对象，嵌套属性也会转换为响应式，返回的是一个Proxy对象
   ```base
   <div id="app">
     x: {{position.x}} <br/>
     y: {{position.y}}
   </div>
   <script type="module">
   import {createApp, reactive} from './node_modules/vue/dist/vue.esm-browser.js'
   
   const app = createApp({
     setup(){ // setup在props解析完毕，在组件实例创建之前执行，this获取不到组件实例
       // 第一个参数 props，响应式对象，不能被解构
       // 第二个参数 context，有三个成员attrs、emit、slots
   
       const position = reactive({
         x: 0,
         y: 0
       })
       return {
         position
       }
     },
     mounted(){
       this.position.x = 100
     }
   })
   console.log(app)
   
   app.mount('#app')
   </script>
   ```

### 二、setup中使用生命周期钩子函数
在setup中使用生命周期钩子函数只需要在生命周期前面加上on，然后生命周期首字母大写。原本的生命周期中的destroy对应的是onUnmounted；setup是在创建组件实例前执行的，所以beforeCreate、created中的代码都可以放在setup中

![](./img/1.jpg)

```base
<div id="app">
  x: {{position.x}} <br/>
  y: {{position.y}}
</div>
<script type="module">
import {createApp, reactive, onMounted, onUnmounted} from './node_modules/vue/dist/vue.esm-browser.js'

function useMousePosition() {
  const position = reactive({
    x: 0,
    y: 0
  })

  const update = e => {
    position.x = e.pageX
    position.y = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return position
}

const app = createApp({
  setup() { // setup在props解析完毕，在组件实例创建之前执行，this获取不到组件实例
    // 第一个参数 props，响应式对象，不能被解构
    // 第二个参数 context，有三个成员attrs、emit、slots

    const position = useMousePosition()
    return {
      position
    }
  },
  mounted() {
    this.position.x = 100
  }
})
console.log(app)

app.mount('#app')
</script>
```

### 三、reactive-toRefs-ref
reactive创建的响应式数据(reactive返回的是Proxy对象)，解构后不再是响应式，相对于声明变量接收属性值，基本类型的赋值就是把值在内存中复制一份，所以解构后的变量是基本类型

toRefs可以把响应式对象的所有属性也转化成响应式

toRefs要求传入的是一个代理对象，如果传入的是非代理对象会报警告

toRefs内容会创建一个新对象，遍历传入的代理对象的所有属性，把所有属性的值都转换为响应式对象，然后挂载到新创建的对象，把新对象返回

toRefs内部会为代理对象的每一个属性创建一个有value属性的对象，该对象是响应式的，value具有getter和setter

所以可以解构toRefs返回的对象，解构之后还是响应式数据，解构的每一个属性也是响应式的

reactive是将普通对象转化成响应式对象，而ref是将基本类型数据包装成了响应式对象，创建具有value属性的对象，value具有getter和setter

ref的使用
```base
<div id="app">
  <button @click="increase">按钮</button>
  <span>{{count}}</span>
</div>
<script type="module">
import {createApp, ref} from './node_modules/vue/dist/vue.esm-browser.js'

function useCount() {
  const count = ref(0) // 将基本类型数据转化成响应式对象
  return {
    count,
    increase: () => {
      count.value++
    }
  }
}

createApp({
  setup() {
    return {
      ...useCount()
    }
  }
}).mount('#app')
</script>
```

如果ref传入的是对象会调用reactive，如果传入的是基本数据类型会创建具有value属性的对象

模板中使用ref的值是可以直接`{{count}}`，但是在js代码中使用ref的值要`xxx.value`

### 四、Computed
computed可以创建一个响应式数据，这个响应式数据依赖于其他响应式数据，就是计算属性
* 第一种用法
    * watch(() => count.value +1)
* 第二种用法
```base
const count = ref(1)
const plusOne = computed({
    get: () => count.value + 1,
    set: value => {
        count.value = value - 1
    }
})
```
使用：
```base
<div id="app">
  <button @click="push">按钮</button>
  未完成： {{activeCount}}
</div>
<script type="module">
import {createApp, reactive, computed} from './node_modules/vue/dist/vue.esm-browser.js'

const data = [
  {text: '看书', completed: false},
  {text: '敲代码', completed: false},
  {text: '约会', completed: true}
]
createApp({
  setup(){
    const todos = reactive(data)

    const activeCount = computed(() => {
      return todos.filter(item => !item.completed).length
    })

    return {
      activeCount,
      push:() => {
        todos.push({
          text: '开会',
          completed: false
        })
      }
    }
  }
}).mount('#app')
</script>
```

### 五、Watch
1. Watch 的三个参数

    * 第一个参数：要监听的数据
    * 第二个参数：监听到数据变化后执行的函数，这个函数有两个参数分别是新值和旧值
    * 第三个参数：选项对象，deep和immediate
    
2. Watch 的返回值

    * 取消监听的函数

使用
```base
<div id="app">
  请选择一个yes/no的问题：
  <input v-model.lazy="question">
  <p>{{answer}}</p>
</div>
<script type="module">
import {createApp, ref, watch} from './node_modules/vue/dist/vue.esm-browser.js'

createApp({
  setup() {
    const question = ref('')
    const answer = ref('')

    watch(question, async (newValue, onlValue) => {
      const response = await fetch('https://yesno.wtf/api')
      const data = await response.json()
      answer.value = data.answer
    })

    return {
      question,
      answer
    }
  }
}).mount('#app')
</script>
```

### 六、WatchEffect
* 是Watch函数的简化版，也用来监视数据的变化
* 接收一个函数作为参数，监听函数内响应式数据的变化
```base
<div id="app">
  <button @click="increase">increase</button>
  <button @click="stop">stop</button>
  <p>{{count}}</p>
</div>
<script type="module">
import {createApp, ref, watchEffect} from './node_modules/vue/dist/vue.esm-browser.js'

createApp({
  setup() {
    const count = ref(0)
    const stop = watchEffect(() => { // watchEffect在初始化的时候执行一次，数据变化时再次执行
      console.log(count.value)
    })

    return {
      count,
      stop,
      increase: () => count.value++
    }
  }
}).mount('#app')
</script>
```



























