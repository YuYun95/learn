// Promise执行时序

// 微任务

// 回调队列中的任务称之为“宏任务”，宏任务执行的过程中可以临时加上一些额外需求，可以选择作为一个新的宏任务进到队列排队；也可以作为当前任务的“微任务”，直接在当前任务结束后立即执行，而不是到队列的末尾从新排队。如：到银行取钱，临时决定办卡

// Promise中没有任何异步，他的回调任然会进入队列当中排队，也就是我们必须要等待当前所有同步代码执行完后才会去执行Promise当中的回调

// 微任务
// 微任务：提高整体的响应能力

// 目前绝大多数异步调用都是作为宏任务执行
// Promise、MutationObserver，node 中process.nextTick作为微任务，直接在本轮调用末尾直接执行

// Promise的回调会作为微任务执行，所以会在本轮调用结束的末尾调用执行
// setTimeout作为宏任务进入队列的末尾
console.log('global start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
  console.log('promise')
}).then(() => {
  console.log('promise2')
}).then(() => {
  console.log('promise3')
})

console.log('global end')
