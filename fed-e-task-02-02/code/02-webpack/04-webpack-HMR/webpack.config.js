const webpack = require('webpack')
const HtmpWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.js'
  },
  devtool: 'source-map',
  devServer: { // hot 会刷新浏览器，报错信息会被刷走；hotOnly不会刷新浏览器，可以把错误信息输出
    // hot: true
    hotOnly: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use:'file-loader'
      }
    ]
  },
  plugins: [
    new HtmpWebpackPlugin({
      title: 'Webpack App',
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
