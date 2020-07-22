// 函数组合--调试
// NEVER SAY DIE --> never-say-die

const _ = require('lodash')

// _.split()

const split = _.curry((sep, str) => _.split(str, sep))

// _.toLower()

// join
const join = _.curry((sep, array) => _.join(array, sep))

const map = _.curry((fn, array) => _.map(array, fn))

// 调试：因为函数组合中， 前一个函数会把执行结果传递给下一个函数继续处理，所以写一个函数接收结果查看
const log = v => {
  console.log(v)
  return v
}

const log1 = _.curry((tag, v) => {
  console.log(tag, v)
  return v
})

const f = _.flowRight(join('-'), log, _.toLower, log, split(' '))
const f1 = _.flowRight(join('-'), log1('map之后'), map(_.toLower), log1('split之后'), split(' '))
console.log(f('NEVER SAY DIE'))
console.log(f1('NEVER SAY DIE'))
