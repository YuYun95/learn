var fn1 = function() {
  this.foo = function() {
    console.log(1111)
  }
}

let f1 = new fn1()

// ===========================================
var fn2 = function() {}

fn2.prototype.foo = function() { // 性能较高
  console.log(111)
}

let f2 = new fn2()

