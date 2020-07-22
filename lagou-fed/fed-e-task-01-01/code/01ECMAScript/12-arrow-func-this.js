// 箭头函数 与 this

const person = {
  name: 'tom',
  sayHi: function() {
    console.log(`hi, my name is ${this.name}`)
  },
  sayHello: () => {
    console.log(`hi, my name is ${this.name}`)
  },
  sayHiAsync: function() {
    // setTimeout(function() { // 该函数会被放在全局对象window上调用，所以拿不到当前作用域的this，拿到的是全局对象
    //   console.log(this.name)
    // }, 1000)
    setTimeout(() =>{
      console.log(this.name)
    })
  }
}
person.sayHi() // name 为 tom
person.sayHello() // name 为 undefined
person.sayHiAsync()

