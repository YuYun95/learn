//  避免属性访问方法使用
function Person() {
  this.name = 'icoder'
  this.age = 18
  this.getName = function() {
    return this.age
  }
}

const p1 = new Person()
const a = p1.getName()

// =================================== 执行效率较高
function Person2() {
  this.name = 'icoder'
  this.age = 18
}

const p2 = new Person2()
const b = p2.age
