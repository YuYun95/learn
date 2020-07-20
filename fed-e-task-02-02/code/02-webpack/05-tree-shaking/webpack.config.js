module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                // modules：默认值是auto 根据环境判断是否开启ESM
                ['@babel/preset-env', { modules: 'commonjs' }] // 强制使用babel ESM，把ESM转为commonjs
            ]
          }
        }
      }
    ]
  },
  // 集中配置webpack内部优化功能
  optimization: {
    usedExports: true, // 模块只导出被使用了的成员
    // concatenateModules: true, // 尽可能合并每一个模块到一个函数中
    // minimize: true // 压缩输出结果
  }
}
