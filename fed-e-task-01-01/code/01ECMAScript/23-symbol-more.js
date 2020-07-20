// Symbol 补充
console.log(Symbol() === Symbol())

// 参数一样的字符串就返回相同的Symbol类型，内容维护的是字符串和Symbol的关系，如果传入的不是字符串会自动转为字符串
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 === s2);

console.log(Symbol.for(true) === Symbol.for('true'));

// console.log(Symbol.iterator);
// console.log(Symbol.hasInstance);

// 自定义标识符
const obj = {
    [Symbol.toStringTag]: 'xObject'
}
console.log(obj.toString());

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

