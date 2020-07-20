## Folktale
Task异步执行

* folktale一个标准的函数式编程库
    * 和lodash、ramda 不同的是，他没有提供很多功能
    * 只提供了一些函数式处理的操作，例如：compose、curry等，一些函子Task、Either、MayBe等
```javascript
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
```
