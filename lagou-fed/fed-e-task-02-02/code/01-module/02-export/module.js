// export var name = 'foo module'
//
// export function hello() {
//   console.log('hello')
// }
//
// export class Person {}

var name = 'foo module'

function hello() {
  console.log('hello')
}

class Person {
}

// export { name, hello, Person }

// 使用 as 重命名，如果重命名为 default 那个这个成员就会做为当前模块默认导出的成员
// 在导入这个成员就必须要给这个成员重命名，default是一个关键词，不能作为一个变量使用
export {
  name as fooName,
  hello,
  Person
}
