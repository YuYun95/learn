## Object.assing
将多个源对象中的属性复制到一个目标对象中，如果有相同的属性，那么源对象的属性将覆盖目标对象的属性

Object.assing(target, source) 第一个参数是目标对象，第二个参数是源对象；源对象中的所有属性将会被复制到目标对象中(就是后面的覆盖前面的)，该方法的返回值就是目标对象

```javascript
const source1 = {
  a: 123,
  b: 123
}

const source2 = {
  b: 789,
  d: 789
}

const target = {
  a: 45,
  c: 456
}

const result = Object.assign(target, source1, source2)
console.log(result)
console.log(result === target) // true
```
