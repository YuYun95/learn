// 类型断言
export {} // 确保跟其他示例没有成员冲突

// 假定这个nums 来自一个明确的接口
const nums = [110, 120, 130, 140]
const res = nums.find(i => i > 0) // ts 推断为any

// const square = res  + res

// 方式一 使用 as 关键词
const num1 = res as number

// 方式二 在变量前使用'<>'断言
// 如果代码使用了jsx，这里的<number>会和jsx标签产生冲突
const num2 = <number>res
