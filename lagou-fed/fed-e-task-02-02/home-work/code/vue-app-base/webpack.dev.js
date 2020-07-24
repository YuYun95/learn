const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common')

const port = 3000

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: port,
    open: true,
    contentBase: './public' // 额外为开发服务器指定查找资源目录
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
