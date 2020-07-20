### 1.请说出下列执行的最终结果并解释为什么？
```javascript
var a = []
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]()
```
最终的执行结果为10

问题解析

ES2015后，javascript作用域有全局作用域，函数作用域和块级作用域。在全局作用域中使用var关键字声明的变量作为全局变量，该变量无论在函数作用域还是块级作用域都可以访问。因此，for循环中使用var
声明的变量 i 是全局变量。当for执行完时，此时全局变量 i 值为10。由于for循环体内没有声明变量 i 所以将向外层查找，所以循环体内的变量 i 为全局的变量 i 。因此for循环体内的 i 为全局变量 i。所以最终执行结果为10

### 2.请说出下列执行的最终结果并解释为什么？
```javascript
var tmp = 123
if (true) {
  console.log(tmp)
  let tmp
}
```
最终的执行结果为抛出ReferenceError报错

在ES2015新增了块级作用域，指代码中用花括号包裹的代码。当使用一个变量时如果在该作用域没有找到则向外层作用域查找。代码中if语句中存在变量tmp，所以不会向外层查找。let声明的变量不会变量提升，只要块级作用域内存在let命令，他所声明的变量将绑定这个区域不受外部的影响，在声明前该变量都是不可用的，否则就会报错。

### 3.结合 ES6 新语法，用最简单的方法找出数组中的最小值
```javascript
var arr = [12, 34, 32, 89, 4]
```
解答：
```javascript
// 方法一
const min = Math.min(...arr)

// 方法二
const min = Math.min.apply(null, arr)

// 方法三
const min = arr.sort((a,b) => a - b)[0]
```
### 4. 请详细说明var，let，const三种声明变量的方式之间的具体差别？

解析

var
1. 使用var声明的变量存在变量提升值为undefined，可以先使用后声明。
2. 没有块的概念
3. 允许重复声明变量

let
1. 不会变量提升，要先声明才可以使用
2. 只在声明所在的块级作用域内有效
3. 不允许声明重复的变量

const
1. 声明的是一个只读的常量，所以声明时要初始化常量的值，之后不可修改常量所指向的内存地址
2. 只在声明所在的块级作用域内有效
3. 不允许声明重复的常量

### 5.请说出下列执行的最终结果并解释为什么？
```javascript
var a = 10
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a)
    })
  }
}
obj.fn()
```
结果：20

普通函数的this是运行时基于函数执行上下文决定的，当函数被作为对象的方法执行时函数的this指向该对象，所以fn函数的this指向obj函数。箭头函数没有自己的this值，箭头函数所使用的this在定义时由上下文决定的，所以箭头函数this指向fn，而fn的this指向obj，所以输出20

### 6.简述Symbol类型的用途
Symbol最大的特点是独一无二
#### 用途1：作为对象属性使用
因为Symbol变量是独一无二的，在协同开发中可以确保属性名不冲突。
```javascript
const boj = {
  [Symbol('key')]: 'value'
}
```
#### 用途2：作为私有成员
可把Symbol声明的变量作为私有属性，通过传统的for...in、Object.keys等无法枚举的，通过JSON.stringify转换对象时，Symbol属性会被忽略，所以Symbol变量可以用来作为私有成员


### 7.说说什么是浅拷贝，什么是深拷贝
浅拷贝如果拷贝的是对象类型，当一方修改时，其他都会跟着改变，因为对象类型赋值其实是赋值内存地址，而浅拷贝只是拷贝对象的地址。常见的浅拷贝方法有Objece.assign()

深拷贝在拷贝对象类型是把对象这个拷贝一份，当对象的属性也是对象类型时也要深拷贝，然后在堆内存中重开一个内存地址再把这个地址赋值给变量，即使一方改变也不会影响其他变量；所以深拷贝往往需要遍历对象判断属性类型等边界情况。常见深拷贝方法有JSNO.stringify()，但是对undefined、正则表达式、function不可拷贝


### 8.谈谈你是如何理解js异步编程的，Event Loop是做什么的，什么是宏任务，什么是微任务
因为javascript是单线程的，在执行代码过程中如果遇到耗时比较久的任务，后面的任务被阻塞都必须等待耗时任务完成，导致程序拖延出现假死状态。为了解决这个问题就需要异步编程，异步任务开启后，会继续往下执行，不会等待异步任务

Event Loop会监视调用栈和消息队列，如果调用栈没有任务执行了，而消息队列还有任务没被执行，那么Event Loop会把消息队列的第一个任务压入调用栈执行，执行完后把第二个任务压入调用栈，如此反复直到调用栈和消息队列没有任务

宏任务是javascript是异步任务，常见的宏任务有setTimeout、setInterval

微任务是javascript的异步任务，常见微任务有Promise、MutationObserver、process.nextTick


### 9.将下面异步代码使用Promise改进
```javascript
setTimeout(function() {
  var a = 'hello'
  setTimeout(function() {
    var b = 'lagou'
    setTimeout(function() {
      var c = 'I ❤ U'
      console.log(a + b + c)
    }, 10)
  }, 10)
}, 10)

new Promise((resolve,reject) => {
  resolve('hello')
}).then(res => {
  return `${res} lagou`
}).then(res => {
  setTimeout(() => {
    console.log(`${res} I ❤ U`)
  },30)
})
```

### 10.请简述TypeScript与Javascript之间的关系
TypeScript是基于Javascript的语言是javascript的超集，typescript可以使用javascript的语法，并在javascript的基础上增强了自身，如类型系统、接口；typescript
最终要编译为javascript才能运行

### 11.请谈谈你所认为的TypeScript的优缺点
#### 优点
1. 在长周期大型项目中可以减少维护成本
2. 完全可以使用javascript的语法
3. 任何javascript环境都可以开发typescript

#### 缺点
1. 在周期短小型项目中不适合使用，会增加开发成本
2. 在使用第三方库时，如果第三库不提供类型，要做额外的类型声明
3. typescript多了很多概念会提高学习成本
