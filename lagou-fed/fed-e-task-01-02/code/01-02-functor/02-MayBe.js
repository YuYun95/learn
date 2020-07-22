// MayBe函子

class MayBe {
  static of(value) {
    return new MayBe(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    // 当出入的值为 null undefined 时 直接返回一个函子并且值为 null undefined
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }

  isNothing() {
    return this._value === null || this._value === undefined
  }
}

// let r = MayBe.of('Hello World').map(x => x.toUpperCase())
// let r = MayBe.of(null).map(x => x.toUpperCase())

// 多次调用map方法，哪里出现空值是不知道的
let r = MayBe.of('hello world').map(x => x.toUpperCase()).map( x => null).map(x => x.split(' '))
console.log(r)
