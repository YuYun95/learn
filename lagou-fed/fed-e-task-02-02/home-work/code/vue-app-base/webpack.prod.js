const merge = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'nosources-source-map',
  optimization: {
    minimizer: [ // 自定义压缩插件会覆盖webpack内部的压缩插件
      new OptimizeCssAssetsWebpackPlugin(), // 压缩提取的css
      new TerserWebpackPlugin() // 压缩js
    ]
  },
  externals: {
    jquery: 'window.$'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: ['public', 'src/assets'] }),
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin() // 查看打包报告
  ]
})
