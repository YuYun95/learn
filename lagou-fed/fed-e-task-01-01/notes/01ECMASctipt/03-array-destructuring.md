## 数组解构--array-destructuring

传统获取数组中元素只能通过下标获取
```javascript
const arr = [100, 200, 300]

const foo = arr[0]
const bar = arr[1]
const baz = arr[2]
console.log(foo, bar, baz)
```

ES2015新增解构方式快速获取元素，用法：把什么变量的地方用方括号，方括号的成员就是我们要提取数据的变量名，
内部会按照变量名位置分配数组中对应位置的数值，如果想要获取后面的数值，可以把前面的变量命删除但是保留逗号','
```javascript
const arr = [100, 200, 300]
const [foo, bar, baz] = arr
const [, , B] = arr
console.log(foo, bar, baz, B)
```
也可以在结构的变量名之前添加三点'...'表示提取当前位置之后的所有成员，结果会放在一个数组中，这种用法只能在解构中的最后一个成员使用
```javascript
const [foo,...rest] = arr
console.log(rest) // [200, 300]
```

如果解构位置的成员个数小于被解构数组的长度，会按照从前到后的顺序提取，多出的成员不会被提取；如果解构的成员多于被解构的成员，提取到的是undefined；如果要给默认值，只需要在后面添加等号给默认值，如果提取不了值变量就会等于默认值
```javascript
const arr = [100, 200, 300]
const [foo] = arr
console.log(foo) // 100

const [foo, bar, baz, more = 'default value'] = arr
console.log(more) // undefined

```


