## class 静态方法
class中方法分为实例方法和静态方法，实例方法提供实例对象访问；静态方法通过类本身调用

ES5 中静态方法在构造函数对象挂载方法实现
```javascript
function Person1(name,age) {
    this.name = 'name'
    this.age = 'age'
}
Person1.say = function () {
    console.log(this.name)
}
const p1 = new Person1()
Person1.say()
// p1.say() // 报错，只能构造函数本身调用
console.log(p1) // 可以看到实例对象的原型constructor存在say方法
```


ES2015 通过static实现静态方法

因为静态方法是挂载到类上的，所以静态方法内部this不会指向实例对象，而是指向当前的类
```javascript
class Person {
  constructor(name) {
    this.name = name
    this.age = 18
  }
  say() {
    console.log(`hi my name is ${this.name}`)
  }

  static create(name) { // 静态方法将挂载到原型的constructor
    // 静态方法可以调用静态方法，静态方法可以和非静态方法重名
    // this指向的是Person类，而不是Person的实例
    console.log('this', this)
    return new Person(name)
  }
}
// 类静态方法调用
const tom = Person.create('Tom') // new Person('Tom')
tom.say()
```
