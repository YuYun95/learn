## Set
Set成员不允许重复

add方法可以向集合对象添加成员，add方法返回集合对象本身，所以可以链式调用，添加已存在的值会被忽略
```javascript
const s = new Set()
s.add(1).add(2).add(3).add(2)
console.log(s)
```

遍历
```javascript
const s = new Set()
s.forEach((key, value) => { console.log(key, value) }) // 遍历集合
for (let i of s) { console.log(i) } // 遍历集合
```

获取集合的总数
```javascript
const s = new Set()
console.log(s.size)
```

判断集合是否包含某个成员
```javascript
const s = new Set()
console.log(s.has(100)) // fale
```

删除集合成员，删除成功返回true，删除不存在的成员(失败)返回false
```javascript
const s = new Set()
console.log(s.delete(100))
```

清除集合的全部内容
```javascript
const s = new Set()
s.add(1).add(2).add(3).add(2)
s.clear()
console.log(s)
```

常用场景：数组去重
```javascript
const arr = [1, 12, 22, 1, 1]
// const result = Array.from(new Set(arr)) // // 使用Array.from 转为数组
const result = [...new Set(arr)]
console.log(result)

// 不可以像获取数组元素那样获取元素
// console.log(result[0])
```
传入对象会报错