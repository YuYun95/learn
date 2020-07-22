// if (true) {
//   let foo = 'foo'
// }
// console.log(foo)

// ==========================
// for (var i = 0; i < 3; i++) {
//   for (var i = 0; i < 3; i++) {
//     console.log(i)
//   }
//   console.log('内存循环结束 i =' + i)
// }

// for (let i = 0; i < 3; i++) {
//   for (let i = 0; i < 3; i++) {
//     console.log(i)
//   }
//   console.log('内存循环结束 i =' + i)
// }

// ============================
// var elements = [{}, {}, {}]
// for(var i = 0; i < elements.length; i++){
//   elements[i].onclick = function() {
//     console.log(i)
//   }
// }
// elements[0].onclick()

// var elements = [{}, {}, {}]
// for(var i = 0; i < elements.length; i++){
//   (function(i) {
//     elements[i].onclick = function() {
//       console.log(i)
//     }
//   })(i)
// }
// elements[0].onclick()

// var elements = [{}, {}, {}]
// for(let i = 0; i < elements.length; i++){
//   elements[i].onclick = function() {
//     console.log(i)
//   }
// }
// elements[0].onclick()

// for (let i = 0; i < 2; i++) {
//   let i = 'foo'
//   console.log(i)
// }


console.log(foo) // undefined，说明变量已经声明，只是还没赋值，这种现象叫做变量声明的提升
var foo = 'foo'
// console.log(bar) // 报错
let bar = 'bar'
