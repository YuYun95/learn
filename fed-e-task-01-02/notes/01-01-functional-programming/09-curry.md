### 柯理化
柯理化：
* 当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不会改变）
* 然后返回一个新的函数接收剩余的参数，返回结果

总结：
* 柯理化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
* 这是一种对函数参数的“缓存”
* 让函数变得更灵活，让函数的粒度更小
* 可以把多元（多个参数）函数转换成一元函数，可以组合使用函数产生强大的功能

使用柯理化解决硬编码的问题
```javascript
function checkAge(age) {
  let min = 18
  return age >= min
}

// 普通纯函数
function checkAge(min, age) {
  return age >= min
}
checkAge(18, 24)
checkAge(18, 20)
checkAge(20, 30)

// 柯理化
function checkAge(min) {
  return function(age) {
    return age >= min
  }
}
let check18 = checkAge(18)
console.log(check18(20))

// ES6写法
let checkAge = min => (age => age >= min)

let check18 = checkAge(18)
let check20 = checkAge(20)
console.log(check18(20))
console.log(check20(20))
```