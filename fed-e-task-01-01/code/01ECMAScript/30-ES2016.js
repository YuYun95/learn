// ECMAScript2016

// Array.prototype.includes
const arr = ['foo', 1, NaN, false, undefined, null]
console.log(arr.includes(NaN));
console.log(arr.includes(null));
console.log(arr.includes(undefined));

// 指数运算
console.log('ES5', Math.pow(2, 10));
console.log('ES2016', 2 ** 10);