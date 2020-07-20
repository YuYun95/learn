## Promise 基本示例
回调函数是js所有异步编程的根据，直接使用传统回调方式去完成复杂的异步流程就无法回避大量的回调函数嵌套（回调地狱）；

CommonJS社区提出promise的规范，在ES2015中被标准化，成为语言规范

Promise 实际就是一个对象，用来表示一个异步任务最终结束后是成功还是失败，就像是内部对外部做出承诺，一开始这个承诺是待定状态（pending），最终有可能成功（fulfilled），也有可能失败（reject），成功和失败都有相应的任务自动执行，成功onFulfilled，失败onReject；最终承诺结果明确后将不可改变

resolve 把promise对象状态修改为fulfilled，一般会把一般操作的结果通过resolve的参数传递出去

reject 把promise对象状态修改为Reject，一般会把一般操作的结果通过reject的参数传递出去

就算Promise中没有任何的异步操作， then 方法中所指定的回调函数任然会进入到回调队列中排队，就是说要等待同步代码全部执行完了才会执行Promise的回调
```javascript
const promise = new Promise(function (resolve, reject) {
  // 这里用于'兑现'承诺的逻辑，该函数会被构造Promise的过程中同步执行
  resolve(100) // 承诺成功，成功时调用
  reject(new Error('Promise reject')) // 承诺失败，失败时调用
})

promise.then((value) => {
  console.log('resolve', value)
}, (error) => {
  console.log('reject', error)
})

console.log('end')
```
