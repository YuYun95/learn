// lodash 的 fp 模块
// NEVER SAY DIE --> never-say-die
// 函数优先，数据之后

const fp = require('lodash/fp')

const f = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '))
console.log(f('NEVER SAY DIE'))
