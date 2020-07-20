// Set 数据结构

// Set成员不允许重复
const s = new Set()

// add方法可以向集合对象添加成员，add方法返回集合对象本身，所以可以链式调用，添加已存在的值会被忽略
s.add(1).add(2).add(3).add(2)
// console.log(s)

// s.forEach((key, value) => { console.log(key, value) }) // 遍历集合
// for (let i of s) { console.log(i) } // 遍历集合

// 获取集合的总数
// console.log(s.size)

// 判断集合是否包含某个成员
// console.log(s.has(100)) // fale

// 删除集合成员，删除成功返回true，删除不存在的成员返回false
// console.log(s.delete(100))

// 清除集合的全部内容
// s.clear()
// console.log(s)

// Set.prototype.keys() 返回键名的遍历器
// for (let key of s.keys()) {
//     console.log(key)
// }

// Set.prototype.values() 返回键值的遍历器
// for (let val of s.values()) {
//     console.log(val)
// }

// Set.prototype.entries() 返回键值对的遍历器(返回值是数组)
// for (let item of s.entries()) {
//     console.log(item)
// }



// 常用场景：数组去重
// const arr = [1, 12, 22, 1, 1]
// const obj = {
//     a: 1,
//     b: 2
// }
// const set = new Set(arr)

// 不可以像获取数组元素那样获取元素
// console.log(set[0])

// 传入对象会报错
// const result = Array.from(new Set(arr)) // 使用Array.from 转为数组

// 也可以使用展开操作符，set成员就会作为数组的成员
// const result1 = [...new Set(arr)]

// console.log(result, result1)