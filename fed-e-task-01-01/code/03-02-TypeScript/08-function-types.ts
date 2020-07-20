// 函数类型
export {} // 确保跟其他示例没有成员冲突

// 对函数的输入输入出进行限制（参数、返回值）

// 函数声明方式

// 规定函数参数的个数和参数位置的类型；函数必须有返回值，返回值为字符串
// 如果参数可选，在参数名后添加问号，或者使用ES2015的参数默认值；参数可选或参数默认值要出现在函数参数最后
// 接收任意个参数，可以使用ES2015的rest（剩余）操作符
function func1 (a: number, b?: number, ...rest: number[]): string {
  return 'func'
}

func1(100, 200)
func1(100)
func1(100, 200, 300)


// 函数表达式
// 因为函数放在一个变量中，接收函数的变量也应该有类型；ts默认可以推断出变量的类型，但是如果函数接收的是回调函数，那么就要约束参数类型，使用类似于箭头函数的方式进行约束，表示参数和返回值的类型
const func2: (a: number, b: number) => string = function (a: number, b: number): string {
  return 'string'
}
