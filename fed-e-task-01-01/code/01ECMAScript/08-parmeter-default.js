// 参数默认值

// function foo(enable) {
//   // enable = enable || true
//   enable = enable === undefined ? true : enable
//   console.log('foo invoked - enable')
//   console.log(enable) // true
// }
// foo(false)

function foo(enable = true) {
  console.log('foo invoked - enable')
  console.log(enable) // true
}

foo(false)
