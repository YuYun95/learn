// for 循环优化

var arrList = []
arrList[10000] = 'icoder'

for (var i = 0; i < arrList.length; i++) {
  console.log(arrList[i])
}

// 优化
for (var i = arrList.length; i; i--) {
  console.log(arrList[i])
}
// 或者
var len = arrList.length
for (var i = 0; i < len; i++) {
  console.log(arrList[i])
}
