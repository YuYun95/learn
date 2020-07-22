// 模拟 lodash 中的 flowRight

const _ = require('lodash')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()

const f = _.flowRight(toUpper, first, reverse)
console.log(f(['one', 'two', 'three']))

// 模拟flowRight
function compose(...args) {
  return function(value) {
    return args.reverse().reduce((acc, fn) => { // fn为args中的每一个函数
      return fn(acc)
    }, value) // valeu 是acc初始值
  }
}

// ES6
// const compose = (...args) => value => args.reverse().reduce((acc, fun) => fn(acc), value)

const fun = compose(toUpper, first, reverse)
console.log(fun(['one', 'two', 'three']))
