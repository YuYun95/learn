/**
 * 数组解构
 * @author
 * @Time
 */

const arr = [100, 200, 300]

// const foo = arr[0]
// const bar = arr[1]
// const baz = arr[2]

// ============================================

// const [foo, bar, baz] = arr
// const [, , B] = arr // 位置要和数组一致，才能提取到对应位置的成员
// console.log(foo, bar, baz, B)

// ============================================

// const [foo,...rest] = arr
// console.log(rest)

// ============================================
const [foo] = arr
console.log(foo)
const [, bar, baz, more = 'default value'] = arr
console.log(more)
