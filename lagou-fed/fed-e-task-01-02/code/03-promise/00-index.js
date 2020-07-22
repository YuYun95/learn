/**
 * 1. Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
 * 2. Promise 中有三种状态 分别为 成功（fulfilled） 失败（rejected） 等待（pending）
 *    pending --> fulfilled
 *    pending --> rejected
 *   一旦状态确定就不可更改
 * 3. resolve和reject函数是用来更改状态的
 *    resolve：fulfilled
 *    reject：fulfilled
 * 4. then方法内部做的事情就是判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败的回调函数 then方法是被定义在原型对象中的
 * 5. then成功回调有一个参数 表示成功之后的值  then失败回调有一个参数 表示失败后的原因
 */

const MyPromise = require('./01-myPromise')

function p1() {
  return new MyPromise(function(resolve, reject) {
    setTimeout(function() {
      resolve('p1')
    }, 2000)
  })
}

function p2() {
  return new MyPromise(function(resolve, reject) {
    // resolve('p2')
    reject('p2 reject')
  })
}

p2().finally(() => {
  console.log('finally')
  return p1()
}).then(value => {
  console.log(value)
}, reason => {
  console.log(reason)
})
