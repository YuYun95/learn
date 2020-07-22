## Symbol
最大的特点就是独一无二
```javascript
console.log(Symbol() === Symbol()); // false
```

可以传入字符串作为描述文本用于区分
```javascript
console.log(Symbol('foo'));
console.log(Symbol('bar'));
console.log(Symbol('baz'));
```

对象可以使用Symbol值作为属性名，所以对象可以使用string和Symbol作为属性名
```javascript
const obj = {}
obj[Symbol()] = '123'
obj[Symbol()] = 456

// 也可以使用对象字面量方式
const obj1 = {
    [Symbol()]: 123
} 
```

可以用于实现私有成员
```javascript
// a.js =========================
const name = Symbol()
const person = {
    [name]: 'tom',
    say(){
        console.log(this[name])
    }
}

// b.js ==========================

person[Symbol()]
person.say()
```

