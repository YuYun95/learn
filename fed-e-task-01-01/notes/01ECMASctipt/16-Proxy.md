## Proxy
ES5中想要监视一个对象的属性读写使用Object.defineProperty方法来为对象添加属性，可以捕获对象的读写过程

ES2015中设计了一个Proxy类，为对象设计访问代理器，可以监听对象的读写过程，工能更强大、使用简单

* new Proxy(target,{handled})，第一个参数是需要代理的目标对象，第二个参数是对象，代理的处理对象，通过get方法监视属性的访问，通过set方法监视属性设置

* get 方法接收两个参数，第一个参数是代理目标对象，第二个是外部访问的属性名；返回值将是外部访问的结果

* set 方法接收三个参数，第一个参数是代理目标对象，第二个是要写入的属性名称，第三个是要写入的属性值

```javascript
const person = {
  name: 'tom',
  age: 20
}
const PersonProxy = new Proxy(person, {
  get(target, key) {
    return key in target ? target[key] : 'default'
    // console.log(target, key)
    // return 100
  },
  set(target, key, value) {
    if (key === 'age') {
      if (!Number.isInteger(value)) {
        throw new Error(`${value} is not an int`)
      }
    }
    target[key] = value
    // console.log(target,key,value)
  }
})

PersonProxy.age = 17
PersonProxy.gender = true

console.log(PersonProxy.name)
console.log(PersonProxy.xxx)
```

###Proxy 对比 defineProperty
defineProperty
* defineProperty只能监视属性的读写

* 监视数组称操作，常见的方式是重写数组的操作方法，通过自定义的方法覆盖数组原型链上的方法，来劫持操作


Proxy
* Proxy能够监视到更多对象操作，如：delete 或 对象方法的调用

* Proxy更好的支持数组对象的监视

* Proxy是以非侵入的方式监管对象的读写（已经定义好的对象，不需要对对象本身做任何操作就可以监视对象成员的读写）

deleteProperty：删除对象属性，接收两个参数，第一个是目标对象，第二个是删除的属性名称

[Proxy跟多操作方法](https://es6.ruanyifeng.com/#docs/proxy#Proxy-%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%96%B9%E6%B3%95)
```javascript
const person = {
  name: 'tom',
  age: 20
}

const PersonProxy = new Proxy(person, {
  deleteProperty(target, key) {
    console.log('delete', key)
    delete target[key]
  }
})

delete PersonProxy.age
```

Proxy 操作数组，Proxy会自动根据操作推算下标
```javascript
const list = []
const listProxy = new Proxy(list, {
  set(target, property, value) {
    console.log('set', property, value) // property 数组下标
    target[property] = value
    return true // 表示设置成功
  }
})

listProxy.push(100)
console.log(list)
```
