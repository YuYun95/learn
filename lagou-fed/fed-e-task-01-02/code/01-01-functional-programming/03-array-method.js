// 模拟常用高阶函数：map、every、sone

// map
const map = (array, fn) => {
    const results = []
    for (const value of array) {
        results.push(fn(value))
    }
    return results
}

// let arr = [1,2,3,4]
// arr = map(arr, v => v * v)
// console.log(arr)

// every
const every = (array, fn) => {
    let result = true
    for (const value of array) {
        result = fn(value)
        if (!result) {
            break
        }
    }
    return result
}
// const arr = [9, 12, 14]
// const r = every(arr, v => v > 9)
// console.log(r)

// some
const some = (array, fn) => {
    let result = false
    for (const value of array) {
        result = fn(value)
        if (result) {
            break
        }
    }
    return result
}

const arr = [1, 3, 4, 9]
let r = some(arr, v => v % 2 === 0)
console.log(r)