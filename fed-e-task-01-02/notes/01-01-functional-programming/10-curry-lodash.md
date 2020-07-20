### lodash中的柯理化
* _.curry(func)
    * 功能：创建一个函数，该函数接收一个或多个func的参数，如果func所需要的参数都被提供则执行func并返回执行结果，否则继续返回该函数并等待接收剩余的参数
    * 参数：需要柯理化的函数
    * 返回值：柯理化后的函数
```javascript
const _ = require('lodash')

// 要柯理化的函数
function getSum(a, b, c) {
    return a + b + c
}

// 柯理化后的函数
const curried = _.curry(getSum)

console.log(curried(1, 2, 3))
console.log(curried(1)(2, 3))
console.log(curried(1, 2)(3))
```