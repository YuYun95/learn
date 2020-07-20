// 实现可迭代接口（iterable）

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

const obj1 = {
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
for (const item of obj1) { // 没报错，说明实现了迭代接口
    console.log(item)
}