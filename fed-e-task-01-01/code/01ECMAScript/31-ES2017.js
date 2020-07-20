// ECMAScript2017

const obj = {
    foo: 'value1',
    bar: 'value2'
}

// Object.values    返回对象的所有的值
console.log(Object.values(obj));

// =============================================================================

// Object.entries   以数组的形式返回对象中所有的键值对
console.log(Object.entries(obj));
for (const [key, value] of Object.entries(obj)) {
    console.log(key, value)
}

console.log(new Map(Object.entries(obj)));

// =============================================================================

// Object.getOwnPropertyDescriptors     用来获取一个对象的所有自身属性的描述符
const p1 = {
    firstName: 'Yan',
    lastName: 'Zeng',
    get fullName() {
        return this.firstName + ' ' + this.lastName
    }
}
console.log(p1.fullName);

const p2 = Object.assign({}, p1)
p2.firstName = 'zce'
// 输出 Yan Zeng，拿到的是p1的firstName，因为Object.assign()复制时把firstName当做一个普通的属性复制
console.log(p2.fullName)

const descriptors = Object.getOwnPropertyDescriptors(p1)
// console.log('descriptors', descriptors);
// defineProperties直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
const p3 = Object.defineProperties({}, descriptors)
p3.firstName = 'zce'
console.log(p3.fullName);

// =============================================================================

// String.prototype.padStart、String.prototype.padEnd
// 字符串填充方法
const books = {
    html: 5,
    css: 17,
    javascript: 129
}
for (const [name, count] of Object.entries(books)) {
    console.log(name, count)
}

for (const [name, count] of Object.entries(books)) {
    console.log(`${name.padEnd(16, '-')}|${count.toString().padStart(3, '0')}`)
}

// ================================================================================

// 在函数参数中添加尾逗号
function foo(baz, foo, ) { }


// ================================================================================
// async/await 是Promise的语法糖