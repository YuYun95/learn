/**
 * 1. 实现new
 * a. 创建一个实例对象
 * b. this执行新创建的对象
 * c. 执行代码
 * d. 返回，若用户自己返回引用值，则以用户的为主，否则返回新创建的对象
 */

function _new(Func, ...args) {
  let obj = Object.create(Func.protertype)

  let result = Func.call(obj, ...args)
  if ((result !== null && typeof result === 'object') || typeof result === 'function') {
    return result
  }
  return obj
}

// =====================================================================================

/**
 * 2. 实现bind
 * a. 判断是否是函数
 * b. 保留原函数
 * c. 定义一个新函数，如果新函数被new了那么this执行当前函数实例，否则指向引入的this
 * d. 合并出入参数
 * e. 继承原函数原型上的属性和方法
 *
 * 两个特点：返回一个函数；接收参数
 * 当bind返回的函数作为构造函数的时候，bind时指定的this值会失效，但传入的参数依然生效
 */
Function.prototype.myBind = function (oThis, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }

  let self = this
  let fBound = function () {
    // 注意这里this的指向
    // instanceof 用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上
    return self.call(this instanceof self ? self : oThis, ...args, ...arguments)
  }
  fBound.prototype = Object.create(self.prototype)
  return fBound
}

// =====================================================================================

/**
 * 3. call
 */
Function.prototype.myCall = function (context) {
  context = context || window
  context.fn = this // foo.fn = func

  let arg = Array.prototype.slice.call(arguments, 1)
  let result = context.fn(...arg)

  Reflect.deleteProperty(context, 'fn')
  return result
}

// var value = 2
// var obj = {
//   value: 1
// }
// function bar(name, age) {
//   console.log(this.value)
//   return {
//     value: this.value,
//     name: name,
//     age: age
//   }
// }
// bar.myCall(null) // 2
// console.log(bar.myCall(obj, 'kevin', 18))

// =====================================================================================

// 4. 实现apply
Function.prototype.myApply = function (context, arr) {
  var context = context || window
  context.fn = this

  let result
  if (!arr) {
    result = context.fn()
  } else {
    result = context.fn(...arr)
  }
  Reflect.deleteProperty(context, 'fn')
  return result
}

// var value = 2
// var obj = {
//   value: 1
// }
// function bar(name, age) {
//   console.log(this.value)
//   return {
//     value: this.value,
//     name: name,
//     age: age
//   }
// }
// bar.myApply(null) // 2
// console.log(bar.myApply(obj, 'kevin', 18))

// =====================================================================================
// 5. 实现防抖（短时间内多次触发，只会执行一次）
function debounce(func, wait) {
  let timeout = null
  return function () {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

// =====================================================================================

// 6. 实现节流
// 节流(定时器版本)
function throttle1(func, wait) {
  let timeout = null
  return function () {
    let context = this
    let arg = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, arg)
      }, wait)
    }
  }
}

// 节流(时间戳版本)
function throttle2(func, wait = 300) {
  let prev = 0
  let result
  return function (...args) {
    let now = +new Date()
    if (now - prev > wait) {
      prev = now
      return (result = fn.apply(this, ...args))
    }
  }
}

// 7. 实现instanceof (判断A是否是B的实例对象)
const instanceOf = (A, B) => {
  let p = A
  while (p) {
    if (p === B.protertype) {
      return true
    }
    p = p.__proto__
  }
  return false
}

// 8. 实现Object.create()
function create(obj) {
  function F() {}
  F.prototype = obj
  F.prototype.constructor = F
  return new F()
}

// 9. 下划线转驼峰
function mapKeysToCamelCase(data) {
  if (typeof data !== 'object' || !data) return data
  if (Array.isArray(data)) {
    return data.map(item => mapKeysToCamelCase(item))
  }

  const newObj = {}
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // 匹配 _a..，或者 a转大写
      const newKey = key.replace(/_([a-zA-Z])/g, item => item[1].toUpperCase())
      newObj[newKey] = mapKeysToCamelCase(data[key])
    }
  }
  return newObj
}

// 10. 驼峰转下划线
function mapKeysToUnderscoreCase(data) {
  if (typeof data !== 'object' || !data) return data
  if (Array.isArray(data)) {
    return data.map(item => mapKeysToUnderscoreCase(item))
  }

  const newObj = {}
  for (const key in data) {
    const newKey = key.replace(/([A-Z])/g, res => `_${res.toLowerCase()}`)
    newObj[newKey] = mapKeysToUnderscoreCase(data[key])
  }
  return newObj
}

// 11. Ajax
const getQueriesByObj = (object = {}, prefix = '') =>
  Object.entries(object)
    .reduce((prev, [key, value]) => (prev += `${key}=${value}&`), prefix)
    .slice(0, -1)

const ajax = (method = 'get') => (url = '', data, extraProps = {}) =>
  new Promise((resolve, reject) => {
    const defaultProps = {
      async: true,
      'Content-type': 'application/x-www-form-urlencoded'
    }
    const props = {
      ...defaultProps,
      ...extraProps
    }

    const { async, baseUrl, queries = {} } = props

    const xhr = new XMLHttpRequest()
    if (!url.includes('http') || !url.includes('https')) {
      url = `${baseUrl || window.location.origin}${url}`
    }
    if (method === 'get') {
      url = getQueriesByObj(queries, `${url}`)
    }

    xhr.open()

    data ? xhr.send(data) : xhr.send()

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return resolve(xhr.response)
        }
        return reject(xhr.response)
      }
    }
  })

// const testUrl = 'https://www.fastmock.site/mock/3410de68d1e03849d328e0b0651c4f1f/api/api/services/app/TransactionBill/GetTransactionBillInfo';
// const ajaxGet = ajax('get');
// const ajaxPost = ajax('post');

// ajaxPost(testUrl).then(console.log)
// ajax('post')(testUrl).then(console.log)

// 12. 观察者模式
class Subject {
  constructor() {
    this.observers = []
  }

  add(observer) {
    if (this.observers.includes(observer)) return
    this.observers.push(observer)
  }

  notify(...args) {
    this.observers.forEach(observer => observer.update(...args))
  }
}

class Observer {
  update(...args) {
    console.log(...args)
  }
}

// 13. 发布订阅模式
class Event {
  #handlers = {}

  addEventListener(type, handler) {
    if (!(type in this.#handlers)) {
      this.#handlers[type] = []
    }
    this.#handlers[type].push(handler)
  }

  dispatchEvent(type, ...params) {
    if (!(type in this.#handlers)) {
      return new Error('该事件未注册')
    }
    this.#handlers[type].forEach(handler => handler(...params))
  }

  removeEventListener(type, handler) {
    if (!(type in this.#handlers)) {
      return new Error('无效事件')
    }
    if (!handler) {
      Reflect.deleteProperty(this.#handlers, type)
    } else {
      const idx = this.#handlers[type].findIndex(ele => ele === handler)

      if (idx === -1) {
        return new Error('无该绑定事件')
      }
      this.#handlers.splice(idx, 1)
      if (this.#handlers[type].length === 0) {
        Reflect.deleteProperty(this.#handlers, type)
      }
    }
  }
}

// 14. 冒泡排序: 元素一和元素二比较，元素二大于元素一，交换位置；元素二和元素三比....
function bubbleSort(arr) {
  let len = arr.length
  for (let i = len; i >= 2; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // console.log(([arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]))
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
      console.log(arr[j], arr[j + 1], j, j + 1)
      console.log(arr)
    }
  }
  return arr
}

// 15. 选择排序：遍历自身以后的元素，最小的元素跟自己换位置
function selectSort(arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[i]) {
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      console.log(arr[i], arr[j], i, j)
    }
  }
  return arr
}

// 16. 插入排序：将元素插入已排序好的数组中
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    // arr[0]默认为已排序的数组
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      } else {
        break
      }
      console.log(arr[j], arr[j - 1], j, j - 1, i)
      console.log(arr)
    }
  }
}
// [5, 6, 3, 4, 1, 2]
// 5,3,6,4,1,2
// 3,5,6,4,1,2
// 3,5,4,6,1,2
// 3,4,5,6,1,2

// 17. 希尔排序：按一定的间隔对数列分组，然后在每一个分组中做插入排序
//     随后逐次缩小间隔，在每个分组中做插入排序...直到间隔等于1，做一次插入排序后结束
function shellSort(arr) {
  let len = arr.length
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let j = i
      let current = arr[i]
      while (j - gap >= 0 && current < arr[j - gap]) {
        arr[j] = arr[j - gap]
        j = j - gap
      }
      arr[j] = current
    }
  }
  return arr
}

// 18. 快速排序：选择基准mid，循环原数组，小于基准值放左边数组，大于放右边数组，
// 然后concat组合，最后依靠递归完成排序 (把数组递归切割为一个元素的数组，然后concat组合)
function quickSort(arr) {
  if (arr.length <= 1) return arr
  let left = []
  let right = []
  let mid = arr.splice(0, 1)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  console.log(left, mid, right)
  return quickSort(left).concat(mid, quickSort(right))
}

// 手写Promise
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  value = undefined
  reson = undefined
  status = PENDING
  onFulFilledCallback = []
  onRejectedCallback = []

  resolve = value => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      while (this.onFulFilledCallback.length) this.onFulFilledCallback.shift()()
    }
  }

  reject = reson => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reson = reson

      while (this.onRejectedCallback.length) this.onRejectedCallback.shift()()
    }
  }

  then(onFulFilled, onRejected) {
    // then链式调用前面的不传参，后面的接收情况[then().then().then(res => {console.log(res)})]，
    // 判断是否有回调，没有就补一个
    onFulFilled = onFulFilled ? onFulFilled : value => value
    onRejected = onRejected
      ? onRejected
      : reson => {
          throw reson
        }

    const promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            // 把上一个then方法返回值传递给下一个then方法（resolve方法是当前promise变量的，会把x存储起来）
            const x = onFulFilled(this.value) // x是then方法return的值
            // 判断 x 的值是普通值还是Promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promise, x, resolve, reject) // 同步代码，此时获取不到promise变量，所以需要异步获取
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            // 把上一个then方法返回值传递给下一个then方法（resolve方法是当前promise变量的，会把x存储起来）
            const x = onRejected(this.reson) // x是then方法return的值
            // 判断 x 的值是普通值还是Promise对象
            // 如果是普通值 直接调用resolve
            // 如果是promise对象 查看promise对象返回的结果
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promise, x, resolve, reject) // 同步代码，此时获取不到promise变量，所以需要异步获取
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === PENDING) {
        // 把回调函数缓存， 解决异步调用resolve的问题
        this.onFulFilledCallback.push(() => {
          queueMicrotask(() => {
            try {
              // 把上一个then方法返回值传递给下一个then方法（resolve方法是当前promise变量的，会把x存储起来）
              const x = onFulFilled(this.value) // x是then方法return的值
              // 判断 x 的值是普通值还是Promise对象
              // 如果是普通值 直接调用resolve
              // 如果是promise对象 查看promise对象返回的结果
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promise, x, resolve, reject) // 同步代码，此时获取不到promise变量，所以需要异步获取
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedCallback.push(() => {
          queueMicrotask(() => {
            try {
              // 把上一个then方法返回值传递给下一个then方法（resolve方法是当前promise变量的，会把x存储起来）
              const x = onRejected(this.reson) // x是then方法return的值
              // 判断 x 的值是普通值还是Promise对象
              // 如果是普通值 直接调用resolve
              // 如果是promise对象 查看promise对象返回的结果
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promise, x, resolve, reject) // 同步代码，此时获取不到promise变量，所以需要异步获取
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
    return promise
  }

  finally(callback) {
    return this.then(
      value => {
        // 因为有异步操作，需要等待异步
        return MyPromise.resolve(callback()).then(() => value)

        // 如果有异步操作，不会等待
        // callback()
        // return value
      },
      reson => {
        return MyPromise.resolve(callback()).then(() => {
          throw reson
        })
        // callback()
        // throw reson
      }
    )
  }

  static all(array) {
    let result = []
    let index = 0

    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        index++
        result[key] = value
        if (index === array.length) {
          resolve(result)
        }
      }

      for (let i = 0; i < array.length; i++) {
        const current = array[i]
        if (current instanceof MyPromise) {
          // Promise 对象
          current.then(
            value => addData(i, value),
            reson => reject(reson)
          )
        } else {
          // 普通值
          addData(i, array[i])
        }
      }
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    // 自己返回了自己
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // x 是不是MyPromise实例对象
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}
