### 纯函数
* 纯函数概念：相同的输入永远会得到相同的输出，而且没有任何可观察的副作用
    * 纯函数就类似数学中的函数（用来描述输入和输出之间的关系），y=f(x)

f
  
1 -> 3

2 -> 4

3 -> 5

4 -> 6

* lodash是一个纯函数的功能库，提供了对数组、数字、对象、字符串、函数等操作的一些方法

* 数组的 slice 和 splice 分别是：纯函数和不纯函数
    * slice 返回数组中的指定部分，不会改变原数组
    * splice 对数组进行操作返回该数组，会改变原数组
* 函数式编程不会保留计算中的结果，所以变量是不可变的（无状态的）
* 我们可以把一个函数的执行结果交给另一个函数去处理

```javascript
const array = [1, 2, 3, 4, 5]

// 纯函数，相同的输入等到相同的输出
console.log(array.slice(0, 3))
console.log(array.slice(0, 3))
console.log(array.slice(0, 3))

// 不纯函数
console.log(array.splice(0, 3))
console.log(array.splice(0, 3))
console.log(array.splice(0, 3))

// 实现纯函数
function sum(n1, n2) {
    return n1 + n2
}

console.log(sum(1, 2))
console.log(sum(1, 2))
console.log(sum(1, 2))
```