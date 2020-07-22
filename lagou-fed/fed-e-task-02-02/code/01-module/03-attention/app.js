import { a } from './module.js'
// a = 22 // 报错，Assignment to constant variable
setTimeout(() => {
  console.log(a) // 2
},2000)
