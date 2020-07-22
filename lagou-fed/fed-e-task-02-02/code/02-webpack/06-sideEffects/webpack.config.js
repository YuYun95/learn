module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: "bundle.js"
  },
  // 集中配置webpack内部优化功能
  optimization: {
    sideEffects: true, // 自动开启
    // usedExports: true, // 模块只导出被使用了的成员
    // concatenateModules: true, // 尽可能合并每一个模块到一个函数中
    // minimize: true // 压缩输出结果
  }
}
