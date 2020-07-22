## Reflect
Reflect属于静态类，不能通过new去实例化一个对象，只能调用这个静态类的方法（Reflect.get()）

[静态方法](https://es6.ruanyifeng.com/#docs/reflect#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95)

Reflect内部封装了一系列对对象的底层操作方法

统一提供一套用于操作对象的API
```javascript
const obj = {
  foo: 'foo',
  bar: 'bar'
}

// console.log('name' in obj)
// console.log(delete obj['age'])
// console.log(Object.keys(obj))

console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))
```

Reflect成员方法就是Proxy处理对象的默认实现
```javascript
const obj = {
  foo: 'foo',
  bar: 'bar'
}
const proxy = new Proxy(obj, {
  get(target, key) {
    return Reflect.get(target,key)
  }
})
console.log(proxy.foo)
```
