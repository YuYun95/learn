## 参数默认--parmeter-default

之前给函数定义默认值，在函数体内通过逻辑判断去觉得是否使用默认值，但是存在问题，如下代码，使用短路运算判断默认值，当传入的是false，但是输出了true，这是错误的；应该判断参数是否等于undefined
```javascript
function foo(enable) {
  // enable = enable || true // 当传入的是false，但是输出了true
  enable = enable === undefined ? true : enable
  console.log('foo invoked - enable')
  console.log(enable) // true
}
foo(false)
```
而使用ES2015的参数默认就简单多，默认值只有在没传参数或者传的参数是undefined才会被使用，如果有多个参数，带有默认值的形参要出现在参数列表最后，因为参数是按照次序传递的，如果默认值不在后面，默认值无法正常工作
```javascript
function foo(enable = true) {
  console.log('foo invoked - enable')
  console.log(enable)
}
foo(false)
```
