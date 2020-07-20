// lodash 和 lodash/fp 模块中 map 方法的区别

const _ = require('lodash')
console.log(_.map(['23', '8', '10'], parseInt))
// => [ 23, NaN, 2 ]
// parseInt 第二个参数是表示把第一个参数一多少进制转化（进制范围：2-36，）
// parseInt('23', 0, array)
// parseInt('8', 1, array)
// parseInt('10', 2, array)


const fp = require('lodash/fp')
console.log(fp.map(parseInt, ['23', '8', '10']))
