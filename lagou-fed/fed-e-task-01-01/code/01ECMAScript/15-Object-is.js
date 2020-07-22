// Object.is

console.log(0 == false, 0 === false, +0 === -0, NaN === NaN)

console.log(Object.is(+0, -0), Object.is(NaN, NaN))
