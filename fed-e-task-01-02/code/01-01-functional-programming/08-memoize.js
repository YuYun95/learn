// 记忆函数
const _ = require('lodash')

function getArea(r) {
    console.log('半径', r)
    return Math.PI * r * r
}

// let getAreaWithMemory = _.memoize(getArea)
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))

// 模拟memoize
// 声明一个对象存储执行结果，对象的键为传入的参数；
// 调用的时候判断是否已经存在，存在就直接返回结果，不存在就执行传入的函数并传入参数arguments
function memoize(f) {
    let cache = {}
    return function() {
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || f.apply(f, arguments)
        return cache[key]
    }
}

let getAreaWithMemory = memoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))