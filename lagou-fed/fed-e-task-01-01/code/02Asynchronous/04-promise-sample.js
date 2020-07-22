// Promise 基本示例

const promise = new Promise(function (resolve, reject) {
  // 这里用于'兑现'承诺的逻辑，该函数会被构造Promise的过程中同步执行
  // resolve 把promise对象状态修改为fulfilled，一般会把一般操作的结果通过resolve的参数传递出去
  // reject 把promise对象状态修改为Reject，一般会把一般操作的结果通过reject的参数传递出去
  resolve(100) // 承诺成功，成功时调用

  reject(new Error('Promise reject')) // 承诺失败，失败时调用
})

promise.then((value) => {
  console.log('resolve', value)
}, (error) => {
  console.log('reject', error)
})

console.log('end');

// 就算Promise中没有任何的异步操作， then 方法中所指定的回调函数任然会进入到回调队列中排队，就是说要等待同步代码全部执行完了才会执行Promise的回调
