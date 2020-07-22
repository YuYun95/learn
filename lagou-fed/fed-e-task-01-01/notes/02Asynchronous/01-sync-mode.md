## 同步模式
同步指代码依次执行，后一个任务必须等待前一个任务执行结束才能开始执行，程序的执行顺序和我的代码编写顺序完全一致，所以这种方式会比较简单；在单线程情况下大多数任务会以同步（排队）模式执行

开始执行，js引擎会把整体代码加载进来，在调用栈中压入一个匿名的调用（可以理解为把代码放到一个匿名函数中执行），然后就逐行执行我们的代码，函数或者变量的声明都会产生任何的调用
```javascript
console.log('global begin');

function bar() {
    console.log('bar task');
}

function foo() {
    console.log('foo task');
    bar()
}

foo()

console.log('global end');
```