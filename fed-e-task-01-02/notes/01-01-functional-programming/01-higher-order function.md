### 高阶函数
使用高阶函数的意义：
* 抽象可以帮我们屏蔽细节，只需要关注与我们的目标
* 高阶函数是用来抽象通用的问题

高阶函数（Higher-order function）：可以把函数作为参数传递给另一个函数；可以把函数作为另一个函数的返回值
* 函数作为参数
```javascript
// forEach
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++ ) {
    fn(array[i])
  }
}

const arr = [1, 2, 3, 4]
forEach(arr, function(item) {
    console.log(item)
})

// filter
function filter(array, fn) {
  let results = []
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])){
      results.push(array[i])
    }
  }
  return results
}
const arr = [1, 2, 3, 4, 7, 8]

const r = filter(arr, function(item) {
    return item % 2 === 0
})
console.log(r)
```

* 函数作为返回值
```javascript
// once 只执行一次

function once(fn) {
    let done = false
    return function() {
        if (!done) {
            done = true
            return fn.apply(this, arguments)
        }
    }
}

const pay = once(function(money) {
    console.log(`支付:${money}RMB`)
})
pay(5)
pay(5)
pay(5)
```
