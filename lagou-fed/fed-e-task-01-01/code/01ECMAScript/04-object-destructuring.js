// 对象解构

const obj = {
  name: 'tom',
  age: 19
}
const name = 'jack'
const { name: objName } = obj
console.log(objName)

const { log } = console
log('foo')
log('bar')
log('baz')

const user = {
  id: 123,
  name: 'tom',
  education: {
    degree: 'Masters'
  }
}
const { education: { degree } } = user // 可以理解为，外层的大括号对应user的大括号，education对应usere的ducation，degree对应user的degree
console.log(degree) // Masters
