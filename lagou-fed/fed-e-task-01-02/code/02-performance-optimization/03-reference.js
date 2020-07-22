// reference
// javascript 中的引用和可达

let obj = { name: 'xm' } // 全局、可以从根上找到（可达的）

let ali = obj // 引用数值变化

obj = null // xm对象还是可达的，因为ali还引用着xm对象空间