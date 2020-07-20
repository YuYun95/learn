* Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
```javascript
class MyPromise {
  constructor(executor) {
   executor(this.resolve, this.reject)
  }
  resolve = () => {}
  reject = () => {}
}
```

* Promise 中有三种状态 分别为 成功（fulfilled） 失败（rejected） 等待（pending）
    * 一旦状态确定就不可更改
    * pending --> fulfilled
    * pending --> rejected
* resolve和reject函数是用来更改状态的
    * resolve：fulfilled
    * reject：fulfilled
```javascript
const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

class MyPromise {
  status = PENDING

  resolve = () => {
    if (this.status !== PENDING) return
    this.status = FULFILLED
  }
  reject = () => {
    if (this.status !== PENDING) return
    this.status = REJECTED
  }
}
```
* then方法内部做的事情就是判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败的回调函数 then方法是被定义在原型对象中的
* then成功回调有一个参数 表示成功之后的值  then失败回调有一个参数 表示失败后的原因，把该参数存储（value）后期传入then方法回调
```javascript
class MyPromise {
  // 成功之后的值
  value = undefined
  // 失败后的原因
  reason = undefined
  resolve = value => {
  // ...
    this.value = value
  }
  reject = reason => {
    this.reason = reason
  }
  then(successCallback,failCallback) {
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    }
  }
}
```

6. promise 异步 和 promise then多次调用
    * 在 then 方法中判断 promise 状态是否为 pending 
    * 如果为 pending 把 then 回调（成功、失败）存储到数组
    * 循环调用存储的回调把value传入
```javascript
class MyPromise {
  // 成功的回调
  successCallback = []
  // 失败回调
  failCallback = []
  resolve = value => {
   // ....
    while (this.successCallback.length) this.successCallback.shift()(this.value)
  }
  reject = reason => {
    // ...
    while (this.failCallback.length) this.failCallback.shift()(this.reason)
  }
  then(successCallback,failCallback) {
      if (this.status === FULFILLED) {
        // ...
      } else if (this.status === REJECTED) {
        // ...
      } else {
        this.successCallback.push(successCallback)
        this.failCallback.push(failCallback)
      }
    }
}
```
* promise then方法链式调用和值的传递，后面then方法的value参数是前一个then方法返回的值
    * 链式调用：then方法应该返回一个promise对象
    * 值的传递：把前一个then方法的返回值存储，把存储的值传入到 promise 的 resolve 方法中，resolve把值存储，在后面调用then方法回调时 把值传入
```javascript
class MyPromise {
  then(successCallback, failCallback){
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        let x = successCallback(this.value) // 变量x存储上一个then的返回值；this.value是上一个then的返回值
        resolve(x)
      }
    })
    return promise2
  }
}
```
* 判断 then 的返回值是普通值还是promise对象
* 如果是普通值 直接调用resolve
* 如果是promise对象 查看promise对象返回的结果
* 在根据promise对象返回的结果 决定调用resolve 还是调用reject
```javascript
class MyPromise {
  then(successCallback, failCallback) {
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        let x = successCallback(this.value)
        resolvePromise(x, resolve, reject)
      }
    })
  }
}

// 解析返回值是普通值还是promise对象，如果是promise对象则调用then方法查看状态
function resolvePromise(x, resolve, reject) {
  if (x instanceof MyPromise){
    x.then(resolve,reject)
  } else {
    resolve(x)
  }
}
```
* then 方法链式调用识别Promise对象自返回（返回自己）
```javascript
class MyPromise {
  then(successCallbakc,failCallback) {
    let promise2 = new MyPromise((resolve,reject) => {
      if (this.status === FULFILLED){
        setTimeout(() => {// 异步 目的是拿取promise2
          let x = successCallbakc(this.value)
          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) { // 判断是否是自返回
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise){
    x.then(resolve,reject)
  } else {
    resolve(x)
  }
}

let promise = new MyPromise((resolve,reject) => {
  resolve('成功')
})
let p1 = promise.then(value => {
  return p1
})

p1.then(value => {
  console.log(value)
},reason => {
  console.log(reason)
})
```

* 捕获执行器错误
```javascript
class MyPromise {
  constructor(executor){
    try{ // 捕获执行器错误
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
}
let promise = new MyPromise((resolve,reject) => {
  throw new Error('executor error')
})
promise.then(value => {
  console.log(value)
},reason => {
  console.log(reason.message)
})
```

* 捕获then方法错误
```javascript
class MyPromise {
  then(successCallbakc, failCallbakc){
    let promise2 = new MyPromise((resolve,reject) =>{
      if (this.status === FULFILLED) {
        setTimeout(() =>{
          try { // 捕获then错误
            let x = successCallbakc(this.value)
            resolvePromise(promise2, x, resolve, reject)
          }catch (e) {
            reject(e)
          }
        },0)
      }
    })
  }
}

promise.then(value => {
  console.log(value)
  throw new Error('then error')
}).then(value => {
  console.log(value)
}, reason => {
  console.log('fail', reason.message)
})
```

* reject 和 异步 处理
```javascript
class MyPromise {
  resolve = value => {
    // ...
    while (this.successCallback.length) this.successCallback.shift()()
  }
  reject = reason => {
    // ...
    while (this.failCallback.length) this.failCallback.shift()()
  }
  then(successCallback, failCallback) {
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED){
        // ...
      } if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }catch (e) {
              reject(e)
            }
          },0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          },0)
        })
      }
    })
  }
}
```

* then参数可选
```javascript
class MyPromise {
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => { throw reason }
    // ....
  }
}
let promise = new MyPromise((resolve, reject) => {
  resolve(1000)
})
promise.then().then().then(value => { console.log(value) })
```

* promise.all 解决异步并发问题，允许按照异步代码调用顺序，得到异步代码执行结果（把异步和同步方法放在promise.all中会想输出异步结果再输出同步结果）
    * 接收一个数组作为参数，数组元素为任何值（普通值、promise对象）
    * 返回值是一个promise对象可以链式调用then方法
    * all方法中所以的promise对象如果状态都是成功的，那么all方法的结果也是成功的，如果有一个失败 all方法就是失败
    * Promise.all() 所以 all 是静态方法
```javascript
class MyPromise {
    static all(array) {
      let result = [] // 结果数组
      let index = 0
  
      return new MyPromise((resolve, reject) => {
        function addData(key, value) {
          result[key] = value
          index++
          if (index === array.length) { // 解决异步，resolve中异步值为空的问题
            resolve(result)
          }
        }
  
        for (let i = 0; i < array.length; i++) { // 循环不会等待异步
          let current = array[i]
          if (current instanceof MyPromise) {
            // promise对象，执行promise 再把结果放在result中
            current.then(value => addData(i, value), reason => reject(reason))
          } else {
            // 普通值
            addData(i, array[i])
          }
        }
      })
    }
}

function p1() {
  return new MyPromise(function(resolve, reject) {
    setTimeout(function() {
      resolve('p1')
    }, 2000)
  })
}

function p2() {
  return new MyPromise(function(resolve, reject) {
    resolve('p2')
  })
}

MyPromise.all(['a', 'b', p1(), p2(), 'c']).then(result => { console.log(result) })
```

* Promise.resolve 将给定的值转换为promise对象（返回值就是一个promise对象），返回的对象会包裹给定的值
* 也可以接收一个promise对象，resolve内部会判断给定的是普通值还是promise对象
    * 判断给定的参数是否是一个promise对象，如果是就原封不动的返回
    * 如果参数不是promise对象就创建promise对象，把给定的值包裹在promise对象中，返回promise对象
```javascript
class MyPromise {
    static resolve(value) {
      if (value instanceof MyPromise) return value
      return new MyPromise((resolve => resolve(value)))
    }
}
function p1() {
  return new MyPromise(function(resolve, reject) {
    setTimeout(function() {
      resolve('p1')
    }, 2000)
  })
}
MyPromise.resolve(100).then(value => console.log(value))
MyPromise.resolve(p1()).then(value => console.log(value))
```

* promise.finally 无论当前promise对象状态是成功还是失败，finally回调函数始终执行一次；finally后面可以链式调用then方法拿到当前promise对象最终返回的结果
