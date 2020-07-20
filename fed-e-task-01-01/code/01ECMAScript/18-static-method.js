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
// 因为静态方法是挂载到类上的，所以静态方法内部this不会指向实例对象，而是指向当前的类
const tom = Person.create('Tom') // new Person('Tom')
tom.say()