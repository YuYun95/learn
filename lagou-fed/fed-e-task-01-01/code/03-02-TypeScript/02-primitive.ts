/**
 * 原始数据类型
 */
// string/number/boolean默认值允许为空(null/undefined需要关闭严格模式)
const a: string = 'string'

const b: number = Infinity // NaN // 100

const c: boolean = true // false

// const d: boolean = null

const e: void = undefined // 空值，一般用在函数没有返回值中，只能存放null和undefined

const f: null = null

const g: undefined = undefined

const h: symbol = Symbol()
