// 高阶函数--函数作为返回值

function makeFn() {
    const msg = 'Hello Function'
    return function() {
        console.log(msg)
    }
}

makeFn()()


// once 只执行一次
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
pay(5)