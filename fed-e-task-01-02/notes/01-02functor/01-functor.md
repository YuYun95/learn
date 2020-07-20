## 函子（Functor）
什么是Functor
* 容器：包含值(这个值不对外公布的，是函子内部用的)和值的变形关系（这个变形关系就是函数）
* 函子： 是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）
```javascript
class Container {
  static of(value){
    return new Container(value)
  }
  constructor(value) {
    // 包含值(私有成员不对外公布)，通过map方法维护
    this._value = value
  }
  // 值的变形关系
  map(fn) {
    return Container.of(fn(this._value)) // 返回新的函子（可以链式调用map方法）
  }
}
let r = Container.of(5).map(x => x + 1).map(x => x * x)
console.log(r)

// 演示 null undefined 的问题
Container.of(null).map(x => x.toUpperCase()) // 报错
```
总结：
* 函数式编程的运算不直接操作值，而是由函子完成
* 函子就是一个实现了map契约的对象
* 我们可以把函子想象成一个盒子，这个盒子封装了一个值
* 想要处理盒子中的值，我们需要给盒子一个map方法传递一个处理值的函数（纯函数），由这个函数来对值进行处理
* 最终map方法返回一个包含新值的盒子（函子）[所以可以链式调用map方法]
