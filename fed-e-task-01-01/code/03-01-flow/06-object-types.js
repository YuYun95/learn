/**
 * 对象类型
 * 
 * @flow
 */

const obj1: { foo: string, bar: number } = { foo: 'string', bar: 100 } // 当前变量必须具有foo 和 bar 类型分别为string和number

const obj2: { foo?: string, bar: number } = { bar: 100 } // 问号表示元素可选

const obj3: { [string]: number } = {} // 可以动态添加属性，但是属性值的类型为number
obj3.key1 = 99
obj3.key2 = 100

