## 类的访问修饰符
private    表示私有属性，只能在类的内部访问

public     表示共有属性，typescript中属性默认就是public

protected  表示受保护的，只允许在子类中访问

构造函数默认是public，如果使用private，那就不能被外部实例化，也不能被继承，这就只能在这个类中添加静态方法，在静态方法中创建这个类的实例

如果构造函数是protected，也不能在外部实例化，但是允许继承

```typescript
class Person {
  // 类的属性必须要有初始值
  public name: string // = 'init name'
  private age: number // 私有属性，只能在类的内部访问
  protected gender: boolean

  protected constructor (name: string, age: number) {
    this.name = name
    this.age = age
    this.gender = true
  }

  sayHi (msg: string): void {
    console.log(`I an ${this.name}, ${msg}`)
    console.log(this.name)
  }
}

class Student extends Person {
  private constructor (name: string, age: number) {
    super(name, age)
    console.log(this.gender) // 可以访问
  }

  static create (name: string, age: number) {
    return new Student(name, age)
  }
}

// const tom = new Person('tom', 18) // constructor受保护不可以实例化
// console.log(tom.name)
// console.log(tom.age) // 报错，age是私有属性
// console.log(tom.gender) // 访问不到，报错

const jack = Student.create('jack', 18)

```
