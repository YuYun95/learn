// 柯理化演示

// function checkAge(age) {
//     let min = 18
//     return age >= min
// }

// 普通的纯函数
// function chenkAge(min, age) {
//     return age >= min
// }
// console.log(chenkAge(18, 20))
// console.log(chenkAge(18, 24))
// console.log(chenkAge(22, 24))


// 柯理化： 当函数有多个参数的时候，对函数改造，调用一个函数只传递部分参数并返回一个新的函数，新的函数接收剩余的参数并返回相应的结果

// 函数的柯理化
// function checkAge(min) {
//     return function(age) {
//         return age >= min
//     }
// }

let checkAge = min => (age => age >= min)
let checkAge18 = checkAge(18)
let checkAge20 = checkAge(20)
console.log(checkAge18(20))
console.log(checkAge20(24))