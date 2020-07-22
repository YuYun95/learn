### 关于闭包
* 闭包是一种强大的语法
* 闭包使用不当很容易出现内存泄露
* 不要为了闭包而闭包

### 避开闭包陷阱
```javascript
function test(func) {
  console.log(func())
}

function test2() {
  var name = 'lg'
  return name
}

// 一
test(function() {
  var name = 'lg'
  return name
})

// 二
test(test2)
```
