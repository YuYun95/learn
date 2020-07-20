// for...of 循环

const arr = [100, 200, 300, 400]
for (const item of arr) {
    console.log(item)
}

arr.forEach(item => {
    console.log(item)
})

for (const item of arr) {
    console.log(item)
    if (item > 100) {
        break
    }
}
// arr.forEach() // 不能跳出循环
// arr.some() // 返回true终止循环
// arr.every() // 返回false循环


const s = new Set(['foo', 'bar'])
for (const item of s) {
    console.log(item) // 当前变量的元素
}

const m = new Map()
m.set('foo', '123')
m.set('bar', '345')

for (const [key, value] of m) {
    console.log(key, value)
}

const obj = {
    foo: 123,
    bar: 456
}
for (const item of obj) {
    // console.log(item) // 报错
}