##Object.is
判断两个值是否相等
```javascript
console.log(0 == false, 0 === false, +0 === -0, NaN === NaN)
```
ES2015提出同值比较的算法
```javascript
console.log(Object.is(+0, -0), Object.is(NaN, NaN))
```
