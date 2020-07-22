// 可选成员、只读、动态成员

export {} // 确保跟其他示例没有成员冲突

interface Post {
  title: string
  content: string
  subtitle?: string // 可选成员
  readonly summary: string // 只读，初始化之后就不能再修改，如果修改就报错
}

const hello: Post = {
  title: 'Hello TypeScript',
  content: 'A javascript superset',
  summary: 'A javascript'
}
// hello.summary = 'other'


// ==============================================
// 动态接口
// key可以是任意名称，string表示键的类型，最后的string表示值的类型
interface Cache {
  [key: string]: string
}

const cache: Cache = {}
cache.foo = 'value1'
cache.bar = 'value2'
// cache.bar1 = 1
