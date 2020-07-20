### 闭包
闭包(Closure)：函数和其周围的状态（词法环境）的引用捆绑在一起形成闭包

可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员

闭包的本资：函数在执行的时候会放到一个执行栈上，当函数执行完毕之后会从执行栈移除，**但是堆上的作用域成员因为被外部引用不能释放**，因此内部函数依然可以访问外部函数的成员

```javascript
function makeFn() {
    const msg = 'Hello Function'
    return function() {
        console.log(msg)
    }
}

makeFn()()
```
```javascript
function once(fn) {
    let done = false
    return function() {
        if (!done) {
            done = true
            return fn.apply(this, arguments)
        }
    }
}

const pay = once(function(money) {
    console.log(`支付:${money}RMB`)
})
pay(5)
pay(5)
```
