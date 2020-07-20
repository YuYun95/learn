// 元组类型
export {} // 确保跟其他示例没有成员冲突

const tuple: [number, string] = [18, 'tom'] // 规定了数组的长度和对应位置上的元素类型

// 可以使用数组下标的方式访问元素
// const age = tuple[0]
// const name = tuple[1]

// 也可以使用数组解构的方式
const [age, name] = tuple

// ================================================
Object.entries({
  foo: 123,
  bar: 456,
  bza: 'str'
})
