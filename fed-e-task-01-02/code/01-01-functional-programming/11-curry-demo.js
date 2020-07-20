// 柯理化案例
// ''.match(/\s+/g)
// ''.match(/\d+/g)

// function match(reg, str) {
//     return str.match(reg)
// }

// 柯理化：
// 当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不会改变）
// 然后返回一个新的函数接收剩余的参数，返回结果
const _ = require('lodash')

const match = _.curry(function(reg, str) {
    return str.match(reg)
})

const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)

const filter = _.curry(function(func, array) {
    return array.filter(func)
})

// ES6
// const filter1 = _.curry((func, array) => array.filter(func))

const findSpace = filter(haveSpace)

console.log(haveSpace('Hello world'))
console.log(haveNumber('Hello world'))

console.log(filter(haveSpace, ['John Connor', 'John_Donne']))
console.log(findSpace(['John Connor', 'John_Donne']))



