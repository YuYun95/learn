## Class
ES5 通过定义函数和函数原型对象实现类，通过this访问实例对象
```javascript
function Person(name) {
  this.name = name
}

// 实例之间共享方法，可通过函数对象的原型实现
Person.prototype.say = function() {
  console.log(`hi my name is ${this.name}`)
}
const p1 = new Person()
console.log(p1)
```

ES2015中类由关键词class声明一个类型
```javascript
class Person {
  constructor(name) { // 构造函数
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
```
