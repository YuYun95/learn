// Object 类型

// object 并不单单指对象，它包括了对象、数组、函数
// 如果想单单表示对象，使用对象字面量方式，赋值结构要和类型结构完全一致，即不能多也不能少

export {} // 确保跟其他示例没有成员冲突

const foo: object = function () {
} // [] // {}

const obj: { foo: number, bar: string } = { foo: 123, bar: 'string' }
