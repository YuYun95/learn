// 泛型

export {} // 确保跟其他示例没有成员冲突

function createNumberArray (length: number, value: number): number[] {
  // 因为Array默认创建是any类型，所以要指定元素类型
  const arr = Array<number>(length).fill(value)
  return arr
}

const res = createNumberArray(3, 100)

// res => [100, 100, 100]


function createStringArray (length: number, value: string): string[] {
  const arr = Array<string>(length).fill(value)
  return arr
}

// 在函数名后使用'<泛型参数>'，一般泛型参数用T作为名称，然后把函数中不明确的类型都用T代表
function createArray<T> (length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}

const str = createArray<string>(1, 'string')
const num = createArray<number>(1, 2)
