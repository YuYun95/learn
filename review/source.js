/**
 * 1. 实现new
 * a. 创建一个实例对象
 * b. this执行新创建的对象
 * c. 执行代码
 * d. 返回，若用户自己返回引用值，则以用户的为主，否则返回新创建的对象
 */

function _new(Func, ...args) {
  let obj = Object.create(Func.prototype)

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
    if (p === B.prototype) {
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

// 深度优先（递归版）
function getName(data) {
  if (!data || !data.length) return []
  const result = []
  data.forEach(item => {
    const map = data => {
      result.push(data.name)
      data.children && data.children.forEach(child => map(child))
    }
    map(item)
  })
  return result
}

// 深度优先（非递归版）
function getName1(data) {
  const result = []
  const stack = JSON.parse(JSON.stringify(data))
  // 循环条件，栈不为空
  while (stack.length !== 0) {
    // 最上层节点出栈
    const node = stack.shift()
    result.push(node.name)
    const len = node.children && node.children.length
    for (let i = len - 1; i >= 0; i -= 1) {
      stack.unshift(node.children[i]) // 把子级添加到最外层
    }
  }
  return result
}

// 广度优先遍历
function breadthFirstSearch(source) {
  const result = []
  const queue = JSON.parse(JSON.stringify(source))
  while (queue.length > 0) {
    // 第一个节点出队列
    const node = queue.shift()
    result.push(node.name)
    // 当前节点有子节点则将子节点存入队列，继续下一次的循环
    const len = node.children && node.children.length
    for (let i = 0; i < len; i += 1) {
      queue.push(node.children[i])
    }
  }
  return result
}

/**
 * 回溯算法
 * 类似枚举的搜索尝试过程，在搜索尝试过程中寻找问题的解，如果不满足求解条件，就回溯返回，尝试别的路径
 * 1. 跳出添加，满足条件将当前结果加入总结果
 * 2. 已经拿过的数不再拿
 * 3,。 向下遍历，结束后回溯到上一步
 */
function allArray(nums) {
  var result = []
  function dfs(path) {
    if (nums.length === path.length) {
      // 满足条件
      result.push([...path])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (path.includes(nums[i])) {
        // 去掉已经拿过的数
        continue // 不往后执行
      }
      path.push(nums[i]) // 做选择
      dfs(path)
      path.pop()
    }
  }
  dfs([])
  return result
}

// allArray([1,2,3]) // [ [1,2,3], [1,3,2], [2,1,3], [2,3,1], ... ]

function sonArray(nums) {
  const result = []
  function dfs(path, start) {
    result.push([...path])
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i])
      dfs(path, i + 1)
      path.pop()
    }
  }
  dfs([], 0)
  return result
}

// console.log(sonArray([1,2,3])) // [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], ...]

// 组合求和（组合的和是否等于目标）
function targetArray(nums, target) {
  let result = []
  function sum(arr) {
    if (arr.length === 0) return 0
    return arr.reduce((a, b) => a + b)
  }
  function dfs(path, start) {
    if (sum(path) === target) {
      result.push([...path])
      return
    }
    if (sum(path) > target) {
      return
    }
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i])
      dfs(path.slice(), i)
      path.pop()
    }
  }
  dfs([], 0)
  return result
}
// console.log(targetArray([2,3,5],8)) // [[2,2,2,2],[2,3,3],[3,5]]

function func(arr, str) {
  var res = [];
  var recur = function(arr, path) {
      let string = path.join('-');
      console.log(string)
      if(string.indexOf(str) !== -1){
          res.push(string);
      }
      if(arr === undefined || arr.length === 0)
          return;
      
      for(let i=0; i<arr.length; i++){
          path.push(arr[i].label);
          recur(arr[i].children, path);
          path.pop();
      }
  }
  recur(arr, []);
  return res;
}

// console.log(func([{label:'江苏省',children:[{label:'南京市',children:[{label:'xxx区',children:[]}]}]}],'南京'))
//[ '江苏省-南京市', '江苏省-南京市-xxx区' ]