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

### 七、ToDoList 功能演示
1. ToDoList 功能列表
    * 添加待办事项
    * 删除待办事项
    * 编辑待办事项
    * 切换待办事项
    * 存储待办事项

2. 项目结构

    使用vue脚手架创建项目，需要脚手架4.5以上，[Vue Cli安装、升级](https://cli.vuejs.org/zh/guide/installation.html)，创建项目时可以选择vue版本
    
    使用vue create 创建项目，选择vue 3.0版本
    ```base
    vue create todolist
    ```
    选择 Default (Vue 3 Preview) ([Vue 3] babel, eslint)

3. 添加待办事项
   
   在输入框输入文本按下enter键提交待办事项
   ```javascript
   // 1. 添加待办事项
   const useAdd = todos => {
     const input = ref('')
     // eslint-disable-next-line no-unused-vars
     const addTodo = () => {
       const text = input.value && input.value.trim()
       if (text.length === 0) return
       todos.value.unshift({
         text,
         completed: false
       })
       input.value = ''
     }
     return {
       input,
       addTodo
     }
   }
   
   export default {
     name: 'App',
     setup() {
       const todos = ref([])
   
       return {
         ...useAdd(todos),
         todos
       }
     }
   }
   ```

4. 删除待办事项
   
   点击待办事项右侧的按钮删除待办事项
   ```javascript
   // 2. 删除待办事项
   const useRemove = todos => {
     const remove = todo => {
       const index = todos.value.indexOf(todo)
       todos.value.splice(index, 1)
     }
     return { remove }
   }
   
   export default {
     name: 'App',
     setup() {
       const todos = ref([])
   
       return {
         todos,
         ...useAdd(todos),
         ...useRemove(todos)
       }
     }
   }
   ```
   
5. 编辑待办事项
   
   * 双击待办事项显示编辑文本框
   * 显示文本框的时候获取焦点
   * 按esc退出编辑
   * 按enter或者文本框失去焦点提交编辑
   * 如果删光文本，则删除这一项
   ```javascript
   // 3、编辑待办事项
   const useEdit = remove => {
     let beforeEditingText = ''
     const editingTodo = ref(null)
     const editTodo = todo => {
       beforeEditingText = todo.text
       editingTodo.value = todo
     }
     const doneEdit = todo => {
       if (!editingTodo.value) return
       todo.text = todo.text.trim()
       todo.text || remove(todo)
       editingTodo.value = null
     }
     const cancelEdit = todo => {
       editingTodo.value = null
       todo.text = beforeEditingText
     }
   
     return {
       editingTodo,
       editTodo,
       doneEdit,
       cancelEdit
     }
   }
   
   export default {
     name: 'App',
     setup() {
       const todos = ref([])
   
       const { remove } = useRemove(todos)
   
       return {
         todos,
         remove,
         ...useAdd(todos),
         ...useEdit(remove)
       }
     }
   }
   ```
   模板：
   ```base
   <ul class="todo-list">
     <li v-for="todo in todos" :key="todo" :class="{editing: todo === editingTodo}">
       <div class="view">
         <input type="checkbox" class="toggle">
         <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
         <button class="destroy" @click="remove(todo)"></button>
       </div>
       <input type="text" class="edit" v-model="todo.text" @keyup.enter="doneEdit(todo)" @blur="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
     </li>
   </ul>
   ```
   这里li的key值绑定 todo，如果绑定 todo.text，在编辑的时候 vue 在对比 VNode 的时候发现 newVNode 和 oldVNode 不同，重新渲染DOM，这时输入框会失去焦点

6. 编辑文本框获取焦点--Vue3.0 自定义指令
   
   传对象形式：
   * Vue 2.x
   ```base
   Vue.directive('editingFocus', {
     bind(el, binding, vnode, prevVnode) {},
     inserted() {},
     update() {},
     componentUpdated() {},
     unbind() {}
   })
   ```
   
   * Vue 3.0
   ```base
   app.directive('editingFocus', {
     beforeMount(el, binding, vnode, pervVnode) {},
     mounted() {},
     beforeUpdate() {},
     updated() {},
     beforeUnmount() {},
     unmounted() {}
   })
   ```
   
   传函数形式
   * Vue 2.x
   ```base
   Vue.directive('editingFocus', (el, binding) => {
     binding.value && el.focus()
   })
   ```
   
   * Vue 3.0
   ```base
   app.directive('editingFocus', (el, binding) => {
     binding.value && el.focus()
   })
   ```
   
   实现自定义指令，获取真正编辑的文本框焦点
   ```base
   export default {
     name: 'App',
     
     // setup() {...},
   
     directives: {
       editingFocus: (el, binding) => {
         binding.value && el.focus()
       }
     }
   }
   ```
   
   模板中
   ```base
   <input
     class="edit"
     type="text"
     v-editing-focus="todo === editingTodo"
     v-model="todo.text"
     @keyup.enter="doneEdit(todo)"
     @blur="doneEdit(todo)"
     @keyup.esc="cancelEdit(todo)"
   >
   ```

7. 切换待办事项的状态

   * 点击 CheckBox 可以改变所有代办项状态
   * All/Active/Completed
   * 其他
       * 显示未完成代办项个数
       * 移除所有完成的项目
       * 如果没有待办项，隐藏 main 和 footer
       
   ```javascript
   // 2. 删除待办事项
   const useRemove = todos => {
     const remove = todo => {
       const index = todos.value.indexOf(todo)
       todos.value.splice(index, 1)
     }
   
     // 删除全部已完成待办事项
     const removeCompleted = () => {
       todos.value = todos.value.filter(todo => !todo.completed)
     }
     return {
       remove,
       removeCompleted
     }
   }
   
   // 4、切换待办项完成状态
   const useFilter = todos => {
   
     // 切换全部状态
     const allDone = computed({
       get() {
         return !todos.value.filter(todo => !todo.completed).length
       },
       set(value) {
         todos.value.forEach(todo => {
           todo.completed = value
         })
       }
     })
   
     const filter = {
       all: list => list,
       active: list => list.filter(todo => !todo.completed),
       completed: list => list.filter(todo => todo.completed)
     }
   
     const type = ref('all')
     const filteredTodos = computed(() => filter[type.value](todos.value))
     const remainingCount = computed(() => filter.active(todos.value).length)
     const count = computed(() => todos.value.length)
   
     const onHashChange = () => {
       const hash = window.location.hash.replace('#/', '')
       if (filter[hash]) {
         type.value = hash
       } else {
         type.value = 'all'
         window.location.hash = ''
       }
     }
   
     onMounted(() => {
       window.addEventListener('hashchange', onHashChange)
       onHashChange()
     })
   
     onUnmounted(() => {
       window.removeEventListener('hashchange', onHashChange)
     })
   
     return {
       allDone,
       count,
       filteredTodos,
       remainingCount,
     }
   }
   
   export default {
     // 略
     setup() {
       const {removeCompleted } = useRemove(todos)
       return {
         // ...   
         removeCompleted
       }
     }
   }
   ```
   
   模板
   ```html
   <section v-show="count" class="main">
     <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
     <label for="toggle-all">Mark all as complete</label>
     <ul class="todo-list">
       <li
         v-for="todo in filteredTodos"
         :key="todo"
         :class="{ editing: todo=== editingTodo, completed: todo.completed }"
       >
         <div class="view">
           <input class="toggle" type="checkbox" v-model="todo.completed">
           <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
           <button class="destroy" @click="remove(todo)"></button>
         </div>
         <input
           class="edit"
           type="text"
           v-editing-focus="todo === editingTodo"
           v-model="todo.text"
           @keyup.enter="doneEdit(todo)"
           @blur="doneEdit(todo)"
           @keyup.esc="cancelEdit(todo)"
         >
       </li>
     </ul>
   </section>
   <footer v-show="count" class="footer">
         <span class="todo-count">
           <strong>{{ remainingCount }}</strong> {{ remainingCount > 1 ? 'items' : 'item' }} left
         </span>
     <ul class="filters">
       <li><a href="#/all">All</a></li>
       <li><a href="#/active">Active</a></li>
       <li><a href="#/completed">Completed</a></li>
     </ul>
     <button v-show="count > remainingCount" class="clear-completed" @click="removeCompleted">
       Clear completed
     </button>
   </footer>
   ```

8. 存储待办事项
   
   把待办事项存储到本地，刷新页面是加载数据，数据改变时更新本地存储
   
   ```javascript
   import useLocalStorage from './utils/useLocalStorage'
   const storage = useLocalStorage()
   
   // 5、存储待办事项
   const useStorage = () => {
     const KEY = 'TODOKEYS'
     const todos = ref(storage.getItem(KEY) || [])
   
     // watchEffect监视todos，todos变化时执行回调函数
     watchEffect(() => {
       storage.setItem(KEY, todos.value)
     })
   
     return todos
   }
   
   export default {
   
     setup() {
       const todos = useStorage()
       // 略   
     }
     // 略
   }
   ```
   
   utils/useLocalStorage.js
   ```javascript
   function parse (str) {
     let value
     try {
       value = JSON.parse(str)
     } catch {
       value = null
     }
     return value
   }
   
   function stringify (obj) {
     let value
     try {
       value = JSON.stringify(obj)
     } catch {
       value = null
     }
     return value
   }
   
   export default function useLocalStorage () {
     function setItem (key, value) {
       value = stringify(value)
       window.localStorage.setItem(key, value)
     }
   
     function getItem (key) {
       let value = window.localStorage.getItem(key)
       if (value) {
         value = parse(value)
       }
       return value
     }
   
     return {
       setItem,
       getItem
     }
   }
   ```
   
9. 完整代码

   APP.vue
   ```base
   <template>
     <section id="app" class="todoapp">
       <header class="header">
         <h1>todos</h1>
         <input
           class="new-todo"
           placeholder="What needs to be done?"
           autocomplete="off"
           autofocus
           v-model="input"
           @keyup.enter="addTodo"
         >
       </header>
       <section v-show="count" class="main">
         <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
         <label for="toggle-all">Mark all as complete</label>
         <ul class="todo-list">
           <li
             v-for="todo in filteredTodos"
             :key="todo"
             :class="{ editing: todo=== editingTodo, completed: todo.completed }"
           >
             <div class="view">
               <input class="toggle" type="checkbox" v-model="todo.completed">
               <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
               <button class="destroy" @click="remove(todo)"></button>
             </div>
             <input
               class="edit"
               type="text"
               v-editing-focus="todo === editingTodo"
               v-model="todo.text"
               @keyup.enter="doneEdit(todo)"
               @blur="doneEdit(todo)"
               @keyup.esc="cancelEdit(todo)"
             >
           </li>
         </ul>
       </section>
       <footer v-show="count" class="footer">
         <span class="todo-count">
           <strong>{{ remainingCount }}</strong> {{ remainingCount > 1 ? 'items' : 'item' }} left
         </span>
         <ul class="filters">
           <li><a href="#/all">All</a></li>
           <li><a href="#/active">Active</a></li>
           <li><a href="#/completed">Completed</a></li>
         </ul>
         <button v-show="count > remainingCount" class="clear-completed" @click="removeCompleted">
           Clear completed
         </button>
       </footer>
     </section>
     <footer class="info">
       <p>Double-click to edit a todo</p>
       <!-- Remove the below line ↓ -->
       <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
       <!-- Change this out with your name and url ↓ -->
       <p>Created by <a href="https://www.lagou.com">教瘦</a></p>
       <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
     </footer>
   </template>
   
   <script>
   import './assets/index.css'
   import useLocalStorage from './utils/useLocalStorage'
   import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue'
   
   const storage = useLocalStorage()
   
   // 1. 添加待办事项
   const useAdd = todos => {
     const input = ref('')
     // eslint-disable-next-line no-unused-vars
     const addTodo = () => {
       const text = input.value && input.value.trim()
       if (text.length === 0) return
       todos.value.unshift({
         text,
         completed: false
       })
       input.value = ''
     }
     return {
       input,
       addTodo
     }
   }
   
   // 2. 删除待办事项
   const useRemove = todos => {
     const remove = todo => {
       const index = todos.value.indexOf(todo)
       todos.value.splice(index, 1)
     }
   
     // 删除全部已完成待办事项
     const removeCompleted = () => {
       todos.value = todos.value.filter(todo => !todo.completed)
     }
     return {
       remove,
       removeCompleted
     }
   }
   
   // 3、编辑待办事项
   const useEdit = remove => {
     let beforeEditingText = ''
     const editingTodo = ref(null)
   
     const editTodo = todo => {
       beforeEditingText = todo.text
       editingTodo.value = todo
     }
   
     const doneEdit = todo => {
       if (!editingTodo.value) return
       todo.text = todo.text.trim()
       todo.text || remove(todo)
       editingTodo.value = null
     }
   
     const cancelEdit = todo => {
       editingTodo.value = null
       todo.text = beforeEditingText
     }
   
     return {
       editingTodo,
       editTodo,
       doneEdit,
       cancelEdit
     }
   }
   
   // 4、切换待办项完成状态
   const useFilter = todos => {
   
     // 切换全部状态
     const allDone = computed({
       get() {
         return !todos.value.filter(todo => !todo.completed).length
       },
       set(value) {
         todos.value.forEach(todo => {
           todo.completed = value
         })
       }
     })
   
     const filter = {
       all: list => list,
       active: list => list.filter(todo => !todo.completed),
       completed: list => list.filter(todo => todo.completed)
     }
   
     const type = ref('all')
     const filteredTodos = computed(() => filter[type.value](todos.value))
     const remainingCount = computed(() => filter.active(todos.value).length)
     const count = computed(() => todos.value.length)
   
     const onHashChange = () => {
       const hash = window.location.hash.replace('#/', '')
       if (filter[hash]) {
         type.value = hash
       } else {
         type.value = 'all'
         window.location.hash = ''
       }
     }
   
     onMounted(() => {
       window.addEventListener('hashchange', onHashChange)
       onHashChange()
     })
   
     onUnmounted(() => {
       window.removeEventListener('hashchange', onHashChange)
     })
   
     return {
       allDone,
       count,
       filteredTodos,
       remainingCount,
     }
   }
   
   // 5、存储待办事项
   const useStorage = () => {
     const KEY = 'TODOKEYS'
     const todos = ref(storage.getItem(KEY) || [])
   
     // watchEffect监视todos，todos变化时执行回调函数
     watchEffect(() => {
       storage.setItem(KEY, todos.value)
     })
   
     return todos
   }
   
   export default {
     name: 'App',
   
     setup() {
       const todos = useStorage()
   
       const { remove, removeCompleted } = useRemove(todos)
   
       return {
         todos,
         remove,
         removeCompleted,
         ...useAdd(todos),
         ...useEdit(remove),
         ...useFilter(todos)
       }
     },
   
     directives: {
       editingFocus: (el, binding) => {
         binding.value && el.focus()
       }
     }
   }
   </script>
   ```
   
## Vue 3.0 响应式系统原理
### 一、介绍
1. Vue3.0 响应式回顾
   * Proxy 对象实现属性监听
   * 多层属性嵌套，在访问属性过程中处理下一级属性
   * 默认监听动态添加的属性
   * 默认监听属性的删除操作
   * 默认监听数组索引和 length 属性
   * 可以作为单独的模块使用

2. 核心方法
   * reactive/ref/toRefs/computed
   * effect
   * track
   * trigger

### 二、Proxy对象回顾
1. 在严格模式下，Proxy需要返回布尔类型的值，否则会报 TypeError
   
   > Uncaught TypeError: 'set' on proxy: trap returned falsish for property 'foo'
   
   ```base
   'use strict'
   // 问题1： set 和 deleteProperty 中需要返回布尔类型的值，
   // 在严格模式下，如果返回 false 的话会出现 type Error 的异常
   
   const target = {
     foo: 'xxx',
     bar: 'yyy'
   }
   // Reflect.getPrototypeOf()
   // Object.getPrototypeOf()
   const proxy = new Proxy(target, {
     get(target, key, receiver) {
       // return target[key]
       return Reflect.get(target, key, receiver)
     },
     set(target, key, value, receiver) {
       // target[key] = value
       return Reflect.set(target, key, value, receiver) // 这里要写 return
     },
     deleteProperty(target, key) {
       // delete target[key]
       return Reflect.deleteProperty(target, key) // 这里要写 return
     }
   })
   
   proxy.foo = 'zzz'
   // delete proxy.foo
   ```

2. Proxy 和 Reflect 中使用receiver

   Proxy 中 receiver：Proxy 或者继承 Proxy 的对象 Reflect 中 receiver：如果 target 对象中设置了 getter，getter 中的 this 指向 receiver
   ```base
   const obj = {
     get foo() {
       console.log(this)
       return this.bar
     }
   }
   
   const proxy = new Proxy(obj,{
     get(target, key, receiver) {
       if (key === 'bar') {
         return 'value - bar'
       }
       return Reflect.get(target, key, receiver) // 指向this.bar的时候，this指向代理对象，也就是获取target.bar
     }
   })
   
   console.log(proxy.foo) // value - bar
   ```
   
   如果`return Reflect.get(target, key, receiver)`写成`return Reflect.get(target, key)`的话，则响应式属性foo里面的this还是指向原本的对象obj，this.bar就是undefined，而传入了receiver之后，响应式属性里的this就指向新的响应式对象proxy，this.bar返回value - bar

### 三、reactive
* 接收一个参数，判断这个参数是否是对象（reactive函数只能把对象转换为响应式对象）
* 创建拦截器对象handler，设置get/set/deleteProperty
* 返回Proxy对象

实现reactive函数
```javascript
// 判断是否是对象
const isObject = val => val !== null && typeof val === 'object'

const convert = target => isObject(target) ? reactive(target) : target

// 判断对象是否有某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export function reactive(target) {
  // reactive函数只能把对象转换为响应式对象
  if (!isObject(target)) return target

  const handler = {
    get(target, key, receiver) {
      // 收集依赖
      // track(target, key) // 后面实现

      console.log('get', key)
      const result = Reflect.get(target, key, receiver)
      // 如果返回值是对象，继续转换为响应式对象
      return convert(result)
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        // trigger(target, key) // 后面实现
        console.log('set', key, value)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        // 触发更新
        // trigger(target, key) // 后面实现
        console.log('delete', key)
      }
      return result
    }
  }

  return new Proxy(target, handler)
}
```

使用
```html
<script type="module">
  import { reactive } from './reactivity/index.js'
  
  const obj = reactive({
    name: 'zs',
    age: 18
  })
  obj.name = 'lise'
  delete obj.age
  console.log(obj)
</script>
```

### 四、收集依赖

![](./img/2.jpg)

### 五、effect、track

```javascript
let activeEffect = null

export function effect(callback) {
  activeEffect = callback
  callback() // callback会访问响应式对象属性，去收集依赖
  activeEffect = null // 因为收集依赖如果有嵌套属性是一个递归过程
}

let targetMap = new WeakMap() // 字典

export function track(target, key) { // 收集依赖
  if (!activeEffect) return

  let depsMap = targetMap.get(target) // 获取目标对象

  // target添加到targetMap中
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key) // 获取目标对象的属性值

  // dep 添加到depsMap
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  // 回调添加dep
  dep.add(activeEffect)
}
```

### 六、trigger

```javascript
export function trigger(target, key) { // 触发依赖
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}
```

使用

```html
<script type="module">
  import { reactive, effect } from './reactivity/index.js'

  const product = reactive({
    name: 'iPhone',
    price: 5000,
    count: 3
  })
  let total = 0
  effect(() => {
    total = product.price * product.count
  })
  console.log(total) // 15000

  product.price = 4000
  console.log(total) // 12000

  product.count = 1
  console.log(total) // 4000
</script>
```

### 七、ref
reactive VS ref
* ref 可以把基本数据类型数据转换成响应式对象
* ref 返回的对象，重新赋值成对象也是响应式的
* reactive 返回的对象，重新赋值丢失响应式
* reactive 返回的对象不可解构
* reactive
```javascript
const product = reactive({
  name: 'iPhone',
  price: 5000,
  count: 3
})
```

* ref
```javascript
const price = ref(5000)
const count = ref(3)
```

实现ref
```javascript
export function ref(raw) {
  // 判断 raw 是否是 ref 创建的对象，如果是直接返回
  if (isObject(raw) && raw.__v_isRef) return

  let value = convert(raw) // raw 是对象就转为响应式对象，否则返回 raw 本身
  const r = {
    __v_isRef: true,
    get value() {
      track(r, 'value') // 收集依赖
      return value
    },
    set value(newValue) {
      if (newValue !== value) {
        raw = newValue
        value = convert(raw) // 重新赋值raw 对象就转换为响应式对象，否则返回 raw 本身
        trigger(r, 'value') // 触发依赖
      }
    }
  }
  return r
}
```

使用ref
```html
<script type="module">
  import { effect, ref } from './reactivity/index.js'

  const price = ref(5000)
  const count = ref(3)

  let total = 0
  effect(() => {
    total = price.value * count.value
  })
  console.log(total)

  price.value = 4000
  console.log(total)

  count.value = 1
  console.log(total)
</script>
```

### 八、toRefs

```javascript
export function toRefs(proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}

  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }

  return ret
}

function toProxyRef(proxy, key) {
  const r = {
    __v_isRef: true,
    get value() {
      // 这里不用收集依赖，因为这里访问的是响应式对象，
      // 当访问属性的时候，内部的getter会去收集依赖(代理对象内容收集依赖)
      return proxy[key]
    },
    set value(newValue) {
      proxy[key] = newValue
    }
  }
  return r
}
```

使用
```html
<script type="module">
    import { reactive, effect, toRefs } from './reactivity/index.js'
    
    function useProduct() {
      const product = reactive({
        name: 'iPhone',
        price: 5000,
        count: 3
      })
      return toRefs(product)
    }
    
    const { price, count } = useProduct()
    
    let total = 0
    effect(() => {
      total = price.value * count.value
    })
    console.log(total)
    
    price.value = 4000
    console.log(total)
    
    count.value = 1
    console.log(total)
</script>
```

### 九、computed

```javascript
export function computed(getter) {
  const result = ref()

  effect(() => (result.value = getter()))

  return result
}
```

使用
```html
<script type="module">
    import { reactive, effect, computed } from './reactivity/index.js'
    
    const product = reactive({
      name: 'iPhone',
      price: 5000,
      count: 3
    })
    let total = computed(() => {
      return product.price * product.count
    })
    
    console.log(total.value)
    
    product.price = 4000
    console.log(total.value)
    
    product.count = 1
    console.log(total.value)
</script>
```

## Vite
### 一、Vite 介绍
1. Vite 概念
    * Vite是一个面向现代浏览器的一个更轻、更快的 web 应用开发工具
    * 它基于 ECMAScript 标准原生模块系统（ES Module）实现
    * 解决 webpack 冷启动过长，webpack 热更新过慢的问题

2. Vite 项目依赖
    * Vite
    * @vue/compiler-sfc
    
3. 基础使用
    * vite serve
    * vite build
    
    ![](./img/3.jpg)
    
    在运行 `vite serve` 的时候不需要打包，直接开启一个web服务，在开启服务的时候不需要编译所有的代码文件，当浏览器请求服务器，如请求一个单文件组件，这个时候在服务器编译单文件组件，然后把编译结果返回给浏览器，注意这里的编译是在服务器端，另外模块的处理是在请求到服务器端处理的
    
    vue-cli-service serve:
    
    ![](./img/4.jpg)
    
    当运行 vue-cli-service serve 的时候，它内部会使用webpack首先去打包所有的模块，如果模块比较多的话，打包速度会非常慢，把打包的结果存储到内存中，然后才开启开发的web服务器，浏览器请求web服务器把内存中打包的结果直接返回给浏览器，像webpack这种工具，它的做法是将所有的模块提前编译打包进bundle里，也就是不给模块是否被执行，是否使用，都要打包进bundle，随着项目越来越大，打包后的bundle也越来越大，打包的速度自然也越来越慢
    
    Vite利用现代浏览器原生支持的ESModule模块化的特性省略模块的打包，对于需要编译的文件，如单文件组件、样式模块等，Vite采用的另一种模式即时编译，也就是说只有具体去请求某个文件的时候，才会在服务端编译这个文件，所以这种即时编译的好处主要体现在按需编译，速度会更快

4. HMR
    * Vite HMR：立即编译当前所修改的文件
    * webpack HMR：会自动以这个文件为入口重写build一次，所有的涉及到的依赖也都会被加载一遍

5. Build
    * vite build
        * Rollup 使用rollup打包
        * Dynamic import 代码切割
            * Polyfill

6. 打包 OR 不打包
    * 使用 webpack 打包的两个原因
        * 浏览器环境并不支持模块化（而现在大部分浏览器都支持ESM模块化了）
        * 零散的模块文件会产生大量的 HTTP 请求（HTTP2可以长链接）

7. 浏览器对ESModule的支持

8. 开箱即用
    * TypeScript - 内置支持
    * less/sass/stylus/postcss - 内置支持（需要单独安装）
    * JSX
    * Web Assembly

9. Vite特点
    * 快速冷启动
    * 模块热更新
    * 按需编译
    * 开箱即用

### 二、Vite 实现原理 -- 静态 Web 服务器
1. Vite 核心功能
    * 静态 web 服务器
    * 编译单文件组件，拦截浏览器不识别的模块，并处理
    * HMR

### 三、Vite 实现原理 -- 修改第三方模块的路径
创建两个中间件，一个中间件是把加载第三方模块的import中的路径改变，改成加载@modules/模块文件名称，另一个中间件是当请求过来之后，判断请求路径中是否有 @modules/模块名称，如果有的话，去node_modules加载对应的模块

### 四、Vite 实现原理 -- 加载第三方模块
当请求过来之后，判断请求路径中是否以@modules开头，如果是的话，去node_modules加载对应的模块

### 五、Vite 实现原理 -- 编译单文件组件
发送两次请求，第一次请求是把单文件组件编译成一个对象，第二次请求是编译单文件组件的模块，返回一个render函数，并且把render函数挂载到对象的render方法上

最终代码
```javascript

```
使用时先将cli项目link到全局`npm link`

然后在vue3项目中执行






















































