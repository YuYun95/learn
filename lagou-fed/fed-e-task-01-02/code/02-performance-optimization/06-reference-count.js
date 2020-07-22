// reference count

const user1 = { age: 11 }
const user2 = { age: 22 }
const user3 = { age: 33 }

const nameList = [user1.age, user2.age, user3.age]

function fn() {
  const num1 = 1
  const num2 = 2
}

fn()

// 函数执行完后，num1和num2从全局出发再也找不到，那么引用计数就回到0，GC立即工作

function fn1() {
  const obj1 = {}
  const obj2 = {}

  obj1.name = obj2
  obj2.name = obj1
  return 'lg a coder'
}

fn1()
