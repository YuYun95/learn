##对象解构--- object-destructuring
对象的解构是根据属性名提取而不是根据位置

可以从命名
```javascript
const obj = {
  name: 'tom'
}
const name = 'jack'
const {name: objName} = obj
console.log(objName)
```
设置默认值
```javascript
const obj = {
  name: 'tom'
}
const name = 'jack'
const {name: objName='default name'} = obj
console.log(objName)

const { log } = console
log('foo')
log('bar')
```
解构嵌套的对象，解构嵌套的对象，解构的格式，要和被解构的一样
```javascript
const user = {
  id: 123,
  name: 'tom',
  education: {
    degree: 'Masters'
  }
}
const {education: {degree}} = user // 可以理解为，外层的大括号对应user的大括号，education对应usere的ducation，degree对应user的degree
console.log(degree) // Masters
```
