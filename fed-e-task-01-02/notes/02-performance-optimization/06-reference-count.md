### 引用计数算法
* 核心思想：设置引用数，判断当前引用数是否为0
* 引用计数器
* 引用关系改变时修改引用数字（对象被引用时数字就加一，多少个引用就加多少，减少就减一）
* 引用数字为0时立即回收

### 引用计算算法优缺点
* 优点
    * 发现垃圾时立即回收
    * 最大限度减少查询暂停（时刻监控变量保证内存不被占满）
* 缺点
    * 无法回收循环引用的对象
    * 时间开销大（当前引用计算要维护一个数值的变化，所以要监控当前对象的引用数值是否要修改，这个数值的修改本身需要时间，如果有更多的对象要修改，那么这个时间就要更多）
        ```javascript
            // 对象互相引用
            function fn() {
              const obj1 = {}
              const obj2 = {}
              
              // obj1 和 obj2 相互引用，所以 obj1 和 obj2 的引用计数不是 0 内存不会被回收
              obj1.name = obj2
              obj2.name = obj1
              return 'lg a coder'
            }
            
            fn()
        ```