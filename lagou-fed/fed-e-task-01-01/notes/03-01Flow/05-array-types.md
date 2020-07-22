## 数组类型

```javascript
// 方式一、要一个泛型参数表示数组每个元素的类型
const arr1: Array<number> = [1, 2, 3] // 全部由数字组成的数组

// 方式二、
const arr2: number[] = [1, 2, 3] // 全部由数字组成的数组

// 元组
const foo: [string, number] = ['string', Infinity] // 规定数组的长度，并且规定位置上元素的类型
```