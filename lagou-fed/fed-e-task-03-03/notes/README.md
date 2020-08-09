## 一、Vuex状态管理
### 组件内的状态管理流程
* 状态管理
    * state，驱动应用的数据源
    * view，以声明方式将 state 映射到视图
    * actions，响应在 view 上的用户输入导致的状态变化
    ![](./img/state.jpg)

### 组件间通信方式
1. 父组件给子组件传值
    * 子组件通过props接收数据
    ```base
    <template>
    	<div>
        <h2>{{title}}</h2>
      </div>
    </template>
    
    <script>
    export default {
      // props: ['title'],
      props: {
        title: String
      }
    }
    </script>
    ```
    * 父组件中给子组件通过响应属性传值
    ```base
    <template>
        <div>
            <child title="My Journey with Vue">
        </div>
    </template>
    
    <script>
    import child from './01-child'
        export default {
            components: { child }
        }
    </script>
    ```
2. 子组件给父组件传值
    * 通过自定义事件子组件给父组件传值
    ```base
    <template>
      <div>
        <h1 :style="{ fontSize: fontSize + 'em' }">Props Down Child</h1>
        <button @click="handler">文字增大</button>
      </div>
    </template>
    
    <script>
    export default {
      props: {
        fontSize: Number
      },
      methods: {
        handler () {
          this.$emit('enlargeText', 01)
    		}
      }
    }
    </script>
    ```
   * 父组件中注册子组件内部触发的事件
   ```base
   <template>
   	<div>
       <h1 :style="{ fontSize: hFontSize + 'em' }">Event Up Parent</h1>
       
       这里的文字不需要变化
       
       <child :fontSize="hFontSize" v-on:enlargeText="enlargeText"></child>
       <child :fontSize="hFontSize" v-on:enlargeText="enlargeText"></child>
   		<child :fontSize="hFontSize" v-on:enlargeText="hFontSize + $event"></child>
     </div>
   </template>
   
   <script>
   import child from './02-child'
   export default {
     components: {
       child
     },
     data () {
       return {
         hFontSize: 1
       }
     },
     methods: {
       enlargeText (size) {
         this.hFontSize += size
       }
     }
   }
   </script>
   ```
3. 不相关组件之间传值
    * 通过事件中心eventbus触发和注册事件
    ```javascript
    import Vue from 'Vue'
    export default new Vue()
    ```
   * 触发eventbus中的事件
   ```base
   <template>
   	<div>
       <h1>Event Bus sibling01</h1>
       <div class="number" @click="sub">-</div>
       <input type="text" style="width: 30px; text-align: center": value="value">
       <div class="number" @click="add">+</div>
     </div>
   </template>
   
   <script>
   import bus from './eventbus'
     
   export default {
     props: {
       num: Number
     },
     created () {
       this.value = this.num
     },
     data () {
       return {
         value: -1
       }
     },
     methods: {
   		sub () {
         if (this.value > 1) {
           this.value--
           bus.$emit('numchange', this.value)
         }
       },
       add () {
         this.value++
         bus.$emit('numchange', this.value)
       }
     }
   }
   </script>
   ```
   * 注册事件
   ```base
   <template>
   	<div>
       <h1>Event Bus sibling02</h1>
       
       <div>{{ msg }}</div>
     </div>
   </template>
   
   <script>
   import bus from './eventbus'
   export default {
     data () {
       return {
         msg: ''
       }
     },
     created () {
   		bus.$on('numchange', (value) => {
         this.msg = `您选择了${value}件商品`
       })
     }
   }
   </script>
   ```
4. 其它常见方式（不推荐使用）
* $root
* $parent
* $children
* $ref

ref两个作用：
  1. 在普通HTML标签上使用ref，获取到的是DOM
  2. 在组件标签上使用ref，获取到的是组件实例

子组件中定义ref
```base
<template>
	<div>
    <h1>
      ref Child
  	</h1>
    <input ref="input" type="text" v-model="value">
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    focus () {
      this.$refs.input.focus()
    }
  }
}
</script>
```
父组件获取子组件的ref
```base
<template>
	<div>
    <h1>
      ref Parent
  	</h1>
    
    <child ref="c"></child>
  </div>
</template>

<script>
import child from './04-child'
export default {
  components: {
    child
  },
  mounted () {
    this.$refs.c.focus()
    this.$refs.c.value = 'hello input'
  }
}
</script>
```
> ref这种方式不到万不得已不要使用，会导致数据的混乱。

### 简易的状态管理方案
1. 父子组件传值的问题
    * 多个视图依赖同一状态
    * 来自不同视图的行为需要变更同一状态
2. 集中式的状态管理
    * store.js
    ```javascript
       export default {
         debug: true,
         state: {
           user: {
             name: 'xiaomao',
             age: 18,
             sex: '男'
           }
         },
         setUserNameAction (name) {
           if (this.debug) {
             console.log('setUserNameAction triggered: ', name)
           }
           this.state.user.name = name
         }
       }
    ```
   componentA.vue
   ```base
   <template>
   	<div>
       <h1> componentA </h1>
       user name : {{ sharedState.user.name }}
       <button @click="change"> Change Info </button>
     </div>
   </template>
   
   <script>
   import store from './store'
   export default {
     methods: {
       change () {
         store.setUserNameAction('componentA')
       }
     },
     data () {
       return {
         privateState: {},
         sharedState: store.state
       }
     }
   }
   </script>
   ```
   componentB.vue
   ```base
   <template>
   	<div>
       <h1> componentB </h1>
       user name : {{ sharedState.user.name }}
       <button @click="change"> Change Info </button>
     </div>
   </template>
   
   <script>
   import store from './store'
   export default {
     methods: {
       change () {
         store.setUserNameAction('componentB')
       }
     },
     data () {
       return {
         privateState: {},
         sharedState: store.state
       }
     }
   }
   </script>
   ```
   
### Vuex 回顾
1. 什么是Vuex
    * Vuex是专门为Vue.js设计的状态管理库
    * Vuex采用集中式的方式存储需要共享的状态
    * Vuex的作用是进行状态管理，解决复杂组件通信，数据共享
    * Vuex 集成到了devtools中，提供了time-travel时光旅行历史回滚功能
2. 什么情况下使用Vuex
    * 非必要的情况下不要使用Vuex
    * 大型的单页应用程序
        * 多个视图依赖同一状态
        * 来自不同视图的行为需要变更同一状态
### Vuex核心概念
* Store：是一个容器，包含着应用中的大部分状态，不能直接改变Store中的状态，要通过mutation的方式改变状态
* State：是状态，保存在Store中，因为Store是唯一的，所以State也是唯一的，也成为单一状态树，这里的状态是响应式的
* Getter：是Vuex中的计算属性，方便从一个属性派生出其他的值。它内部会对计算的属性进行缓存，只有依赖改变的时候，才会重新进行计算
* Mutation：状态的变化必须要通过提交Mutation来完成
* Action：和Mutation类型，不同的是Action可以进行异步的操作，内部改变状态的时候，都需要提交Mutation
* Module：当Store太过臃肿时，可以将Store分成多个模块，每个模块里有State、Mutation、Action、Getter，甚至是子模块

![](./img/2.jpg)

### Vuex基本结构
定义store：store/index.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})
```
注入store：
```javascript
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

### State
store/index.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    msg: 'Hello Vuex'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```

APP.vue
```base
<template>
  <div id="app">
    <h1>Vuex-demo</h1>
<!--    count: {{$store.state.count}} <br/>-->
<!--    msg: {{$store.state.msg}}-->
    count: {{count}} <br/>
    msg: {{msg}}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    // count: state => state.count
    ...mapState(['count', 'msg'])
  }
}
</script>

```
* mapState可以接受一个对象，对象的属性是最终生成计算属性的名称，值是映射的状态属性
* mapState还可以接收一个数组作为参数，数组中元素是需要映射的状态属性
* mapState会返回一个对象，包含计算属性对应的方法，计算属性形式是`count: state => state.count`
* 使用扩展运算符展开mapState返回对象的成员给`computed`
* `$store.state.xxx`和`mapState`展开两种写法都可以。不过使用`mapState`展开成计算属性时，如果原本就有这个属性名，那么`mapState`展开的属性就不起作用，可以通过给属性重命名的方式更改计算属性的名称:
```html
<p>{{num}}</p>
<p>{{message}}</p>
```
```base
...mapState({ num: 'count', message: 'msg' })
```

### Getter
Vuex中的Getter相当于Vue中的计算属性
store/index.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    msg: 'Hello Vuex'
  },
  getters: {
    reverseMsg (state) {
      return state.msg.split('').reverse().join('')
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})

```
App.vue
```base
<template>
  <div id="app">
    <h1>Vuex-demo</h1>
    <!--    count: {{$store.state.count}} <br/>-->
    <!--    msg: {{$store.state.msg}}-->
    <!--    count: {{count}} <br/>-->
    <!--    msg: {{msg}}-->
    count: {{num}} <br/>
    msg: {{message}}
    <h2>Getter</h2>
    reverseMsg: {{$store.getters.reverseMsg}} <br/>
    reverseMsg: {{reverseMsg}}
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    // count: state => state.count
    // ...mapState(['count', 'msg'])
    ...mapState({ num: 'count', message: 'msg' }),
    ...mapGetters(['reverseMsg'])
  }
}
</script>
```
`mapGetters`负责把`Vuex`中的`getter`映射到`Vue`的计算属性，`mapGetters`返回的是对象，`mapGetters`的使用和`mapState`类似

### Mutation
Mutation中修改state，只能支持同步操作

store/index.js
```base
mutations: {
  increate (state, payload) {
    state.count += payload
  }
}
```
在模板中通过$store.commit()来提交mutation

App.vue
```base
<button @click="$store.commit('increate', 3)">
```

* mutation的本质就是方法，可以通过mapMutations，可以把mutation映射到当前组件methods中，返回的是对象，对象存储的是mutation中映射的方法，这些方法不再是计算属性，需要放到组件的methods中
* mapMutation接收的是数组或者对象，作用是把`this.xx`方法映射为`this.$store.commit('xxx','yyy')`

App.vue
```base
<template>
  <div id="app">
    <h1>Vuex-demo</h1>
    <!--    count: {{$store.state.count}} <br/>-->
    <!--    msg: {{$store.state.msg}}-->
    <!--    count: {{count}} <br/>-->
    <!--    msg: {{msg}}-->
    count: {{num}} <br/>
    msg: {{message}}
    <h2>Getter</h2>
    reverseMsg: {{$store.getters.reverseMsg}} <br/>
    reverseMsg: {{reverseMsg}}
    <h2>Mutation</h2>
<!--    <button @click="$store.commit('increate', 2)">Mutation</button>-->
    <button @click="increate(3)">Mutation</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    // count: state => state.count
    // ...mapState(['count', 'msg'])
    ...mapState({ num: 'count', message: 'msg' }),
    ...mapGetters(['reverseMsg'])
  },

  methods: {
    ...mapMutations(['increate'])
  }
}
</script>
```
打开Vue调试工具，可以看到vuex中的mutation变化，每个mutation上面的三个按钮，分别是提交本次mutation、恢复到本次的mutation、时光旅行
![](./img/03.png)

### Action
* Action中可以进行异步操作，不过Action如果需要修改state，得提交Mutation(在Action中调用提交Mutation[])，所有状态的更改都要通过Mutation
* Action中的方法第一个参数是上下文对象，包含了commit、dispatch、getters、state等属性
* Action的调用要通过dispatch

store/index.js
```base
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    msg: 'Hello Vuex'
  },
  getters: {
    reverseMsg (state) {
      return state.msg.split('').reverse().join('')
    }
  },
  mutations: {
    increate (state, payload) {
      state.count += payload
    }
  },
  actions: {
    increateAsync (context, payload) {
      setTimeout(() => {
        context.commit('increate', payload)
      }, 2000)
    }
  },
  modules: {}
})

```
App.vue

mapActions用法同mapMutations

App.vue
```base
<template>
  <div id="app">
    <h1>Vuex-demo</h1>
    <!--    count: {{$store.state.count}} <br/>-->
    <!--    msg: {{$store.state.msg}}-->
    <!--    count: {{count}} <br/>-->
    <!--    msg: {{msg}}-->
    count: {{num}} <br/>
    msg: {{message}}
    <h2>Getter</h2>
    reverseMsg: {{$store.getters.reverseMsg}} <br/>
    reverseMsg: {{reverseMsg}}
    <h2>Mutation</h2>
<!--    <button @click="$store.commit('increate', 2)">Mutation</button>-->
    <button @click="increate(2)">Mutation</button>
    <h2>Action</h2>
<!--    <button @click="$store.dispatch('increateAsync', 5)">Action</button>-->
    <button @click="increateAsync(5)">Action</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    // count: state => state.count
    // ...mapState(['count', 'msg'])
    ...mapState({ num: 'count', message: 'msg' }),
    ...mapGetters(['reverseMsg'])
  },

  methods: {
    ...mapMutations(['increate']),
    ...mapActions(['increateAsync'])
  }
}
</script>

```

### Module
* Module可以让我们把单一状态树拆分成多个模块，每个模块都可以拥有自己的state、mutation、action、getter甚至可以嵌套子模块
* 子模块通过modules注册到Store中
* 在使用模块里的数据时，可以通过`$store.模块名.state`状态属性名的方式访问
* 在使用模块里的方法时，可以通过`$store.commit('mutation方法名')`的方式提交mutation
* 当想要有更强的封装性时，可以开启命名空间，在导出的模块对象里增加一个namespaced属性为true，然后就可以在Vue中使用 `mapState('模块名', ['state状态属性名'])`的方式获取到属性名称，使用`mapMutations('模块名', ['mutation方法名'])`的方式获取到方法名

store/modules/products.js
```javascript
const state = {
  products: [
    { id: 1, title: 'iPhone 11', price: 8000 },
    { id: 2, title: 'iPhone 12', price: 10000 },
  ]
}

const getters = {}

const mutations = {
  setProducts (state, payload) {
    state.products = payload
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

```

store/modules/cart.js
```javascript
const state = {}
const getters = {}
const mutations = {}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

```

store/index.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    msg: 'Hello Vuex'
  },
  getters: {
    reverseMsg (state) {
      return state.msg.split('').reverse().join('')
    }
  },
  mutations: {
    increate (state, payload) {
      state.count += payload
    }
  },
  actions: {
    increateAsync (context, payload) {
      console.log(context)
      setTimeout(() => {
        context.commit('increate', payload)
      }, 2000)
    }
  },
  modules: {
    products,
    cart
  }
})

```

App.vue
```base
<template>
  <div id="app">
    <h1>Vuex-demo</h1>
    <!--    count: {{$store.state.count}} <br/>-->
    <!--    msg: {{$store.state.msg}}-->
    <!--    count: {{count}} <br/>-->
    <!--    msg: {{msg}}-->
    count: {{num}} <br/>
    msg: {{message}}
    <h2>Getter</h2>
    reverseMsg: {{$store.getters.reverseMsg}} <br/>
    reverseMsg: {{reverseMsg}}
    <h2>Mutation</h2>
<!--    <button @click="$store.commit('increate', 2)">Mutation</button>-->
    <button @click="increate(2)">Mutation</button>
    <h2>Action</h2>
<!--    <button @click="$store.dispatch('increateAsync', 5)">Action</button>-->
    <button @click="increateAsync(5)">Action</button>
    <h2>Module</h2>
<!--    products: {{$store.state.products.products}}-->
<!--    <button @click="$store.commit('setProducts', [])">Mutation</button>-->
    products: {{products}}
    <button @click="setProducts([])">Mutation</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    // count: state => state.count
    // ...mapState(['count', 'msg'])
    ...mapState({ num: 'count', message: 'msg' }),
    ...mapGetters(['reverseMsg']),
    ...mapState('products', ['products'])
  },

  methods: {
    ...mapMutations(['increate']),
    ...mapActions(['increateAsync']),
    ...mapMutations('products', ['setProducts'])
  }
}
</script>

```

### 严格模式
* Vuex中的状态的更新要通过提交mutation来修改，但其实在组件中还可以通过$store.state.msg进行修改，从语法从面来说这是没有问题的，但是这破坏了Vuex的约定，如果在组件中直接修改state，devtools无法跟踪到这次状态的修改
* 开启严格模式之后，如果在组件中直接修改state会抛出错误，但数据仍被成功修改
* 如何开启：在store中增加一个属性strict为true
>不要在生产模块开启，会深度检查状态树来检查不合规的状态，会影响性能
store/index.js
>我们可以在开发模式下开启严格模式，在生产模式中关闭严格模式：`strict: process.env.NODE_ENV !== 'production'`
```javascript
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 0,
    msg: 'Hello Vuex'
  },
  // ...
})
```
App.vue
```base
<h2>strict</h2>
<button @click="$store.state.msg = 'lagou'">strict</button>
```
![](./img/04.png)

### 购物车案例
1. 模板
    地址：https://github.com/goddlts/vuex-cart-demo-template
    
    用到了ElementUI、Vuex、Vue-Router
    
    项目根目录下的server.js文件是一个node服务，为了模拟项目接口

    三个组件：
    * 商品列表组件
    * 购物车列表组件
    * 我的购物车组件（弹出窗口）

2. 商品列表组件
    * 展示商品列表
    * 添加购物车

3. 我的购物车组件
    * 购买商品列表
    * 统计购物车中的商品数量价格
    * 购物车上的商品数量
    * 删除按钮

4. 购物车组件
    * 展示购物车列表
    * 全选功能
    * 增减商品功能和统计当前商品的小计
    * 删除商品
    * 统计选中商品和价格

5. Vuex 插件结束
    * Vuex的插件就是一个函数
    * 这个函数接收一个store的参数

    这个参数可以订阅一个函数，让这个函数在所有的mutation结束之后执行
    ```javascript
    const myPlugin = store => {
      // 当 store 初始化后调用
      store.subscribe((mutation, state) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
      })
    }
    ```
    store/index.js
    ```javascript 
    export default new Vuex.Store({
      plugins: [myPlugin]
    })
    ```

### 模拟实现Vuex
myVuex/index.js
```javascript
// eslint-disable-next-line no-unused-vars
let _Vue = null

class Store {
  constructor (options) {
    const { state = {}, getters = {}, mutations = {}, actions = {} } = options
    this.state = _Vue.observable(state)
    this.getters = Object.create(null)
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    this._mutations = mutations
    this._actions = actions
  }

  commit (type, payload) {
    this._mutations[type](this.state, payload)
  }

  dispatch (type, payload) {
    this._actions[type](this, payload)
  }
}

function install (Vue) {
  _Vue = Vue
  _Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        _Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}
```
store/index.js
```javascript
import Vuex from '../myVuex'
```
