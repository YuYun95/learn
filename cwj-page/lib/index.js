const path = require('path')
const cwd = process.cwd()
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(process.cwd());
let config = {
  mode: 'none',
  entry:"./src/index.js",
  output:{
      path:path.resolve(process.cwd(),"dist"),
      filename:"build.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: cwd + '/src/index.html'
    })
  ]
}

// 判断当前目录下是否有约定的配置文件
let cf = fs.existsSync(`${cwd}/page.config.js`)

if (cf) {
  try {
    const loadconfig = require(`${cwd}/page.config.js`)
    config = Object.assign({}, config, loadconfig)
  } catch (e) {
    console.log(e)
  }
} else {
  // 没有约定的配置文件
  config = Object.assign({}, config)
}

module.exports = config
