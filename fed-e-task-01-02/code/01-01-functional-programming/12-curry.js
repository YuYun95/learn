// 模拟实训 lodash 中的 curry 方法

function getSum(a, b, c) {
    return a + b + c
}

// 柯理化后的函数
const curried = curry(getSum)
console.log(curried(1, 2, 3))
console.log(curried(1)(2, 3))
console.log(curried(1, 2)(3))

function curry(func) {
    return function curriedFn(...args) {
        // 判断实参和形参的个数
        if (args.length < func.length) {
            // 如果实参的个数比形参少，那就返回一个新的函数等待剩余参数的传入；
            // 如果调用了传入剩余参数的函数，那就把之前传入的参数（args）和传入的剩余参数（arguments）合并执行curriedFn函数
            return function() {
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        return func(...args)
    }
}