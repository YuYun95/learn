## 泛型
定义函数、接口或类时没有指定类型，在使用是再指定类型

目的是极大程度的复用代码

在函数名后使用'<泛型参数>'，一般泛型参数用T作为名称，然后把函数中不明确的类型都用T代表
```typescript
function createArray<T> (length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}

const str = createArray<string>(1, 'string')
const num = createArray<number>(1, 2)
```
