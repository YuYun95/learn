// class 关键字

// ES5 通过定义函数和函数原型对象实现类，通过this访问实例对象

function Person1(name) {
  this.name = name
}

// 实例之间共享方法，可通过函数对象的原型实现
Person1.prototype.say = function() {
  console.log(`hi my name is ${this.name}`)
}
var p1 = new Person1()
console.log(p1)

class Person {
  constructor(name) {
    this.name = name
  }

  // 定义实例方法，实例方法将挂载到原型上(prototype)
  say() {
    console.log(`hi my name is ${this.name}`)
  }
}

const p = new Person('Tom')
console.log(p)
p.say()


