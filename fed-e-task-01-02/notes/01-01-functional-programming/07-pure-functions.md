### 纯函数的好处
* 可缓存
    * 因为纯函数对相同的输入始终有相同的结果，所以可以把纯函数的结果缓存起来
```javascript
const _ = require('lodash')
function getArea(r) {
  return Math.PI * r * r
}

let getAreaWithMemory = _.memoize(getArea)
console.log(getAreaWithMemory(4))
```

* 模拟memoize
```javascript
// 声明一个对象存储执行结果，对象的键为传入的参数；
// 调用的时候判断是否已经存在，存在就直接返回结果，不存在就执行传入的函数并传入参数arguments
function memoize(f) {
    let cache = {}
    return function() {
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || f.apply(f, arguments)
        return cache[key]
    }
}

let getAreaWithMemory = memoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
```

* 可测试
    * 纯函数让测试更方便

* 并行处理
    * 在多线程环境下并行操作共享的内存数据很可能会出现意外情况
    * 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数（web worker）
    
## 副作用
* 纯函数：对应相同的输入永远会得到相同的输出，而且没有任何可观察的副作用
```javascript
// 不纯
let mini = 18
function checkAge(age) {
  return age >= mini
}

// 纯的（有硬编码[变量值写死]，后续可以通过函数柯里化解决）
function checkAge(age) {
  let mini = 18
  return age >= mini
}
```

副作用让一个函数变的不纯（如上例），纯函数的根据相同的输入返回相同的输出，如果函数依赖于外部的状态就无法保证输出相同，就会带来副作用

副作用来源：
* 配置文件
* 数据库
* 获取用户的输入
* ......

所以的外部交互都有可能带来副作用，副作用也使得方法通用性下降不适合扩展和可重用性，同时副作用会给程序中带来安全隐患、给程序带来不确定性，但是副作用不可能完全禁止，尽可能控制它们在可控范围内发生