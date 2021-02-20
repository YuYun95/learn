/**
 * createStore(reducer, preloadedState, enhancer)
 * { getState, dispatch, subscribe }
 */

function createStore(reducer, preloadedState, enhancer) {
  // 约束reducer参数类型
  if (typeof reducer !== 'function') throw new Error('reducer必须为函数')

  // 判断enhancer参数有没有传递
  if (typeof enhancer !== 'undefined') {
    // 判断enhancer是不是一个函数
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer必须是函数')
    }

    // 要求enhancer返回一个函数，然后传参进去
    return enhancer(createStore)(reducer, preloadedState)
  }

  // store 对象中存储的状态
  var currentState = preloadedState
  // 存放订阅者函数
  var currenListeners = []

  /**
   * currentState是createStore函数的局部变量，当createStore函数运行后，变量currentState会被释放，
   * 但是在我们实际功能中状态要一直存在的，所以用闭包让currentState长久驻存在内存中
   */

  // 获取状态
  function getState() {
    return currentState
  }

  // 触发action
  function dispatch(action) {
    // 判断action是否是对象
    if (!isPlainObject(action)) throw new Error('action必须是对象')

    // 判断对象中是否具有type属性
    if (typeof action.type === 'undefined') throw new Error('action对象中必须要有type属性')

    /**
     * 1. dispatch拿到action后，内部要调用传递进来的reducer函数，
     * reducer函数要返回最新的状态，我们要把reducer返回的最新状态去替换原有的currentState状态，达到更新状态的目的
     *
     * 2. reducer函数有两个参数，第一个参数是当前状态，第二个参数是action，在reducer函数中要判断action对象的type属性值
     * 根据type属性值的不同，对状态进行不同的处理，最后返回一个新的状态替换原有的状态
     */
    currentState = reducer(currentState, action)

    // 循环数组 调用订阅者（调用订阅者更新视图）
    for (var i = 0; i < currenListeners.length; i++) {
      // 获取订阅者
      var listener = currenListeners[i]
      // 调用订阅者
      listener()
    }
  }

  /**
   * subscribe可以被多个地方订阅，当状态改变所有的订阅者都要被执行，可以使用数组把订阅者存储，当状态改变时再调用订阅者
   */
  // 订阅状态
  function subscribe(listener) {
    currenListeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

// 判断obj是否是对象
function isPlainObject(obj) {
  // 排除基本数据类型和null
  if (typeof obj !== 'object' || obj === null) return false
  // 区分数组和对象 原型对象对比的方式
  var proto = obj
  while (Object.getPrototypeOf(proto) != null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      // 创建 store
      var store = createStore(reducer, preloadedState)
      // 阉割版的 store
      var middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch
      }

      // 调用中间件的第一层函数 传递阉割版的store对象
      var chain = middlewares.map(middleware => middleware(middlewareAPI))

      var dispatch = compose(...chain)(store.dispatch)

      // 返回增强版store
      return {
        ...store,
        dispatch
      }
    }
  }
}

function compose() {
  var funcs = [...arguments]
  return function (dispatch) {
    for (var i = funcs.length - 1; i >= 0; i--) {
      dispatch = funcs[i](dispatch)
    }
    return dispatch
  }
}

function bindActionCreators(actionCreators, dispatch) {
  var boundActionCreators = {}
  for (var key in actionCreators) {
    ;(function (key) {
      boundActionCreators[key] = function () {
        dispatch(actionCreators[key]())
      }
    })(key)
  }

  return boundActionCreators
}


function combineReducers(reducers) {
  // 1. 检查reducer类型 它必须是函数
  var reducerKeys = Object.keys(reducers)
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]
    if (typeof reducers[key] !== 'function') throw new Error('reducer必须为函数')
  }

  // 2. 调用一个个小的reducer 将每个小的reducer中返回的状态存储在一个新的大的对象中
  return function(state, action) {
    var nextState = {}
    for (var i = 0; i < reducerKeys.length; i++) {
      var key = reducerKeys[i]
      var reducer = reducers[key]
      var previousStateForKey = state[key]

      nextState[key] = reducer(previousStateForKey, action)
    }
    console.log(nextState);
    return nextState
  }
}