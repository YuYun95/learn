// folktale 中的  compose curry

const { compose, curry } = require('folktale/core/lambda')
const { toUpper, first } = require('lodash/fp')

// 第一个参数表示，后面传入的函数有几个参数
let f1 = curry(2, (x, y) => {
  return x + y
})
console.log(f1(1, 2))
console.log(f1(1)(2))

// 函数组合
let f2 = compose(toUpper, first)
console.log(f2(['one', 'two']))
