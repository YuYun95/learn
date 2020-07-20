// 类的只读属性

export {} // 确保跟其他示例没有成员冲突

// 如果属性有访问修饰符，readonly 跟在修饰符后面
// 可以在说明的时候初始化，或在构造函数中初始化
// 初始化之后就不可以再修改

class Person {
  // 类的属性必须要有初始值
  public name: string // = 'init name'
  private age: number // 私有属性，只能在类的内部访问
  protected readonly gender: boolean

  constructor (name: string, age: number) {
    this.name = name
    this.age = age
    this.gender = true
  }

  sayHi (msg: string): void {
    console.log(`I an ${this.name}, ${msg}`)
    console.log(this.name)
  }
}

const tom = new Person('tom', 18)
console.log(tom.name)
// tom.gender = false
