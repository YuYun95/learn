### javascript中的面向对象
* js不需属性的访问方法，所有属性都是外部可见的
* 使用属性访问方法只会增加一层重定义，没有访问的控制力


避免属性访问方法使用
```javascript
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
```
