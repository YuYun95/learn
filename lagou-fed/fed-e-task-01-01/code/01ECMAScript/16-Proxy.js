// Proxy

// const person = {
//   name: 'tom',
//   aeg: 20
// }
// const PersonProxy = new Proxy(person, {
//   get(target, key) {
//     return key in target ? target[key] : 'default'
//     // console.log(target, key)
//     // return 100
//   },
//   set(target, key, value) {
//     if (key === 'age') {
//       if (!Number.isInteger(value)) {
//         throw new Error(`${value} is not an int`)
//       }
//     }
//     target[key] = value
//     // console.log(target,key,value)
//   }
// })
//
// PersonProxy.age = 17
// PersonProxy.gender = true
//
// console.log(PersonProxy.name)
// console.log(PersonProxy.xxx)

// ==============================================================

// const person = {
//   name: 'tom',
//   age: 20
// }
//
// const PersonProxy = new Proxy(person, {
//   deleteProperty(target, key) {
//     console.log('delete', key)
//     delete target[key]
//   }
// })
//
// delete PersonProxy.age
// console.log(person)

// ==============================================================

const list = []
const listProxy = new Proxy(list, {
  set(target, property, value) {
    console.log('set', property, value)
    target[property] = value
    return true // 表示设置成功
  }
})

listProxy.push(100)
console.log(list)
