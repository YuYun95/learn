// 迭代器设计模式

// 场景一：协同开发一个任务清单

// 我的代码=========================
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语'],
    work: ['喝茶'],
}

// 你的代码==========================
for (const item of todos.life) {
    console.log(item);
}
for (const item of todos.learn) {
    console.log(item);
}
for (const item of todos.work) {
    console.log(item);
}

// ====================================================
// 我的代码=========================
const todos1 = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语'],
    work: ['喝茶'],

    each: function (callback) {
        const all = [].concat(this.life, this.learn, this.work)
        for (const item of all) {
            callback(item)
        }
    }
}
// 你的代码==========================
todos1.each(function (item) {
    console.log(item)
})

// ====================================================

// 我的代码=========================
const todos2 = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语'],
    work: ['喝茶'],

    each: function (callback) {
        const all = [].concat(this.life, this.learn, this.work)
        for (const item of all) {
            callback(item)
        }
    },
    [Symbol.iterator]: function () {
        const all = [...this.life, ...this.learn, ...this.work]
        let index = 0
        return {
            next: function () {
                return {
                    value: all[index],
                    done: index++ >= all.length
                }
            }
        }
    }
}
// 你的代码==========================
todos2.each(function (item) {
    console.log(item)
})
console.log('=============')
for (const item of todos2) {
    console.log(item)
}