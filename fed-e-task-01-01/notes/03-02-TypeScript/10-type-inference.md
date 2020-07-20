## type inference 隐式类型推断
没有明确类型注解标记变量类型，typescript会根据变量的使用情况推断变量的类型

如果typescript无法推断变量具体类型，那就标注为any类型

```typescript
let age = 18 // ts推断为number
// age = 'string' // 报错

let foo // 推断为 any 类型
foo = true
foo = 100
```
