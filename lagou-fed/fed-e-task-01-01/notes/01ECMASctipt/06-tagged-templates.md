## 带标签的模板字符串---tagged-templates

在定义模板字符串前添加一个标签，那么这个标签就是一个特殊的函数，添加这个标签就是调用这个函数
```javascript
const str = console.log`hello world` // ['hello world']
```

下面的例子中，函数输出的是模板字符串分隔后的结果，因为在模板字符串中有可能嵌入表达式，所以这里的数组就是按照表达式分隔后的静态内容

这个函数还可以接收所以模板字符串中出现的表达式的返回值

函数内部的返回值是带标签模板字符串所对应的返回值
```javascript
const name = 'tom'
const gender = true

function myTagFunc(strings,name,gender){

  console.log(strings) // [ 'hey, ', ' is a ', '' ]
  console.log(name, gender) // tom true
  // return '123'

  const sex = gender ? 'man' : 'woman'
  return strings[0] + name + strings[1] + sex + strings[2]
}

const reslt = myTagFunc`hey, ${name} is a ${gender}`
console.log(reslt)
```
