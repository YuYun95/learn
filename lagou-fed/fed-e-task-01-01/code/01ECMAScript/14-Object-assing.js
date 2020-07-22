// Object.assing 方法
// async 和普通函数的区别之一是， async 函数的返回值是一个 promise 对象
// async返回的是一个promise
// async返回值就是promise then的值
const source1 = {
  a: 123,
  b: 123
}

const source2 = {
  b: 789,
  d: 789
}

const target = {
  a: 45,
  c: 456
}

const result = Object.assign(target, source1, source2)
source2.d = 'ffaf'
console.log(result)
console.log(result === target)

