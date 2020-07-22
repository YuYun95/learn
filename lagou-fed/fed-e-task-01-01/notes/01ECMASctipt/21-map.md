## Map
ES5中如果键不是字符串，那么内部就会toString的结果作为键
```javascript
const obj = {}
obj[true] = 'value'
obj[123] = 'value'
obj[{ a: 1 }] = 'value'
// obj[{ b: 1 }] = 'obj' // 覆盖上面的，内部会toString的结果作为键，那么就同名了所以就会被覆盖
console.log(obj)
console.log(Object.keys(obj)) // 如果键不是字符串，那么内部就会toString的结果作为键
```

Map 可以使用任意类型作为键
```javascript
const m = new Map()
const tom = { name: 'tom' }
const jack = { name: 'jack' }
const set = new Set([1, 2, 3])

m.set(tom, 90)
m.set(jack, 100)
m.set(set, 200)
console.log(m)
```

```javascript
const m = new Map()
// 获取数据
console.log(m.get(tom))

// 判断某个键是否存在
console.log(m.has(tom))

// 删除某个键
m.delete(jack)
console.log(m)

// 清空
m.clear()
console.log(m)
```

* Map.prototype.keys() ：返回键名的遍历器。
* Map.prototype.values() ：返回键值的遍历器。
* Map.prototype.entries() ：返回所有成员的遍历器。
* Map.prototype.forEach() ：遍历 Map 的所有成员。

使用实例对象的forEach遍历
```javascript
const m = new Map()
m.forEach((value, key, map) => {
    console.log(value, key, map)
})
```