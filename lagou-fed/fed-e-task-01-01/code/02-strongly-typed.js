// 强类型优势

// 1、错误更早暴露，如：类型异常
// 2、代码跟智能，编码更准确
// 3、重构更牢靠
// 4、减少不必要的类型判断

function render(element) {
  element.className = 'container'
  element.innerHTML = 'hello world'
}

// ==========================================
const util = {
  aaa: () => {
    console.log('util func')
  }
}

// ==========================================
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('arguments must be a number')
  }
  return a + b
}
