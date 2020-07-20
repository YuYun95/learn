## extends 继承
继承可以抽象出类之间相似的地方

ES5 大多使用原型实现继承

ES6 使用extends实现继承
```javascript
class Person {
    constructor(name) {
        this.name = name
    }
    say() {
        console.log(`hi my name is ${this.name}`)
    }
}

class Student extends Person {
    constructor(name, number) {
        super(name) // super始终指向父类，调用super就是调用父类的构造函数
        this.number = number
    }
    hello() {
        super.say() // 调用父类的方法
        console.log(`my school number is ${this.number}`)
    }
}

const s = new Student('jack', 100)
s.hello()
```