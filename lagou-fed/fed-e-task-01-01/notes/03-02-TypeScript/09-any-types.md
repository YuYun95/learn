## any 任意类型
运行过程可以接收其他类型的值，所以typescript不会对any类型做类型检查；所以任然可以像javascript一样调用任意成员，语法上不会报错
```typescript
function stringify (value: any) {
  return JSON.stringify(value)
}

stringify('string')
stringify(100)
stringify(true)

let foo: any = 'string'
foo = 100
foo.bar()
```
