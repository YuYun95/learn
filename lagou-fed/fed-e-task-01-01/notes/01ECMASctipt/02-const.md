## const -- 恒量/常量
特点：在 let 基础上多了[只读]

[只读]变量声明后不允许修改，如果在声明后再去修改值就会报错

所以在声明时就要给定值
```javascript
const name = 'Tom'
name = 'jack'
```
const声明的成员不可以修改，只是说不允许修改重新指向新内存地址，并不是指不给修改属性成员，如：
```javascript
const obj = {}
obj.name = 'Tom'

obj = {} // 报错，改变了obj的指向
```
