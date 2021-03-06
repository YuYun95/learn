// 异步编程
// 单线程 javascript 异步方案

// 单线程原因：
// 1、javascript运行在浏览器端的脚步语言，目的实现页面的动态交互，就是实现DOM操作，所以决定了他一定要单线程，否则就出现线程同步问题，如：一个线程修改一个DOM，一个线程把这个DOM删除，浏览器不知道以哪个线程为准

// 单线程：js执行环境中负责执行代码的线程只有一个，如：一个人执行任务，如果有多个任务就要排队一次执行
// 优点：安全 简单，
// 缺点：如果是比较耗时的任务，后面的任务都必须等待任务的结束，导致程序拖延，出现假死情况

// 为了解决耗时任务阻塞执行，javascript把任务执行模式分为两种：同步模式（Synchronous）和异步模式(Asynchronous)
console.log('foo');
for (let i = 0; i < 10000; i++) {
    console.log('耗时任务');
}
console.log('等待耗时结束');
