### 函数组合--结合律
* 函数的组合要满足结合律（associativity）
    * 我们既可以把g和h组合，还可以把f和g组合，结果都是一样的（先结合前两个，或先结合后两个）
```javascript
// 结合律
let f = compose(f, g, h)
let associative = compose(compose(f, g), h) == compose(f, compose(g, h))
// true
```
