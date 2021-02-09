## React 状态管理工具
### Redux
#### 1.Redux 核心
##### 1.1 Redux 介绍
javascript状态容器，提供可预测化的状态管理
```js
const state = {
  modelOpen: 'yes',
  btnClicked: 'no',
  btnActiveClass: 'active',
  page: 5,
  size: 10
}
```
##### 1.2 Redux 核心概念及工作流程
* Store：存储状态的容器，javascript对象
* View：视图，HTML页面
* Actions：对象，描述对状态进行怎样的操作
* Reducers：函数，操作状态并返回新的状态

![](./images/1.jpg)

#### 1.3 Redux使用：计数器案例
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<button id="plus">+</button>
<span id="count">0</span>
<button id="minus">-</button>

  <script src="./redux.min.js"></script>
  <script>
    // 3. 存储默认状态
    var initialState = {
      count: 0
    }
    
    /**
     * 2. 创建reducer函数
     * 第一次进入页面时会触发一次action，就是存储默认的state
     * @param state  是createStore传的第二个参数，有传递就用，没传递就用初始化的值,一般不会createStore这么传递
     * @param action 是dispatch时的参数
     */
    function reducer(state = initialState, action) {
      switch(action.type) {
        case 'increment':
          return { count: state.count + 1 }
        case 'decrement':
          return { count: state.count - 1 }
        default:
          return state
      }
    }

    // 1.创建store对象，返回是store存储状态
    var store = Redux.createStore(reducer)

    // 4. 定义action
    var increment = { type: 'increment' }
    var decrement = { type: 'decrement' }

    // 5. 获取按钮给按钮添加点击事件
    document.getElementById('plus').onclick = function() {
      // 6. 触发action
      store.dispatch(increment)
    }

    document.getElementById('minus').onclick = function() {
      // 6. 触发action
      store.dispatch(decrement)
    }

    // 7.同步视图 订阅store，store的状态发生变化时就执行
    store.subscribe(() => {
      // 获取store对象中存储的状态
      //console.log(store.getState())
      document.getElementById('count').innerHTML = store.getState().count
    })


    
  </script>
</body>
</html>
```

##### 1.4 Redux 核心
```js
// 创建 Store 状态容器
const store = Redux.createStore(reducer)

// 创建用于处理状态的 reducer 函数
function reducer(state = initialState, action) {}

// 获取状态
store.getState()

// 订阅状态
store.subscribe(function() {})

// 触发 Action
store.dispatch({ type: 'description...'})
```

#### 2. React + Redux
##### 2.1 在React中不使用Redux时遇到的问题
在React中组件通信的数据流是单向的，顶层组件可以通过props属性向下层组件传递数据，而下层组件不能向上层组件传递数据，要实现下层组件修改数据，需要上层组件传递修改数据的方法到下层组件，当项目越来越大的时候，组件之间传递数据变得越来越困难。

##### 2.2 在React项目中加入Redux的好处
使用Redux管理数据，由于Store独立于组件，使得数据管理独立于组件，解决了组件之间传递数据困难的问题。

##### 2.3 下载 Redux
```base
npm install redux react-redux
```

##### 2.4 Redux工作流程
1. 组件通过 dispatch 方法触发 Action
2. Store 接收 Action 并将 Action 分发给 Redux
3. Reducer 根据 Action 类型对状态进行更改并将更改后的状态返回给Store
4. 组件订阅了Store中的状态，Store中的状态更新会同步到组件

![](./images/2.jpg)

##### 2.5 使用Redux步骤

###### 2.5.1 创建store

```js
// src/store/index.js
import { createStore } from 'redux'
import reducer from './reducers/counter.reducer'
export const store = createStore(reducer)
```

在根组件中使用store：

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter'
import { Provider } from 'react-redux'
import {store} from './store'
/**
 * react-redux
 *  Provider  作用就是将我们创建出来的store放在一个全局组件够的着的地方，Provider要放在最外层
 *  connect
 */

ReactDOM.render(
  // 通过 provider 组件，将store 放在了全局的组件可以够得着的地方
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
);
```

###### 2.5.2 创建 reducer

```js
// src/store/reducers/counter.reducer.js
import { DECREMENT, INCREMENT } from "../count/counter.const";

const initialState = {
  count: 0
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

```js
// src/store/count/counter.const.js
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

###### 2.5.3 在组件中使用 connect 接受 store 里面的 state 和 dispatch

connect方法接受两个参数，返回一个高阶组件。 connect方法的第一个参数是mapStateToProps方法，将store中的state传递到组件的props中，mapStateToProps方法的参数是state，返回值是一个对象，会传递到组件中，写法如下：

```js
const mapStateToProps = (state) => ({
  count: state.count,
  a: 'a', // 这里怎么定义，组件中就可以获得到一个属性
})
```

connect方法的第二个参数是mapDispatchToProps方法，将store中的dispatch传递到组件的props中，mapDispatchToProps方法的参数是dispatch，返回值是一个对象，对象中的方法可以使用dispatch,这个对象中的方法会传递到组件中，写法如下：

```js
const mapDispatchToProps = (dispatch) => ({
  increment () {
    dispatch({ type: 'increment'})
  },
  decrement () {
    dispatch({ type: 'decrement' })
  }
})
```

此外，还可以使用redux中的bindActionCreators来帮助我们创建action函数

```js
import { bindActionCreators } from 'redux'

const mapDispatchToPros = dispatch => ({
  // bindActionCreators返回一个对象
  ...bindActionCreators({
    increment() {
      return { type: 'increment '}
    },
    decrement() {
      return { type: 'decrement' }
    }
  }, dispatch)
})
```

或者写为
```js
const mapDispatchToProps = dispatch => bindActionCreators({
    increment () {
      return { type: 'increment'}
    },
    decrement () {
      return { type: 'decrement'}
    }
  }, dispatch)
```

也可以将bindActionCreators的第一个参数进行抽离
```js
// src/store/actions/counter.actions.js
export const increment = () => ({ type: 'increment' })

export const decrement = () => ({ type: 'decrement' })
```

```js
import * as counterActions from '../store/actions/counter.actions'

const mapDispatchToProps = dispatch => bindActionCreators(conterActions, dispatch)
```
connect方法接受mapStateToProps和mapDispatchToProps，返回一个高阶组件，然后传入Counter组件进行导出

```js
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

最终代码

```js
// src/components/Counter.js

import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import * as counterActions from '../store/actions/counter.actions'

function Counter({ count, increment, decrement }) {
    return <div>
        <button onClick={increment}>+</button>
        <span>{count}</span>
        <button onClick={decrement}>-</button>
    </div>
}

/**
 * 1. connent 方法会帮助我们订阅store 当store中的状态发生更改的时候，会帮助我们重新渲染组件
 * 2. connent 方法可以让我们获取store中的状态 将状态通过组件的props属性映射给组件
 * 3. connent 方法可以让我们获取dispatch方法
 */

const mapStateToProps = state => ({
    count: state.count,
    a: 'a'
})

const mapDispatchToProps = dispatch => bindActionCreators(counterActions, dispatch)

/**
 * 1. connect 方法返回的是另外一个方法(高阶组件)，返回的方法要求我们传递一个组件，因为当store发生改变时要知道改变哪个组件；状态映射给哪个组件的props属性
 * 2. connect 方法第一个参数是一个函数，这个函数有一个形参，把它命名为state，这个state就是组件当中的状态，这个函数返回一个对象，会传递到组件中
 * 3. connect 方法的第二个参数也是一个函数，他可以拿到dispatch方法
 */

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

```js
// src/store/const
export const INCREMENT = 'increment'

export const DECREMENT = 'decrement'
```

```js
// src/store/actions/counter.actions.js
import { DECREMENT, INCREMENT } from "../const/counter.count"

export const increment = () => ({ type: INCREMENT })

export const decrement = () => ({ type: DECREMENT })
```

```js
// src/store/reducer/counter.reducer.js
import { DECREMENT, INCREMENT } from "../const/counter.count"

const initialState = {
    count: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + 1 }
        case DECREMENT:
            return { count: state.count - 1 }
        default:
            return state
    }
}
```

```js
// src/stoer/index.js
import { createStore } from 'redux'
import reducer from "./reducer/counter.reducer";

export const store = createStore(reducer)

```

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from "./components/Counter";
import { Provider } from "react-redux";
import { store } from "./store";

/**
 * react-redux
 *  Provider  作用就是将我们创建出来的store放在一个全局组件够的着的地方，
 *            Provider要放在最外层
 *  conect    会帮助我们订阅store，store的状态更改后，会帮我们重新渲染组件
 *            可以拿到store的状态、可以把store状态映射到props中、可以拿到dispatch方法
 */

ReactDOM.render(
  // 通过Provider组件 将store放在了全局的组件可以够的到的地方
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
);
```

###### 2.5.4 Action 传递参数

1. 传递参数
```js
<button onClick={() => increment(5)}>
```

2. 接收参数，传递reducer
```js
export const increment = payload => ({ type: INCREMENT, payload })
export const decrement = payload => ({ type: DECREMENT, payload })
```

3. reducer根据接受收到的数据进行处理
```js
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + action.payload }
        case DECREMENT:
            return { count: state.count - action.payload }
        default:
            return state
    }
}
```

##### 2.6 redux 实现弹出框案例
store中的状态越多，reducer中的switch分支就会越多，不利于维护，需要拆分reducer

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

/**
 * react-redux
 *  Provider  作用就是将我们创建出来的store放在一个全局组件够的着的地方，
 *            Provider要放在最外层
 *  conect    会帮助我们订阅store，store的状态更改后，会帮我们重新渲染组件
 *            可以拿到store的状态、可以把store状态映射到props中、可以拿到dispatch方法
 */
ReactDOM.render(
  // 通过Provider组件 将store放在了全局的组件可以够的到的地方
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```

```js
// src/App.js
import Counter from "./components/Counter";
import Modal from "./components/modal";

function App() {
  return (
    <div>
      <Counter />
      <Modal />
    </div>
  );
}

export default App;
```

```js
// src/store/index.js
import { createStore } from 'redux'
import reducer from "./reducer/counter.reducer";

export const store = createStore(reducer)
```

```js
// src/store/actions/modal.actions.js
import { HIDEMODAL, SHOWMODAL } from "../const/modal.count"

export const show = () => ({ type: SHOWMODAL })

export const hide = () => ({ type: HIDEMODAL })
```

```js
// src/store/const/modal.count.js
export const SHOWMODAL = 'showModal'
export const HIDEMODAL = 'hideModal'
```

```js
// src/store/reducer/counter.reducer.js
import { DECREMENT, INCREMENT } from "../const/counter.count"
import { HIDEMODAL, SHOWMODAL } from "../const/modal.count"

const initialState = {
    count: 0,
    show: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {...state, count: state.count + action.payload }
        case DECREMENT:
            return {...state, count: state.count - action.payload }
        case SHOWMODAL:
            return {...state, show: true }
        case HIDEMODAL:
            return {...state, show: false }
        default:
            return state
    }
}

```

```js
// src/components/Modal.js
import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActions from "../store/actions/modal.actions";

function Modal({showStatus, show, hide }) {
    const styles = {
        width: 200,
        height: 200,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -100,
        marginTop: -100,
        backgroundColor: 'skyblue',
        display: showStatus ? 'block': 'none'
    }
    return <div>
        <button onClick={show}>显示</button>
        <button onClick={hide}>隐藏</button>
        <div style={styles}></div> 
    </div>
}

const mapStateToProps = state => ({
    showStatus: state.show
})

const mapDispatchToProps = dispatch => bindActionCreators(modalActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
```

##### 2.7 拆分reducer
使用redux提供的combineReducers方法合并其它的reducer

```js
// src/store/reducer/root.reducer.js

import { combineReducers } from 'redux'
import CounterReducer from "./counter.reducer";
import ModalReducer from "./modal.recucer";

// store容器的结构 {counter: { count: 0 }, modal: { show: false }}
export default combineReducers({
    counter: CounterReducer,
    modal: ModalReducer
})
```


```js
// src/store/reducer/counter.reducer.js
import { DECREMENT, INCREMENT } from "../const/counter.count"

const initialState = {
    count: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {...state, count: state.count + action.payload }
        case DECREMENT:
            return {...state, count: state.count - action.payload }
        default:
            return state
    }
}

```

```js
// src/store/reducer/modal.reducer.js
import { HIDEMODAL, SHOWMODAL } from "../const/modal.count"

const initialState = {
    show: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SHOWMODAL:
            return {...state, show: true }
        case HIDEMODAL:
            return {...state, show: false }
        default:
            return state
    }
}

```

创建store时传入的reducer则来自于我们刚才定义的root.reducer.js
```js
// src/store/index.js
import { createStore } from 'redux'
import RootReducer from "./reducer/root.reducer";

export const store = createStore(RootReducer)
```
在每个组件中的mapStateToProps中也要发生相应的改变

```js
const mapStateToProps = state => ({
    count: state.counter.count
})
```

```js
const mapStateToProps = state => ({
    showStatus: state.modal.show
})
```

#### 3.Redux 中间件
##### 3.1 什么是中间件
中间件本质上就是一个函数，中间件允许我们扩展redux应用程序

##### 3.2 加入了中间件 Redux 工作流程

![](./images/3.jpg)

##### 3.3 开发 Redux 中间件
