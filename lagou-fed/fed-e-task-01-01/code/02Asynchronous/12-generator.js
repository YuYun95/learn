// Generator

// Promise虽然解决回调嵌套的问题，但是回调达不到同步代码的阅读习惯

// 比Promise更优的异步编程方法：
// 1、ES2015 Generator（生成器函数）
function* foo() {
  console.log('start');
  try {
    // yield暂停执行，直到外界执行生成器的next方法才会从yield位置往后执行
    const res = yield 'foo' // 'foo' yield可以向外返回值
    console.log(res); // bar，生成器的next方法传入参数
  } catch (error) {
    console.log(error)
  }
}
const generator = foo()
const result = generator.next()
console.log(result); // {value:'foo',done:false}

generator.next('bar') // 执行生成器的next方法传入参数，将会作为yield的返回值
generator.throw(new Error('Generator error')) // 会响生成器函数内部抛出异常
