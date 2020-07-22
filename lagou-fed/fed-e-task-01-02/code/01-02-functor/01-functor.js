// Functor 函子

// 容器：包含值(这个值不对外公布的，是函子内部用的)和值的变形关系（这个变形关系就是函数）
// 函子： 是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）
// class Container {
//   constructor(value) {
//     // 包含值
//     this._value = value
//   }
//   // 值的变形关系
//   map(fn) {
//     return new Container(fn(this._value))
//   }
// }
// let r = new Container(5).map(x => x + 1).map(x => x * x)


class Container {
  static of(value){
    return new Container(value)
  }
  constructor(value) {
    // 包含值
    this._value = value
  }
  // 值的变形关系
  map(fn) {
    return Container.of(fn(this._value)) // 返回新的函子（可以链式调用map方法）
  }
}
let r = Container.of(5).map(x => x + 1).map(x => x * x)
console.log(r)
