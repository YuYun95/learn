## monad--单子
* Monad函子是可以变扁的Pointed函子,IO(IO(X))
* 一个函子如果具有join和of两个方法并遵守一些定律就是一个Monad

```javascript
const fs = require('fs')
const fp = require('lodash/fp')

class IO {
    static of(value) {
        return new IO(value)
    }
    constructor(fn) {
        this._value = fn
    }
    map(fn) {
        return new IO(fp.flowRight(fn, this._value))
    }
    join() {// 变扁
        return this._value()
    }
    flatMap(fn){
        return this.map(fn).join()
    }
}

let readFile = function(filename) {
    return new IO(function() {
        return fs.readFileSync(filename, 'utf-8')
    })
}

let print = function(x) {
    return new IO(function() {
        console.log(x)
        return x
    })
}

// let cat = fp.flowRight(print, readFile)
// // IO(IO(x))
// let r = cat('../../package.json')._value()._value()
// console.log(r)


let r = readFile('../../package.json')
    // .map(x => x.toUpperCase())
    .map(fp.toUpper) //
    .flatMap(print)
    .join()
console.log(r)
```
* 使用Monad：当一个函数返回一个函子的时候（解决函子嵌套的问题）
* 想合并函数，并且函数返回一个值，可以调用map方法
* 当想合并函数但是函数返回一个函子，可以使用flatMap方法