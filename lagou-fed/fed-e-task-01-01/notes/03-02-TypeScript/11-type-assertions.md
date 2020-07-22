## 类型断言
typescript无法推断变量的类型，但是我们可以明确知道变量的类型

不是把一个类型转换为另一个类型；代码转换是代码运行时的概念；类型断言是编译过程的概念，代码编译后断言就不存在了

类型断言：告诉typescript类型

方式一 使用 as 关键词

方式二 在变量前使用'<>'断言

```typescript
// 假定这个nums 来自一个明确的接口
const nums = [110, 120, 130, 140]
const res = nums.find(i => i > 0) // ts 推断为any

// const square = res  + res

// 方式一 使用 as 关键词
const num1 = res as number

// 方式二 在变量前使用'<>'断言

// 如果代码使用了jsx，这里的<number>会和jsx标签产生冲突
const num2 = <number>res
```
