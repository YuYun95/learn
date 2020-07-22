## Flow 类型注解
函数参数类型注解：在参数后面添加冒号和类型，如果传入的参数类型不是规定的将报错

变量类型注解：声明变量时在变量名后添加冒号和类型，如果变量值类型不是规定的将报错

函数返回值：如果没有返回值使用void，有返回值则使用相应的类型
```javascript
function square(n: number) {
    return n * n
}

let num: number = 100
    // num = 'string'

function foo(): number {
    // return 'string'
    return 100
}

function bar(): void {}
```
