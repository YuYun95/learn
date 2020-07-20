// 纯函数和不纯函数

const array = [1, 2, 3, 4, 5]

// 纯函数，相同的输入等到相同的输出
console.log(array.slice(0, 3))
console.log(array.slice(0, 3))
console.log(array.slice(0, 3))

// 不纯函数
console.log(array.splice(0, 3))
console.log(array.splice(0, 3))
console.log(array.splice(0, 3))

// 实现纯函数
function sum(n1, n2) {
    return n1 + n2
}

console.log(sum(1, 2))
console.log(sum(1, 2))
console.log(sum(1, 2))