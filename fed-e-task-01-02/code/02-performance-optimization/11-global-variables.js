// 慎用全局变量

// 测试代码片段网站 https://jsperf.com/

var i, str = ''

for(i = 0; i < 1000; i++) {
  str += i
}

for(let i = 0; i < 1000; i++) {
  let str = ''
  str += i
}
