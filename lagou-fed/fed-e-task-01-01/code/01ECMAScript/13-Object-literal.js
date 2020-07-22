// 对象字面量

const bar = 'bar'
const obj = {
  foo: 123,
  bar,
  [Math.random()]: 123,
  method(){
    console.log('method', this)
  }
}
console.log(obj.method())
