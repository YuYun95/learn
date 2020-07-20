## Promise 静态方法
### Promise.resolve()
* 快速的把一个值转为Promise对象
* 如果结束到的是另外一个Promise对象，这个Promise对象会被原样返回
* 如果传入的是一个对象，这个对象也有一个then方法，也可以作为一个Promise对象被执行

快速的把一个值转为Promise对象
```javascript
Promise.resolve('foo') // 参数将作为值返回
  .then(function(value) {
    console.log(value)
  })

// 等价于
new Promise(function(resolve, reject) {
  resolve('foo')
})
```
如果接收到的是另外一个Promise对象，这个Promise对象会被原样返回
```javascript
var promise = ajax('/api/user.json')
var promise2 = Promise.resolve(promise)
console.log(promise === promise2) // true
```
如果传入的是一个对象，这个对象也有一个跟Promise一样的then方法，也可以作为一个Promise对象被执行
带有then方法的对象可以说是实现了一个thenable接口，就是可以被then的对象；因为在原生Promise对象没普及前，都是使用第三方库实现Promise，把第三方库转为原生Promise就可以通过这种机制
```javascript
Promise.resolve({
  then: function(onFulfiled, onReject) {
    onFulfiled('foo')
  }
}).then(function(value) {
  console.log(value) // foo
})
```
### Promise.reject()
可以快速创建一个一定是失败的Promise对象，传入的参数都会做为失败的原因
```javascript
Promise.reject(new Error('reject')).catch(function (error) {
  console.log(error)
})
```
