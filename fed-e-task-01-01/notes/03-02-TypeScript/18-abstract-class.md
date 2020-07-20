## abstract 抽象类
跟接口类似，约束子类的必须有某个成员，但抽象类可以包含具体的实现

抽象类：在class关键词前添加abstract，如果类被定义为抽象类，那就只能被继承不能通过new创建实例对象
抽象方法：在方法名前添加abstract，不需要方法体，只需规定有没参数，参数类型，有没返回值

```typescript
abstract class Animal {
  eat (food: string): void {
    console.log(`呼噜呼噜地吃：${food}`)
  }

  abstract run (distance: number): void // 抽象方法
}

class Dog extends Animal {
  run (distance: number): void {
    console.log('四脚爬行', distance)
  }
}

const d = new Dog()
d.eat('草')
d.run(100)
```
