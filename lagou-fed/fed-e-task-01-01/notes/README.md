## ECMAScript
1. overView
    * 实际上javascript是ECMAScript的扩展语言，ECMAScript只提供最简单的语法只是停留语言层面，并不能用来实际功能开发
    
    * javascript实现了ECMAScript的标准，并扩展，可以在浏览器操作DOM和BOM，node中能够操作文件
    
    * 浏览器中javascript等于ECMAScript + WebApi（DOM、BOM），node中 ECMAScript + node APIS(FS/net/etc.)
    
    * javascript语言本身就是ECMAScript
    
    * 2015年开始，ECMAScript保持每年一个版本迭代，ES2015开始按照年份命名。也有人把ECMAScript2015称为ES6（ECMAScript2015==>ES6）
    
2. let与块级作用域

   作用域-- 某个成员能够起作用的范围
   
   ES2015前，ES只有两种作用域，分别是全局作用域和函数作用域；在ES2015中新增了一个块级作用域
   
   块：代码中用一对花括号包 '{}' 裹起来的代码，如：
   ```javascript
   if (true){
     console.log('if')
   }
   
   for (var i = 0; i < 10; i++){
     console.log('for')
   }
   ```
   以前块没有独立的作用域，所以在块中定义的变量，块的外面也可以访问，如：
   ```javascript
   if (true){
     var foo = 'foo'
   }
   console.log(foo)
   ```
   这对于代码是非常不利的、不安全的，有了块级作用域，可以通过新的关键字let去声明变量，用法跟传统一样，只是let声明的变量只能在声明的代码块中使用，外部无法访问的，如：
   ```javascript
   if (true){
     let foo = 'foo'
   }
   console.log(foo) // foo is not defined
   ```
   传统for循环如果多个for循环嵌套，那么就要声明不同名称的计数器，不然出现问题，如下代码本应输出九次，但是却输出三次，因为内层声明的i会覆盖外层声明的i
   ```javascript
   for (var i = 0; i < 3; i++){
     for (var i = 0; i < 3; i++){
       console.log(i)
     }
     console.log('内存循环结束 i =' + i)
   }
   ```
   而使用let声明的变量不会出现上面的问题，因为内层声明的i变量是内层块作用域的成员
   ```javascript
   for (let i = 0; i < 3; i++){
     for (let i = 0; i < 3; i++){
       console.log(i)
     }
     console.log('内存循环结束 i =' + i)
   }
   ```
   
   ```javascript
   var elements = [{}, {}, {}]
   for(var i = 0; i < elements.length; i++){
     elements[i].onclick = function() {
       console.log(i) // 输出 3，因为i始终指向全局的i，循环执行后i已经累加到了3
     }
   }
   elements[0].onclick()
   ```
   解决上面的问题可以通过闭包，借助函数作用域拜托全局作用域的影响
   ```javascript
   var elements = [{}, {}, {}]
   for(var i = 0; i < elements.length; i++){
     (function(i) {
       elements[i].onclick = function() {
           console.log(i)
         }
     })(i)
   }
   elements[0].onclick()
   ```
   有了块级作用域就不需要如此麻烦；其实内部也是闭包的机制，当onclick执行是寻找早已执行完毕，i 早已销毁，因为闭包的机制我们才能拿到i对应的值
   ```javascript
   var elements = [{}, {}, {}]
   for(let i = 0; i < elements.length; i++){
     elements[i].onclick = function() {
       console.log(i)
     }
   }
   elements[0].onclick()
   ```
   for循环内部有两层作用域，当声明两个一样的 i 时，他们会在不同的作用域中(两层嵌套的作用域)、互不影响，循环体的 i 是内层作用域，外层 i 是for循环本身的作用域
   ```javascript
   for (let i = 0; i< 2; i++){
     let i = 'foo'
     console.log(i)
   }
   
   // 可以拆解为
   let i = 0
   
   if (i < 2) {
     let i = 'foo'
     console.log(i)
   }
   
   i++
   
   let i = 0
   
   if (i < 2) {
     let i = 'foo'
     console.log(i)
   }
   
   i++
   ```
   let声明的变量不会出现变量提升的情况，需要先声明变量再去使用变量，否则报错；传统的var声明的变量会导致变量提升
   ```javascript
   console.log(foo) // undefined，说明变量已经声明，只是还没赋值，这种现象叫做变量声明的提升
   var foo = 'foo'
   console.log(bar) // 报错
   let bar = 'bar'
   ```
   
3. const -- 恒量/常量

   特点：在 let 基础上多了[只读]
   
   [只读]变量声明后不允许修改，如果在声明后再去修改值就会报错
   
   所以在声明时就要给定值
   ```base
   const name = 'Tom'
   name = 'jack'
   ```
   const声明的成员不可以修改，只是说不允许修改重新指向新内存地址，并不是指不给修改属性成员，如：
   ```base
   const obj = {}
   obj.name = 'Tom'
   
   obj = {} // 报错，改变了obj的指向
   ```

4. 数组解构--array-destructuring
   
   传统获取数组中元素只能通过下标获取
   ```javascript
   const arr = [100, 200, 300]
   
   const foo = arr[0]
   const bar = arr[1]
   const baz = arr[2]
   console.log(foo, bar, baz)
   ```
   
   ES2015新增解构方式快速获取元素，用法：把定义变量的地方用方括号包裹，方括号的成员就是我们要提取数据的变量名，
   内部会按照变量名位置分配数组中对应位置的数值，如果想要获取后面的数值，可以把前面的变量命删除但是保留逗号','，确保结构的格式和数据是一致的
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

5. 对象解构--- object-destructuring

   对象的解构是根据属性名提取而不是根据位置，因为对象的属性是没有固定的次序的，而数组元素是有下标的（也就是有顺序规则）
   
   可以重命名，具体语法就是在解构的成员名后面加上冒号然后跟上一个新的名称
   ```javascript
   const obj = {
     name: 'tom'
   }
   const name = 'jack'
   const {name: objName} = obj
   console.log(objName)
   ```
   设置默认值
   ```javascript
   const obj = {
     name: 'tom'
   }
   const name = 'jack'
   const {name: objName='default name'} = obj
   console.log(objName)
   
   const { log } = console
   log('foo')
   log('bar')
   ```
   解构嵌套的对象，解构嵌套的对象，解构的格式，要和被解构的一样
   ```javascript
   const user = {
     id: 123,
     name: 'tom',
     education: {
       degree: 'Masters'
     }
   }
   const {education: {degree}} = user // 可以理解为，外层的大括号对应user的大括号，education对应usere的ducation，degree对应user的degree
   console.log(degree) // Masters
   ```

6. 模板字符串--template-strings

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

7. 带标签的模板字符串---tagged-templates
   
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

8. 字符串的扩展方法--strings-ext-methods

   判断字符串是否以某个开始--startsWith
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

9. 参数默认--parameter-default
   
   之前给函数定义默认值，在函数体内通过逻辑判断去觉得是否使用默认值，但是存在问题，如下代码，使用短路运算判断默认值，当传入的是false，但是输出了true，这是错误的；应该判断参数是否等于undefined
   ```javascript
   function foo(enable) {
     // enable = enable || true // 当传入的是false，但是输出了true
     enable = enable === undefined ? true : enable
     console.log('foo invoked - enable')
     console.log(enable) // true
   }
   foo(false)
   ```
   而使用ES2015的参数默认就简单多，默认值只有在没传参数或者传的参数是undefined才会被使用，如果有多个参数，带有默认值的形参要出现在参数列表最后，因为参数是按照次序传递的，如果默认值不在后面，默认值无法正常工作
   ```javascript
   function foo(enable = true) {
     console.log('foo invoked - enable')
     console.log(enable)
   }
   foo(false)
   ```

10. 剩余参数--rest-parameter

    之前对于未知的参数都是使用arguments（伪数组）接收
    ```javascript
    function foo() {
      console.log(arguments)
    }
    ```
    ES2015新增了‘...’的操作符，有两个作用：一是剩余操作符，二是展开（如，展开数组）
    
    剩余参数，形参以数组的形式接收从当前参数位置开始往后所有的形参；因为接收的是所有的参数，所有他只能出现在形参的最后一位，而且只能使用一次
    ```javascript
    function foo(...args) {
      console.log(args)
    }
    foo(1,2,3,4)
    ```
    
11. 展开数组--spread-parameter

    ES5
    ```javascript
    const arr = ['foo', 'bar', 'baz']
    
    console.log(arr[0], arr[1], arr[2])
    console.log.apply(console, arr)
    ```
    ES2015使用‘...’操作符展开数组，它会把数组成员按照次序传入
    ```javascript
    const arr = ['foo', 'bar', 'baz']
    console.log(...arr)
    ```

12. 箭头函数--arrow-functions

    ES5定义函数方式
    ```javascript
     function inc(number) {
       return number + 1
    }
    
    console.log(inc(100))
    ```
    
    ES2015定义函数方式
    
    箭头的左边是参数列表，如果有多个参数可以使用圆括号定义，如(m,n)；右边是函数体只有句语句，执行结果将作为结果返回，如果需要执行多条语句，可以使用花括号包裹，如果使用了花括号那么需要使用return关键字返回结果
    ```javascript
    const inc = n => n + 1
    console.log(inc(100))
    
    const foo = (m,n) => {
      return m + n
    }
    foo(1, 2)
    
    const arr = [1, 2, 3, 4, 5, 6, 7]
    // ES5
    arr.filter(function(item) {
      return item % 2
    })
    
    // ES2015
    arr.filter(i => i % 2)
    ```

13. 箭头函数 与 this--arrow-func-this

    箭头函数不会改变this的指向
    
    在普通函数中this的指向，始终指向调用该函数的对象
    
    箭头函数中没有this的机制，所以不会改变this的指向；箭头函数的外面this是什么，那么箭头函数的this就是什么
    ```javascript
    const person = {
      name: 'tom',
      sayHi: function() {
        console.log(`hi, my name is ${this.name}`)
      },
      sayHello: () => {
        console.log(`hi, my name is ${this.name}`)
      },
      sayHiAsync: function() {
        setTimeout(function() { // 该函数会被放在全局对象window上调用，所以拿不到当前作用域的this，拿到的是全局对象，可以在外层用变量保存this（闭包），也可以使用箭头函数
          console.log(this.name) // undefined
        }, 1000)
        setTimeout(() => {
          console.log(this.name)
        }, 1000)
      }
    }
    person.sayHi() // name 为 tom
    person.sayHello() // name 为 undefined
    person.sayHiAsync() // 第一个定时器为 undefined 第二个定时器为 tom
    ```

14. 对象字面量--Object-literal

    ES5中对象属性的值是一个变量，也要书写`属性名:属性值`；如果对象有一个方法需要`方法名:function(){}`
    ```javascript
    const bar = 'bar'
    const obj = {
      foo: 123,
      bar: bar, // 不能像ES6简写为 bar
      method: function() {
        console.log('method')
      }
    }
    ```
    在ES2015中对象属性的值是一个变量,如果属性名和属性值同名，则可以省略冒号和变量名；方法可以省略冒号和function，这其实就是一个普通的function，并不是箭头函数，如果通过对象调用方法，this就指向该对象
    ```javascript
    const bar = 'bar'
    const obj = {
      foo: 123,
      bar,
      method(){
        console.log('method', this)
      }
    } 
    console.log(obj.method())
    ```
    对象字面量还可以使用表达式，表达式的执行结果将作为属性名，通过方括号去使用动态的值（计算属性名）
    ```javascript
    const obj = {
      [Math.random()]: 123
    }
    ```

15. Object.assign

    将多个源对象中的属性复制到一个目标对象中，如果有相同的属性，那么源对象的属性将覆盖目标对象的属性
    
    Object.assign(target, source) 第一个参数是目标对象，第二个参数是源对象；源对象中的所有属性将会被复制到目标对象中(就是后面的覆盖前面的)，该方法的返回值就是目标对象
    
    ```javascript
    const source1 = {
      a: 123,
      b: 123
    }
    
    const source2 = {
      b: 789,
      d: 789
    }
    
    const target = {
      a: 45,
      c: 456
    }
    
    const result = Object.assign(target, source1, source2)
    console.log(result)
    console.log(result === target) // true
    ```

16. Object.is

    判断两个值是否相等
    ```javascript
    console.log(0 == false, 0 === false, +0 === -0, NaN === NaN)
    // true false true false
    ```
    ES2015提出同值比较的算法
    ```javascript
    console.log(Object.is(+0, -0), Object.is(NaN, NaN))
    // false true
    ```

17. Proxy

    ES5中想要监视一个对象的属性读写使用`Object.defineProperty`方法来为对象添加属性，可以捕获对象的读写过程
    
    ES2015中设计了一个Proxy类，为对象设计访问代理器，可以监听对象的读写过程，工能更强大、使用简单
    
    * `new Proxy(target,{handled})`，第一个参数是需要代理的目标对象，第二个参数是对象，代理的处理对象，通过get方法监视属性的访问，通过set方法监视属性设置
    
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
    
18. Proxy 对比 Object.defineProperty

    Object.defineProperty
    * `Object.defineProperty`只能监视属性的读写
    
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

