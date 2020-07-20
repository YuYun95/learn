## 类与接口
一个接口可以抽象多个方法；也可以把接口细分，因为类不一定同时存在多个方法
```typescript
// interface EatAndRun {
//   eat (food: string): void
//   run (distance: number): void
// }

interface Eat {
  eat (food: string): void
}

interface Run {
  run (distance: number): void
}

class Person implements Eat, Run { // 多个接口使用逗号间隔
  eat (food: string): void {
    console.log(`优雅的进餐：${food}`)
  }

  run (distance: number): void {
    console.log(`直立行走：${distance}`)
  }
}

class Animal implements Eat, Run {
  eat (food: string): void {
    console.log(`呼噜呼噜的吃：${food}`)
  }

  run (distance: number): void {
    console.log(`爬行：${distance}`)
  }
}
```
