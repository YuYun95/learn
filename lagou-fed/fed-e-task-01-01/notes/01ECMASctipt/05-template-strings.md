## 模板字符串--template-strings
模板字符串支持换行，只需要正常回车换行即可
```javascript
const str = `hello es 2015, 
this is a string`
```
模板字符串支持插值表达式，${}不仅可以插入变量，还可以插入js语句，语句的返回值会被输出
```javascript
const name = 'tom'
const msg = `hey,${name}---${1 + 2}`
console.log(msg)
```
