## for...of循环 
将来作为遍历所有数据结构的同一方式

for...of 循环可以使用break终止循环
```javascript
const arr = [100, 200, 300, 400]
for (const item of arr) {
    console.log(item)
    if (item > 100) {
        break
    }
}
```

```javascript
const s = new Set(['foo', 'bar'])
for (const item of s) {
    console.log(item) // 当前变量的元素
}
```

```javascript
const m = new Map()
m.set('foo', '123')
m.set('bar', '345')

for (const [key, value] of m) {
    console.log(key, value)
}
for (const item of m) {
    console.log(item) // ['foo',123]、['bar',456]
}
```
```javascript
const obj = {
    foo: 123,
    bar: 456
}
for (const item of obj) {
    // console.log(item) // 报错
}
```