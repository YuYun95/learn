## Either函子
* Either两者中的一个，类似于if...else...的处理
* 异常会让函数变得不纯，Either函子可以用来做异常处理
```javascript
class Left {
  static of(value) {
    return new Left(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return this
  }
}

class Right {
  static of(value) {
    return new Right(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return Right.of(fn(this._value))
  }
}

// let r1 = Right.of(12).map(x => x + 2)
// let r2 = Left.of(12).map(x => x + 2)
// console.log(r1, r2)


function parseJSON(str) {
  try {
    // 返回一个函子，把JSON.parse后的结果交给Right函子
    return Right.of(JSON.parse(str))
  } catch (e) {
    // 纯函数：相同的输入有相同的输出，所以也返回一个函子
    // 把错误信息记录在Left函子中返回
    return Left.of({ error: e.message })
  }
}

// let r = parseJSON('{name: zs}')
// console.log(r)

let r = parseJSON('{"name": "zs"}').map(x => x.name.toUpperCase())
console.log(r)

```
