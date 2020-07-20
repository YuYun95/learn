## 元组类型
明确元素数量和类型的数组，元素的类型不必要相同，可以使用对象字面量的方式定义
```typescript
const tuple: [number, string] = [18, 'tom'] // 规定了数组的长度和对应位置上的元素类型

// 可以使用数组下标的方式访问元素
const age = tuple[0]
const name = tuple[1]

// 也可以使用数组解构的方式
const [age1, name1] = tuple
```

