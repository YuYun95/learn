// lodash 中的 curry 基本使用

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