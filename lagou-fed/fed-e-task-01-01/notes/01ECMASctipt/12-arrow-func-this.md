## 箭头函数 与 this--arrow-func-this
箭头函数不会改变this的指向

在普通函数中this的指向，始终指向调用该函数的对象

箭头函数中没有this的机制，所以不会改变this的指向；箭头函数的外面this是什么，那么箭头函数的this就是什么
```javascript
const person = {
  name: 'tom',
  sayHi: function() {
    console.log(`hi, my name is ${this.name}`)
  },
  sayHello: () => {
    console.log(`hi, my name is ${this.name}`)
  },
  sayHiAsync: function() {
    setTimeout(function() { // 该函数会被放在全局对象window上调用，所以拿不到当前作用域的this，拿到的是全局对象，可以在外层用变量保存this（闭包），也可以使用箭头函数
      console.log(this.name)
    }, 1000)
    setTimeout(() => {
      console.log(this.name)
    }, 1000)
  }
}
person.sayHi() // name 为 tom
person.sayHello() // name 为 undefined
person.sayHiAsync()
```
