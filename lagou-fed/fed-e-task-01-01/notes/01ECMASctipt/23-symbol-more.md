## Symbol 补充
可以使用全局变量的方式实现重复使用相同的Symbol值，或使用Symbol提供的静态方法

参数一样的字符串就返回相同的Symbol类型，内容维护的是字符串和Symbol的关系，如果传入的不是字符串会自动转为字符串
```javascript
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1===s2);

console.log(Symbol.for(true) === Symbol.for('true'));
```

自定义标识符
```javascript
const obj = {
    [Symbol.toStringTag]: 'xObject'
}
console.log(obj.toString()); // [object xObject]
```

通过getOwnPropertySymbols获取Symbol属性值，for...in 和 Object.keys 无法获取Symbol属性值
```javascript
const obj1 = {
    [Symbol()]: 'symbol value',
    foo: 'normal value'
}
for (const key in obj1) {
    console.log(key); // 无法拿到Symbol的key
}
console.log(Object.keys(obj1)); // 无法拿到Symbol的key
console.log(JSON.stringify(obj1)); // Symbol被忽略

console.log(Object.getOwnPropertySymbols(obj1)); // 获取Symbol属性名
```