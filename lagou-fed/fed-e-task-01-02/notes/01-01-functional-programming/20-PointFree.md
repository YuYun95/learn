### Point Free
Point Free：我们可以把数据处理的过程定义成与数据无光的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前我们需要定义一些辅助的基本运算函数。

* 不需要指明处理的数据
* **只需要合成运算过程**
* 需要定义一些辅助的基本运算函数
```javascript
const f = fp.flowRight(fp.join('-'), fp.map(_.toLower), fp.split(' '))
```
* 案例演示
```javascript
// 非 Point Free模式
// Hello world => hello_world
function f(word) {
  return word.toLowerCase().replace(/\a+/g, '_')
}

// point free
const fp = require('lodash/fp')
const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)
console.log(f('Hello world'))
```
可以看出point free是函数组合

Point Free 案例
```javascript
// 把一个字符串中的首字母提取并转换成大写，使用. 作为分隔符
// world wild web => W. W. W

const fp = require('lodash/fp')

const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '))
console.log(firstLetterToUpper('world wild web'))

```
