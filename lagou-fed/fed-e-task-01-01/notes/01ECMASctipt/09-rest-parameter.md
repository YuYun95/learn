## 剩余参数--rest-parameter
之前对于未知的参数都是使用arguments（伪数组）接收
```javascript
function foo() {
  console.log(arguments)
}
```

剩余参数，形参已数组的形式接收从当前参数位置开始往后所有的形参；因为接收的是所有的参数，所有他只能出现在形参的最后一位，而且只能使用一次
```javascript
function foo(...args) {
  console.log(args)
}
foo(1,2,3,4)
```
