### Lodash 中的 FP 模块

* lodash/fp
    * lodash 的 fp 模块提供了实用的对**函数式编程友好**的方法
    * 提供了不可变**auto-curried（柯理化） iteratee-first（函数优先） data-last（数据之后）** 的方法
    (如果一个方法的参数为函数，要求函数优先，数据之后)
```javascript
// lodash 模块
const _ = require('lodash')

_.map(['a', 'b', 'c'], _.toUpper)
// => ['A', 'B', 'C']

_.map(['a', 'b', 'c'])
// => ['a', 'b', 'c']

_.split('Hello World', ' ')

// lodash/fp 模块
const fp = require('lodash/fp')

fp.map(fp.toUpper, ['a', 'b', 'c'])
fp.map(fp.toUpper)(['a', 'b', 'c']) // 返回一个函数等待剩余参数，说明map是柯理化的函数

fp.split(' ', 'Hello World')
fp.split(' ')('Hello World') // 

const f = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '))
console.log(f('NEVER SAY DIE'))
```

可以看出lodash提供的方法都是数据优先，函数之后，lodash的FP模块函数优先，数据之后
