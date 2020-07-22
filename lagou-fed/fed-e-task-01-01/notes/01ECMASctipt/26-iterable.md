## 实现可迭代接口--iterable
```javascript
const obj = { // 实现了可迭代接口Iterable，约定内部必须有一个用于返回迭代器的iterator方法
    [Symbol.iterator]: function () {
        return { // 实现了迭代器接口iterator，约定内部必须有一个用于迭代的next方法
            next: function () {
                return { // 迭代结果接口IterationResult，约定对象内部必须有value属性，表示当前被迭代的数据，值是任意类型；和一个done属性，值是布尔值，表示迭代有没有结束
                    value: 'tom',
                    done: true
                }
            }
        }
    }
}
```

for...of 执行原理
* 调用原型对象上的`[Symbol.iterator]()`方法，返回数组的迭代器对象，该对象原型对象上存在一个next方法

* 调用next方法，返回一个对象，对象有两个成员value 和 done，value的值为遍历对象的值，done值为布尔，代表是否遍历完

* 所以迭代器维护着一个数据指针，每代用一次next，指针都往后移一位
```javascript
const obj = {
    store: ['foo', 'bar', 'baz'],
    [Symbol.iterator]: function () {
        let index = 0
        const self = this
        return {
            next: function () {
                const result = {
                    value: self.store[index],
                    done: index >= self.store.length
                }
                index++
                return result
            }
        }
    }
}
for (const item of obj) { // 没报错，说明实现了迭代接口
    console.log(item)
}
```
