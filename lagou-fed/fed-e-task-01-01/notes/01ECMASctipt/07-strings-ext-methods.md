## 字符串的扩展方法--strings-ext-methods
判断字符串是否以某个开始--starstWith
```javascript
const message = 'Error: foo is not defined.'
console.log(message.startsWith('Error')) // true
```
判断字符串是否以某个字符结尾-- endsWith
```javascript
const message = 'Error: foo is not defined.'
console.log(message.endsWith('.')) // true
```
判断字符串中是否有某个字符
```javascript
const message = 'Error: foo is not defined.'
console.log(message.includes('foo'))
```
