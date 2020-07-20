// Commonjs 模块始终只会导出一个默认成员

// module.exports = {
//   foo: 'commonjs exports value'
// }

// ============================================
// exports.foo = 'commonjs exports value'

// ============================================
// 不能再Commonjs 模块中 require 载入 ES Module
const mod = require('./es-module.mjs')
console.log(mod)
