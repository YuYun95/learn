// Iterable 迭代器

// 实现Iterable接口就是 for...of的前提
// 所有可以被for...of遍历的数据类型，都必须实现iterable接口
// 内部必须挂载一个Iterable方法，这个方法需要返回带有next方法的对象，调用next方法就可以实现对数据的遍历

// for...of 执行原理
// 1、调用原型对象上的[Symbol.iterator]()方法，返回数组的迭代器对象，该对象原型对象上存在一个next方法
// 2、调用next方法，返回一个对象，对象有两个成员value 和 done，value的值为遍历对象的值，done值为布尔，代表是否遍历完
// 3、所以迭代器维护着一个数据指针，每代用一次next，指针都往后移一位

const set = new Set(['foo', 'bar', 'baz'])
const iterable = set[Symbol.iterator]()
console.log(iterable.next());
console.log(iterable.next());
console.log(iterable.next());
console.log(iterable.next());