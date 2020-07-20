## 箭头函数--arrow-functions
ES5定义函数方式
```javascript
 function inc(number) {
   return number + 1
}

console.log(inc(100))
```

ES2015定义函数方式
箭头的左边是参数列表，如果有多个参数可以使用圆括号定义，如(m,n)；右边是函数体只有句语句，执行结果将作为结果返回，如果需要执行多条语句，可以使用花括号包裹，如果使用了花括号那么需要使用return关键字返回结果
```javascript
const inc = n => n + 1
console.log(inc(100))


const foo = (m,n) => {
  return m + n
}
foo(1, 2)


const arr = [1, 2, 3, 4, 5, 6, 7]
// ES5
arr.filter(function(item) {
  return item % 2
})

// ES2015
arr.filter(i => i % 2)
```
