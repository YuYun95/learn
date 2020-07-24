const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin')

const appName = require('./package').name

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode: 'none',
  entry: path.join(__dirname, './src/main.js'),
  output: {
    filename: 'chunk-[name].[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            // 当 Vue Loader 编译单文件组件中的 <template> 块时
            // 它也会将所有遇到的资源 URL 转换为 webpack 模块请求。
            transformAssetUrls: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: ['xlink:href', 'href'],
              use: ['xlink:href', 'href']
            }
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /mode_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取css 通过 link 标签引入
          // 'style-loader',
          'css-loader'
        ]
      },
      {
        // less 文件配置
        test: /\.less/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      },
      {
        // 图片配置
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 10,
            esModule: false
          }
        }
      },
      {
        // 字体图标配置
        test: /\.(eot|svg|ttf|woff2|woff|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 10
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'chunk-[name].[hash:8].css'
    }),
    // 将定义过的其它规则复制并应用到 .vue 文件里相应语言的块
    // 例如，如果有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: appName,
      inject: 'body', // js资源在body底部导入
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      BASE_URL: '"./"' // 为代码注入全局成员
    }),
    new webpack.ProvidePlugin({
      _: 'lodash', // 全局依然lodash，不需要每个文件import
      _concat: ['lodash', 'concat'], // 单独引入某个方法
      _indexOf: ['lodash', 'indexOf']
    }),
    new StyleLintWebpackPlugin({
      // 样式检查
      files: ['src/**/*.{vue,html,css,less}']
    })
  ]
}
