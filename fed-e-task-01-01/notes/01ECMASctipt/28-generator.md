## Generator
避免异步编程中回调嵌套过深，提供更好的异步编程解决方案

语法：在普通函数function后面添加 * ，这样普通函数就变成了生成器函数（Generator）
```javascript
function* foo() {
    console.log('tom');
    return 100
}
const result = foo()
console.log('result', result) // 输出生成器对象，可以看到原型上存在next方法
console.log('next', result.next()) // 输出{value:100,done:true}
```
生成器对象也实现了Iterator接口，迭代器接口协议

生成器函数会自动返回一个生成器对象，调用这个对象的next方法才会让函数体执行，执行过程中遇到yield关键字，函数的执行将被暂停，yield后面的值将会作为next的结果返回；如果继续执行生成器对象的next方法，函数将会从暂停的位置继续执行，当函数执行完后next返回的done值为true

Generator是惰性执行
```javascript
function* foo() {
    console.log('111')
    yield 100
    console.log('222');
    yield 200
    console.log('333');
    yield 300
}
const generator = foo()
console.log(generator.next()) // 此时 yield 100 后面的代码还没执行
console.log(generator.next())
console.log(generator.next())
```