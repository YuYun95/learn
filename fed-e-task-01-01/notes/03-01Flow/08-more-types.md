## 特殊类型

```javascript
// 字面量类型：限制变量必须是某个值
const a: 'foo' = 'foo'
//  const a:'foo' = 'foo1' // 不等于foo所以报错

const type: 'success' | 'warning' | 'danger' = 'danger' // 值只能从这三个选

// 使用type 关键字单独声明一个类型，表示多个类型联合的结果
// StringOrNumber表示一个类型的别名，可以在多个地方重复使用
type StringOrNumber = string | number

const b: StringOrNumber = 'string'
const bb: string | number = 'string' // 100 表示值可以是string或数字

// maybe 类型表示有可能
const gender: ?number = null // undefined
```