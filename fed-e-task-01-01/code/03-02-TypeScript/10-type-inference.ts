// 隐式类型推断
export {} // 确保跟其他示例没有成员冲突

// 如果typescript无法推断变量具体类型，那就标注为any类型

let age = 18 // ts推断为number
// age = 'string' // 报错

let foo // 推断为 any 类型

foo = true
foo = 100
