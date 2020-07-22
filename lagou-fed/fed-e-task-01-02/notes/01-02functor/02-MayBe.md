## MayBe函子
* 编程过中可能会遇到很多错误，需要对这些错误做相应的处理
* MayBe函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围）
```javascript
class MayBe {
  static of(value) {
    return new MayBe(value)
  }

  constructor(value) {
    this._value = value
  }

  // 如果对空值变形的话直接返回 值为null的函子
  map(fn) {
    // 当出入的值为 null undefined 时 直接返回一个函子并且值为 null undefined
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }

  isNothing() {
    return this._value === null || this._value === undefined
  }
}
// 出入具体值
let r1 = MayBe.of('Hello World').map(x => x.toUpperCase())

// 传入null的情况
let r2 = MayBe.of(null).map(x => x.toUpperCase())

// 多次调用map方法，哪里出现空值是不知道的
let r3 = MayBe.of('hello world').map(x => x.toUpperCase()).map( x => null).map(x => x.split(' '))
console.log(r)

```
