## 对象字面量--Object-literal
ES5中对象属性的值是一个变量，也要书写属性名:属性值；如果对象有一个方法需要方法名:function(){}
```javascript
const bar = 'bar'
const obj = {
  foo: 123,
  bar:bar,
  method: function() {
    console.log('method')
  }
}
```
在ES2015中对象属性的值是一个变量,如果属性名和属性值同名，则可以省略冒号和变量名；方法可以省略冒号和function，这其实就是一个普通的function，并不是箭头函数，如果通过对象调用方法，this就指向该对象
```javascript
const bar = 'bar'
const obj = {
  foo: 123,
  bar,
  method(){
    console.log('method', this)
  }
} 
console.log(obj.method())
```
对象字面量还可以使用表达式，表达式的执行结果将作为属性名，通过方括号去使用动态的值（计算属性名）
```javascript
const obj = {
  [Math.random()]: 123
}
```
