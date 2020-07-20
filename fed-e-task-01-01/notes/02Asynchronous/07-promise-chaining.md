## Promise 链式调用
相比于传统的回调方式，Promise最大优势是可以链式调用，这样能最大程度的避免回调嵌套

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
```

```javascript
var promise = ajax('./api/users.json')
var promise2 = promise.then(function onFulfilled(value) {
  console.log('onFulfilled', value)
}, function onReject(error) {
  console.log('onReject', error)
})

console.log(promise === promise2)
```

then 方法返回的是一个全新的Promise对象，是为了实现Promise链

每一个then方法，实际上都是为上一个then返回的Promise对象添加状态明确过后的回调

如果then方法(回调)返回的不是一个Promise而是一个不同的值，这个值就会做为当前then方法返回的Promise的值，那么下一个then方法中接收的回调参数，拿到的就是这个值；如果回调没有返回任何值，则默认返回undefined
```javascript
ajax('./api/users.json')
  .then(value => {
    console.log(1111)
    return ajax('./api/users.json')
  }) // ==> Promise
  .then(value => {
    console.log('value', value)
    console.log(2222)
  })
  .then(value => {
    console.log(3333)
  })
  .then(value => {
    console.log(4444)
    return 'foo'
  })
  .then(value => {
    console.log('value', value)
    console.log(5555)
  })
```

总结
1. Promise 对象的 then方法会返回一个全新的Promise对象，所以可以使用链式调用的添加then方法
2. 后面的then方法就是在为上一个then返回的Promise注册回调
3. 前面then方法中回调函数的返回值，会作为后面then方法回调的参数
4. 如果回调返回的是Promise，那后面then方法的回调会等待它的结束
