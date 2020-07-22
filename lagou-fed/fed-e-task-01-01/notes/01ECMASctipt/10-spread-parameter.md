## 展开数组--spread-parameter
ES5
```javascript
const arr = ['foo', 'bar', 'baz']

console.log(arr[0], arr[1], arr[2])
console.log.apply(console, arr)
```
ES2015使用...操作符展开数组，它会把数组成员按照次序传入
```javascript
const arr = ['foo', 'bar', 'baz']
console.log(...arr)
```
