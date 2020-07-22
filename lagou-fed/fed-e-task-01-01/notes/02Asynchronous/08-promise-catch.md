## Promise 异常处理
onReject 为promise异常做处理，promise出错或异常都会被执行

Promise实例的catch方法注册onReject回调更常见，因为这更适合链式调用

catch方法实际上是then方法的一个别名，调用catch实际上相当于调用then方法，第一个参数定义为undefined
```javascript
function ajax(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function() {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

ajax('./api/users1.json')
  .then(function onFulfilled(value) {
    console.log('onFulfilled', value)
  })
  .catch(function onReject(error) {
    console.log('onReject', error)
  })
```

Promise实例的catch方法注册onReject回调更常见，因为这更适合链式调用
```javascript
ajax('./api/users.json').then(function onFulfilled(value) {
  console.log('onFulfilled', value)
}).catch(function onReject(error) {
  console.log('onReject', error)
})
```
使用catch方法注册失败回调，和在then方法中注册效果一样，都捕获异常；但实际他们存在很大的差异，每个then方法返回的都是全新的Promise对象，后面通过链式调用的方式调用的catch，实际是前面then方法返回的对象指定失败的回调，并不是给第一个Promise对象指定，只是这是同一个Promise链条，前面Promise异常会一直被往后传递，所以才能捕获第一个Promise的异常；而通过then方法第二个参数指定的失败回调只是个第一个Promise指定的，所以他只能捕获第一个Promise的异常，后面的Promise返回的异常无法捕获
```javascript
ajax('./api/users.json').then(function onFulfilled(value) {
  console.log('onFulfilled', value)
  return ajax('/error-url')
}, function onReject(error) {
  console.log('onReject', error) // 无法捕获“/error-url”的错误
})

ajax('./api/users.json').then(function onFulfilled(value) {
  console.log('onFulfilled', value)
  return ajax('/error-url')
}) // => Promise {}
  .catch(function onReject(error) {
    console.log('onReject', error) // 可以捕获“/error-url”的错误
  })
```

所以链式调用时建议使用then和catch分开注册成功和失败回调，因为Promise链条上任何一个异常都会被向后传递，值到被捕获，也就是说catch更像是给Promise链条注册回调，所以catch更通用

除此，我们还可以在全局注册一个unhandledrejection处理代码中没有被手动捕获的异常，但是不推荐使用，应该在代码中明确捕获每一个可能的异常
```javascript
window.addEventListener('unhandledrejection', event => {
  const { reason, promise } = event
  console.log(reason, promise)
  // reason => Promise 失败原因，一般是一个错误对象
  // promise => 出现异常的Promise 对象
  event.preventDefault()
}, false)

// 在node中，在process注册事件
process.on('unhandledRejection', (reason, promise) => {
  console.log(reason, promise)
  // reason => Promise 失败原因，一般是一个错误对象
  // promise => 出现异常的Promise 对象
})
```
