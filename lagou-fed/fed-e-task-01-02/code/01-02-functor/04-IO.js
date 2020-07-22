// IO 函子

const fp = require('lodash/fp')

class IO {
  // IO函子最终想要的还是一个结果，只是把取值的过程包装到一个函数中，到需要值的时候再执行这个函数取值
  static of(value) {
    return new IO(function() {
      return value
    })
  }

  constructor(fn) {
    this._value = fn
  }

  map(fn) {
    // 这里调用IO的构造函数，而不是调用of方法；因为map方法要把当前函子的value（函数）和传入的fn函数组合成一个新的函数，而不是调用函数处理值
    return new IO(fp.flowRight(fn, this._value))
  }
}

// 调用
let r =IO.of(process).map(p => p.execPath)
console.log(r)
console.log(r._value())
