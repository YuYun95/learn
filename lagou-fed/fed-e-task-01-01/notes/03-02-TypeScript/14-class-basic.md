## class 类
描述一类具体事物的抽象特征

ES6以前，函数 + 原型模拟实现类

ES6开始javascript中有了专门的class

typescript增强了class的相关语法

类的属性在使用前必须在类中先声明，是为了给属性添加标注

```typescript
class Person {
  // 类的属性必须要有初始值
  name: string // = 'init name'
  age: number

  constructor (name: string, age: number) {
    // 要明确声明类所拥有的属性，而不是在构造函数通过this动态添加
    this.name = name
    this.age = age
  }

  sayHi (msg: string): void {
    console.log(`I an ${this.name}, ${msg}`)
  }
}
```
