// 数组类型
export {} // 确保跟其他示例没有成员冲突

// 方式一使用Array泛型，'<number>'表示元素类型
const arr1: Array<number> = [1, 2, 3] // 表示纯数字数组

// 方式二使用元素类型和'[]'
const arr2: number[] = [1, 2, 3]

// ==============================================================
function sum (...args: number[]) {
  return args.reduce((prev, current) => prev + current)
}

sum(1, 2, 3)
