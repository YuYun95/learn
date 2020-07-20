## Flow
使用flow步骤
1. 安装flow-bin、执行 yarn/npm flow init
2. 需要类型检查的文件中，顶部添加 '@flow'标记
3. 代码中添加类型注释，即 冒号后面跟一个类型
```javascript
// @flow
function sum(a: number, b: number) {
  return a + b
}

sum(100, 100)
sum('100', '100')
```
