// Reflect
const obj = {
  foo: 'foo',
  bar: 'bar'
}
const proxy = new Proxy(obj, {
  get(target, key) {
    return Reflect.get(target, key)
  }
})
console.log(proxy.foo)

// console.log('name' in obj)
// console.log(delete obj['age'])
// console.log(Object.keys(obj))

console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))
