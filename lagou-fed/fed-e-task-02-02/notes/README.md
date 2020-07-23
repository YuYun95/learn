## 一、模块化开发

### Commonjs规范
* Commonjs是以同步模式加载模块
* 一个文件就是一个模块
* 每个模块都有单独的作用域
* 通过module.exports导出成员
* 通过require函数载入模块

### ES Module 特性
通过给 script 添加 type = module 的属性，就可以以 ES Module 的标准执行其中的 js 代码了
* 自动采用严格模式，忽略‘use strict’
* 每个ES Module 模块都是单独的私有作用域
* ES Module 是通过 CORS 去请求外部 js 模块的，服务器要支持 CORS
* ES Module 的 script 标签会延迟执行脚本（页面渲染完在执行脚本）

### ES Module 导出
* 导出
    * 导出成员使用export修饰成员声明的方式，如：`export var name = 'yan; exprot var age = 18'`
    * export可以单独使用，如:`var name = 'yan'; var age = 18; export { name, age }`
    * 使用 as 给导出的成员重命名，导入时就要使用重命名后的变量名，如：`var name = 'yan'; exprot { name as firstName }`
    * 如果重命名为 default 那这个成员就会做为当前模块默认导出的成员
    * 在导入这个成员就必须要给这个成员重命名，default是一个关键词不能作为一个变量使用
* 导入
    * 导入使用import导入，如：`import { name } from './module.js'`，name为导出的变量名
    * 导入默认导出传成员可以不使用花括号，变量名可以根据需要随便取，如：`import name from './module.js'`
    * 如果导入的变量名为default，需要使用as重命名，如：`import { default as firstName } from './module.js'`

### ES Modules 导入导出的注意事项
* `export { name, age }` 该写法不是对象字面量的，如果要对象字面量的写法应该是：`export default { name, age }`，这样花括号会被理解为对象
* `import {} from './module.js'`，花括号不是解构
* 导出成员时，导出的是这个成员的引用，导出的变量是只读的（在导入的文件中无法改变变量的值），如，在导出成员的文件中在一秒后改变变量的值，在导入变量的文件中两秒后输出变量值，输出的结果是改变后的值
```javascript
export var a = 1;
setTimeout(() => {
  a = 2
},1000);

import { a } from './module.js'
// a = 22 // 报错，Assignment to constant variable
setTimeout(() => {
  console.log(a) // 2
},2000)
```

### ES Modules 导入用法
* import 必须使用完整的路径不能省略扩展名，即使是引入index也要完整的路径不能省略index
* import 可以使用完整的url加载模块 `import { name } from 'https://xxx.com/xxx.js'`
* 相对路径，在网页引用资源是可以省略‘./’的，但是import不可以省略，如果省略了就是以字母开头 ES Module 会以为在加载第三方模块，可以使用绝对路径和完整的url
* 如果想要执行某个模块而不用提取模块成员，花括号为空即可，这是就只会执行这个模块，不会提出成员，如：`import {} from './module.js'`，简写：`import './module.js'`
* 如果模块导出的成员特别多，而导入的都用到，可以使用星号‘*’，把这个模块的成员全部导入，在通过as将导入的成员全部放到一个对象中,导出的成员都会作为这个对象的属性，如：`import * as mod from './module.js'`
* 动态导入模块，不可以通过判断使用`if (true){import {name} from './module.js'}`，如果需要动态导入，可以使用import函数`import('./module.js')`，import函数返回的是一个promise
* 如果模块同时导出默认成员和命名成员，在导入时可以给默认成员重命名`import { name, default as age } from './module.js'`，也可以`import age(默认成员), { name } from './module.js'`

### ES Modules 导出导入成员
* import可以配合export使用，效果就是将导入的结果直接作为当前模块的导出成员，那么在当前作用域就不能访问这些成员，如：`export { name, age } from './module'`，利用这种特性可以把散落的模块组织在一起，如，一个index把零散的模块组织一起，然后再导出
```javascript
// button.js
var Button = 'Button Component'
export default Button
// avatar.js
export var Avatar = 'Avatar Component'
// index.mjs
export { default as Button } from './button.js'
export { Avatar } from './avatar.js'
// app.js
import {Button, Avatar} from './index.mjs'
```

### ES Modules 浏览器环境 Polyfill
* 在不支持ES Module的浏览器中，可以使用browser-es-module-loader第三方库，在执行的时候解析
* 但是在支持ES Module的浏览器中，这样会执行两次，可以添加script标签的新属性nomodule
* nomodule:在不支持ES Module的浏览器工作
```html
<script nomodule src="https://unpkg.com/promise-polyfill@8.1.3/dist/polyfill.min.js"></script>
<script nomodule src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/babel-browser-build.js"></script>
<script nomodule src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js"></script>
```

### ES Modules in Node.js - 支持情况
* 在node中使用ES Module 文件后缀名为‘mjs’
* 执行 `node --experimental-modules 文件`，experimental-modules：启用ES Module实验特性
* 可以通过import导入原生的模块和第三方模块`import fs from 'fs'; import _ form 'loadsh'`
* `import { camelCase } from 'lodash'`，不支持，因为第三方模块都是导出默认成员；内置模块兼容了 ES Module 的提取成员方式，所以`import { writeFileSync } from 'fs'`支持

### ES Modules in Node.js - 与 CommonJS 交互
* ES Module中可以导入 Commonjs模块
* Commonjs中不能导入 ES Module模块
* Commonjs始终只会导出一个默认成员
* 注意import不是解构导出对象

### ES Modules in Node.js - 与 CommonJS 的差异
* ES Module 中没有Commonjs 中的那些模块全局成员（require/module/exports/__filename/__dirname）
* Commonjs 中require/module/exports 在 ES Module中使用import和export替代，__filename 和 __dirname 可以通过import.meta.url 可以拿到当前工作文件的文件url地址，可以使用原生的url模块的fileURLToPath()方法可以把文件url转换为路径
 ```javascript
import { fileURLToPath } from 'url'
import {dirname} from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
```

### ES Modules in Node.js - 新版本进一步支持
* 在package.json 文件添加type字段值为module，此时文件扩展名可以用js，而不需要mjs
* 此时想要使用Commonjs规范，那么文件后缀名要改为cjs

### ES Modules in Node.js - Babel 兼容方案
* 安装babel相关依赖 `yarn add @babel/node @babel/core @babel/preset-env` babel工作依赖插件，preset是一个插件集合
* 执行 `yarn babel-node index.js(想要转换的文件) --presets=@babel/preset-env`
* 或者添加一个.babelrc 文件
```json
{
  "presets": ["@babel/preset-env"]
}
```
## 二、Webpack 打包

### 模块打包工具的由来
* ES Module 存在环境兼容问题
* 模块文件过多，网络请求频繁
* 所有的前端资源都需要模块化

### Webpack 配置文件
* webpack默认以src/index.js 为入口文件
* 在项目的根目录添加‘webpack.config.js’文件，可以自定义相应的配置，该文件是运行在nodejs环境中
* 该文件导出一个对象，通过导出对象的属性就可以完成相应的配置选项
* entry属性：webpack打包入口文件的路径，如果是相对路径‘./’不能省略
* output属性：webpack打包输出的位置，值要求是一个对象，通过对象的filename属性指定输出的文件名，path属性指定输出的目录(绝对路径)

###  Webpack 工作模式
* 在webpack.config.js文件对象中添加mode属性
* mode默认值是production，mode可选值有production、development、none
* production：自动启动优化，会把代码压缩加密
* development：会自动优化打包速度，添加一些调式过程中的辅助
* none：运行最原始的打包，不做额外的处理

### Webpack 资源模块加载
* webpack内容默认只会处理javascript文件
* 处理其他类型的文件要安装使用对角的loader（加载器）
* 使用loader，在webpack.config.js导出的对象中的module属性，添加一个rules数组
* rules数组就是针对加载其他资源模块的规则配置
* 每个规则对象要设置两个属性，test：正则表达式，匹配打包过程中遇到的文件；use：匹配到的文件使用的loader，use的值可以是单个loader字符串也可以是一个数组loader，**如果是一个数组，会从右往左执行**
* css-loader的作用就是将css文件转换为一个js模块；具体实现就是将css代码push到一个数组中
* style-loader的作用就是将css-loader转换后的结果通过style标签追加到页面上
* loader 是 webpack 的核心特性
* 借助不同的loader就可以加载任何类型的资源

### Webpack 文件资源加载器
* 安装依赖 `yarn add file-loader`
* 在配置文件中添加rules `{ test: /.png$/, use: 'file-loader' }`
* webpack 默认所有打包的结果放在网站根目录；为项目中的所有资源指定一个基础路径，在output中添加 publicPath 属性，默认值为空表示网站的根目录
* 把 publicPath 值修改为 'dist/' 注意“/”不能省略，打包后是一个变量名（publicPath值）拼接资源名（资源名前面没有“/”）所有“/”不能省略

### Webpack URL 加载器
* Data URLS格式：data(协议):[mediatype(媒体类型和编码)][;base64],<data>
* 安装插件 `yarn add url-loader --dev`
* 在配置文件中添加rules
```javascript
module.exports = {
  module:{
    use: [
      {
        test: /.png$/,
        use: {
          loader: 'url-loader',
          option: {
            limit: 10 * 1024 // 对于小于10kb的png图片使用url-loader打包；而大于10kb的会使用file-loader打包
          }
        }
      }
    ]
  }
}
```
* 打包后，图片将是以base64的格式显示

最佳实践
* 小文件使用Data URLs，减少请求次数
* 大文件单独提取存放，提高加载速度

### Webpack 常用加载器分类
* 编译转换类：会把加载的资源转为js代码
* 文件操作类：会把加载的资源拷贝到输出的目录，导出文件访问路径
* 代码检查类：目的是统一代码风格

### Webpack 与 ES 2015
* 安装babel-loader @babel/core @babel/preset-env
* 在配置文件中module rules添加
```javascript
module.exports = {
  module:{
    rules:[
      {
          test: /.js$/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env']
              }
          }
      }
    ]
  }
}
```

### Webpack 加载资源的方式
* 遵循ES Modules 标准的import声明
* 遵循 Commonjs 标准的require函数
* 遵循AMD 标准的define函数和require函数
* Loader加载器的非JavaScript也会触发资源加载
    * 样式代码中的@import指令和url函数
    * HTML代码中图片标签的src属性
    
###　Webpack 核心工作原理
* webpack 会根据配置找到打包入口文件，然后顺着入口文件的代码
* 根据代码中的import或者require解析推断这个文件依赖的资源模块
* 然后分别解析每个资源模块对应的依赖，形成整个项目中所有用到文件之间的依赖关系的依赖树
* webpack递归依赖树，找到每个节点对于的资源文件
* 根据配置文件中的rules属性找到模块对应的加载器，找到对于的资源放在打包结果中，实现整个项目的打包

### Webpack 开发一个 Loader
* loader 负责资源文件从输入到输出的转换
* 对于同一个资源可以依次使用多个loader （css-loader -> style-loader）
* loader模块导出一个函数；该函数输入的是加载到的资源文件内容；函数体是处理内容的过程；输出的是经过处理过的资源文件内容结果，结果必须是javascript代码

```javascript
// main.js
import about from './about.md'

console.log(about);

// markdown-loader.js
const marked = require('marked')

module.exports = source => { // source接受输入
    // console.log(source);
    // return 'hello';

    // 方法一
    const html = marked(source)
    // return `module.exports = ${JSON.stringify(html)}`

    // 方法二 返回 html 字符串交给下一个 loader处理 (html-loader)
    return html
}

// webpack.config.js
module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output:{
        filename:'bundle.js',
        path: path.join(__dirname,'dist'),
        publicPath: 'dist/'
    },
    module:{
        rules:[
            {
                test: /.md$/,
                use: [
                    'html-loader',
                    './markdown-loader'
                ]
            }
        ]
    }
}
```


### Webpack 插件机制介绍
* 增强webpack自动化能力
* loader专注实现资源模块加载
* plugin 解决其他自动化工作
  * 清除dist目录
  * 拷贝静态文件至输出目录
  * 压缩输出代码

### Webpack 自动清除输出目录插件
* 安装插件 `yarn add clean-webpack-plugin --dev`
* 配置文件中导入插件
* 在配置对象中 plugins 属性，该属性是专门配置插件的地方，属性值是一个数组
```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

### Webpack 自动生成HTML插件
* 安装插件 `yarn add html-webpack-plugin --dev`
* 在配置文件中导入插件
* 在配置对象中 plugins 属性，该属性是专门配置插件的地方，属性值是一个数组
* 同时输出多个页面文件，可以再通过HtmlWebpackPlugin创建额外的html文件,通过filename指定文件名
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    // 用于生成 index.html
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample', // html文件的title
      meta: {
        viewport: 'width=device-width' // 设置meta的viewport
      },
      template: './src/index.html' // 模版
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html'
    })
  ]
}

// index.html
// ....
// <h1><%= htmlWebpackPlugin.options.title %></h1>
```

###　Webpack 插件使用总结
* 安装插件 `yarn add copy-webpack-plugin --dev`

### Webpack 开发一个插件
* 相比于loader，plugin拥有更宽的能力范围
* plugin 通过钩子机制实现
* 插件必须是一个函数或者是一个包含apply方法的对象
* 通过在生命周期的钩子中挂载函数实现扩展
```javascript
class MyPlugin { // 目标 删除bundle.js中的注释
  apply(compiler) { // 会自动执行
    console.log('my plugin 启动');
    // https://webpack.js.org/api/compiler-hooks/
    // emit钩子：即将输出文件时执行
    // 参数一：插件名 参数二、挂载到钩子上的函数
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {// assets:资源文件
        // console.log(name); // 文件名
        // console.log(compilation.assets[name].source());//文件内容
        if (name.endsWith('.js')) {// 判断是js文件
          const contents = compilation.assets[name].source() // 文件内容
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '') // 全局替换注释
          compilation.assets[name] = { // 覆盖原有内容
            source: () => withoutComments, // 返回新的内容
            size: () => withoutComments.length // 返回内容的大小 webpack内部规定必须
          }
        }
      }
    })
  }
}
```

### Webpack Dev Server 静态资源访问
* Dev Server默认只会serve打包输出文件
* 只要是webpack打包输出的文件都可以直接被访问
```javascript
devServer: {
  // 额外开发服务指定静态资源路径，可以是字符串或数组
  contentBase: './public'
}
```

### Webpack Dev Server 代理 API
```javascript
module.exports = {
devServer: {
    proxy: {
      // 前缀
      '/api': {
        // http://localhost:8080/api/users => https://api.github.com/api/users
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' // 去除 /api
        },
        // 不能使用 localhost:8080 作为请求github的主机名
        changeOrigin: true
      }
    }
  }
}
```

### Source Map 介绍
* 调试和报错都是基于运行代码
* source map映射转换后代码和源代码关系，通过source map逆向解析
* 解决源代码与运行代码不一致所产生的调试问题

### Webpack 配置 Source Map
在配置项添加 `devtool: 'source-map'`

### Webpack eval 模式的 Source Map

![](devtool.png)

* eval 是否使用 eval 执行模块代码，带eval，用eval执行模块代码
* cheap-source map 是否包含行信息
* module 是否能够得到Loader处理之前的源代码
* 带module的模式下解析的出来的原代码是没有经过loader加工，手写的源代码
* 不带module是loader加工过后的代码
* inline-source-map：source map 是因dataURL嵌入代码，其他的source map是以物理文件存在
* hidden-source-map：开发工具看不到source map效果 在开发第三方包比较有用

###  Webpack 选择 Source Map 模式
* 开发模式
  * cheap-module-eval-source-map：代码每行不会超过80个字符；代码进过loader转换后差异较大需要module模式（loader处理前的源代码）；首次打包速度慢无所谓，重写打包相对较快
* 生成模式
  * none或nosources-source-map：Source Map 会暴露源代码

### Webpack HMR 体验（热更新）
* 应用运行过程中实时替换某个模块，应用运行状态不受影响
* HMR集成在webpack-dev-server中
* 开启HMR
  * css样式（经过loader处理的）可以热更新但是js还是会刷新浏览器，webpack 中的HMR不可以开箱即用
  * webpack中的HMR需要手动处理模块热替换逻辑
```javascript
const webpack = require('webpack')
module.exports = {
    devServer: {
      hot: true
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin()
    ]
}
```

### Webpack 使用 HMR API


### Webpack 处理 JS 模块热替换
js 热更新：保存旧数据，代码发生变化后把数据回填
```javascript
let lastEditor = editor
module.hot.accept('./editor', () => {
  // console.log('editor HMR')
  // console.log(createEditor)
  const value = lastEditor.innerHTML
  document.removeChild(editor)
  const newEditor = createEditor()
  newEditor.innerHTML = value
  document.body.appendChild(newEditor)
  lastEditor = newEditor
})

// 图片热更新
module.hot.accept('./better.png', () => {
  img.src = background
  console.log(background)
})
```

### HMR 注意事项
* 如果没有开启热更新，但是js代码做了热更新处理，先做判断 `if (module.hot){// 热更新逻辑}`
* hot 会刷新浏览器，报错信息会被刷走；hotOnly不会刷新浏览器，可以把错误信息输出
* 打包后会自动去除js热更新逻辑代码

#  Webpack 生产环境优化
* mode：none、production、development
* 为不同的工作环境创建不同的配置

### Webpack 不同环境下的配置
* 配置文件根据环境不同导出不同的配置
    * webpack可以导出一个函数，函数返回配置
```javascript
// 参数一：cli传递的环境名参数；参数二：运行cli传递的所有参数
module.exports = (env, argv) => {
  const config = { 
    //...
  }
  if (env === 'production') {
    // ...
  }
}
// 执行 yarn webpack --env production
```
* 一个环境对应一个配置文件
    * webpack.common.js 存放公共配置
    * webpack.dev.js 开发配置，把公共配置和开发配置合并（使用loadsh merge）
    * webpack.prod.js 生产环境，把公共配置和生产配置合并（使用loadsh merge）
    * 执行 yarn webpack --config webpack.dev.js
    * 或者在scripts中添加命令 `"build": "webpack --config webpack.dev.js"`

### Webpack DefinePlugin
* DefinePlugin 为代码注入全局成员
* 接收的是一个对象，每一个键值都会注入到代码中
* 文件代码中直接使用键，打包后把注入的值 直接替换到代码中，definePlugin传递的字符串应该是代码
```javascript
const webpack = require('webpack')
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      // 想要输出的是字符串要个引号，否则输出的不是字符串
      // 输出值可以使用JSON.stringify('https://api.github.com')
      API_BASE_URL: '"https://api.github.com"'
    })
  ]
}
// ==
console.log(API_BASE_URL)
```

###  Webpack 体验 Tree Shaking
* 在生成模式下自动开启，对于冗余、未引用代码不会打包
* 不是指某个配置选项，是一组功能搭配使用后的优化效果
```javascript
// webpack 使用 Tree Shaking
module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: "bundle.js"
  },
  // 集中配置webpack内部优化功能
  optimization: {
    usedExports: true, // 只到处外部使用了的成员 （相当于标记没使用的代码）
    minimize: true // 开启webpack代码压缩  会把外部没使用的代码去除
  }
}
```

###　Webpack 合并模块---concatenateModules
* 尽可能的将所有模块合并输出到一个函数中
* 提升运行效率，减少代码体积
```javascript
module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: "bundle.js"
  },
  // 集中配置webpack内部优化功能
  optimization: {
    concatenateModules: true, // 打包后把所有的模块放在同一个函数中；
  }
}
```

### Webpack Tree Shaking 与 Babel
* babel和tree shaking同时使用会导致tree shaking失效
    * tree shaking前提是 ES Modules，由webpack打包的代码必须使用ESM
    * babel-loader转换代码时可能会把ES Modules 转为 CommonJS
新版的babel-loader不会导致tree shaking失效，
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
               // modules：默认值是auto 根据环境判断是否开启ESM，可以设为false
               ['@babel/preset-env', { modules: 'commonjs' }] // 强制使用babel ESM，把ESM转为commonjs
            ]
          }
        }
      }
    ]
  }
}
```

### Webpack sideEffects
* 允许通过配置方式标识代码是否有副作用（模块执行时除了导出成员之外所做的事情）
* 一般用于开发npm包时 标记是否有副作用
* 生产模式自动开启 会检查当前代码所属的package.json有没有sideEffects标识，以此来判断这个模块是否有副作用
* 如果这个模块没有副作用，那些没有用到的模块不会被打包
* package.json添加 `sideEffects: false` 表示package.json所影响的项目当中所有的代码都没有副作用
```javascript
optimization: {
  sideEffects: true
}
```

### Webpack sideEffects 注意
* 使用 sideEffects 前提确保代码真的没有副作用，否则webpack再打报时会误删有副作用的代码
* 如在Number原型添加方法然后载入、载入css也是
```javascript
// extend.js
// 为Number的原型添加一个扩展方法
// 副作用代码 在package.json声明没有副作用，在打包时会被去除
Number.prototype.pad = function(size) {
  let result = this + ''
  while(result.length < size) {
    result = '0' + result
  }
  return result
}

// index.js
import './extend.js'
console.log(8.pad(3))
```
* 解决：在package.json 关闭副作用、标识哪些文件有副作用
```javascript
// package.json
"sideEffects": [ // 标识有副作用的文件
  './src/extends.js',
  '*.css'
]
```

### Webpack 代码分割
* 所有代码最终都被打包到一起，打包文件体积过大
* 分包，按需加载
* 多入口打包
* 动态导入

### Webpack 多入口打包
* 多页应用程序，一个页面对应一个打包入口，公共部分单独提取
* 多个入口可以把entry定义为对象，一个属性就是一个入口，键就是入口名，值就是入口对应的文件路径
* 多入口，输出也要多个，可以给filename的值添加 `[name]`占位 `outpur:{filename: '[name].bundle.js'}` 这样 `[name]`就会被替换为入口名称
* plugins中的 HtmlWebpackPlugin 插件会自动输入注入所以打包结果的html，所以此时入口文件会注入所有的打包结果
* 可以给 HtmlWebpackPlugin 插件配置注入的打包文件 `new HtmlWebpackPlugin({chunks:['index']}), new HtmlWebpackPlugin({chunks:['album']})`
```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'none',
  entry: {
    index: './src/index.js',
    album: './src/album.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/album.html',
      filename: 'album.html',
      chunks: ['album']
    })
  ]
}

```

### Webpack 提取公共模块
```javascript
module.exports = {
  optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: 'all'
    }
  },
}
```

### Webpack 动态导入
* 需要用到某个模块时，再加载这个模块
* 动态导入的模块会被自动分包
* 一般我们都是在文件头直接import文件的，这会造成资源浪费
* 可以使用ES Modules的import()在需要导入的地方导入模块，该方法返回的是promise 可以拿到导出的对象
```javascript
if(true){
  import('./posts').then(({ default: posts }) => {
    
  })
}
```

### Webpack 魔法注释
* 在import()方法中添加特定的注释 `import(/* webpackChunkName: 'posts' */ './posts')` 这样在打包后文件名就会带上这个 webpackChunkName 值
* 如果 webpackChunkName 相同，打包后会打包在一起

### Webpack MiniCssExtractPlugin---提取css到单独文件
* 安装插件 `yarn add mini-css-extract-plugin --dev`
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 将样式通过 style 标签注入
          MiniCssExtractPlugin.loader, // 通过 link 标签注入
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}
```

### Webpack OptimizeCssAssetsWebpackPlugin--- 压缩css
* 安装插件 `yarn add optimize-css-assets-webpack-plugin --dev`
* 如果配置在plugins中这个插件在任何情况都会正常工作
* 配置在minimizer中 只有minimizer开启（生产环境自动开启）是才工作
* webpack建议压缩创建配置在minimizer中，以便通过minimizer选项统一控制
* 当minimizer使用一个数组，webpack认为我们要自定义所使用的压缩器插件，webpack内部的js压缩器就会被覆盖，如果不配置js压缩器，这是打包，js代码不会被压缩
* 手动把js压缩器添加回来，安装插件 `yarn add terser-webpack-plugin --dev`

```javascript
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin()
   ]
  },
}
```

### Webpack 输出文件名 Hash
* 在部署时服务器开启静态文件缓存，如果缓存时间过长，程序发生更改，得不到更新
* 生产环境下，文件名使用Hash，文件名发生变化 对客户端而言全新的文件名就是全新的请求，就不会有缓存问题
* [hash]【占位符】：整个项目级别的，项目中有任何地方改动，这次打包的hash值都会发生变化
* [chunkhash]【占位符】：chuankhash级别，打包过程中只要是同一路的打包chunkhash都是相同的
* [contenthask]【占位符】：文件级别hash，根据文件输出内容生成hash值（不同的文件就有不同的hash值）
* 指定hash值长度[chunkhash:8]【占位符】
```javascript
module.exports = {
  output: {
    filename: '[name]-[contenthash:8].bundle.js'
  },
}
```

## Rollup打包工具

### Rollup 概述
* Rollup更小巧，仅仅是一款ESM打包器
* Rollup中并不支持类似HMR这种高级特性
* 提供一个充分利用ESM各项特性的高效打包器

### Rollup 快速上手
* 安装 `yarn add rollup --dev`
* 打包 `yarn rollup ./src/index.js --format iife --file dist/bundle.js` 
* 入口文件index.js，指定输出格式：--format，格式：iife（自执行函数），--file：输出到目录
* 没使用的不会打包，自动开启Tree Shaking

### Rollup 配置文件
* rollup 运行在node环境中
* 根目录新建 rollup.config.js 配置文件
* rollup会额外处理这个配置文件，所有可以使用ESM
* 配置文件导出一个对象
* 通过input属性指定打包入口
* 通过output属性指定输出，该属性值是一个对象，通过file指定输出的文件名，format属性指定输出格式
* 打包 `yarn rollup --config rollup.config.js` 通过--config告诉rollup使用配置文件，可以根据开发、生产指定对应的配置文件
```javascript
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  }
}
```

### Rollup 使用插件
* 插件是rollup唯一的扩展途径
* 安装插件 `yarn add rollup-plugin-json --dev` 一个可以在代码导入json文件的插件
```javascript
import json from 'rollup-plugin-json'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    json()
  ]
}
// index.js
// package.json 的属性会作为成员导出
import {name, version} from '../package'
console.log(name, version)
```

### Rollup 加载 NPM 模块
* 安装插件 `yarn add rollup-plugin-node-resolve --dev`
* 安装lodash的es版本 `yarn add lodash-es`
```javascript
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    json(),
    resolve()
  ]
}
// index.js
import _ from 'lodash-es'
console.log(_.camelCase('hello world'))
```

### Rollup 加载 CommonJS 模块
* 安装插件 `yarn add rollup-plugin-commonjs --dev`
```javascript
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    json(),
    resolve(),
    commonjs()
  ]
}

// cjs-module.js
module.exports = { foo:'bar' }
// index.js
import cjs from './cjs-module.js'
console.log(cjs)
```

###　Rollup 代码拆分
* 可以ESM的动态导入方式（import()）实现模块的按需加载
* rollup内部会自动处理代码拆分
* 代码拆分的方式打包 formats 不可以使用 iife（自执行函数）
* 自执行函数会把所有模块放到同一个函数中，可以使用 AMD 或者 Commonjs标准，浏览器使用AMD
* 需要输出多个文件 output 中就不能使用file属性，而是使用dis属性 值是输出目录
```javascript

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'amd'
  },
}
// index.js
import('./logger').then(({log}) => {
  log('code splitting~')
})

```

### Rollup 多入口打包
* 会把不同入口公共代码自动提取到单个文件中作为独立的bundle
* 把配置文件的 input 属性值修改为一个数组，或者使用对象的方式
* rollup内部会自动拆分 format 要使用 AMD
* AMD 文件不能直接引入，要使用特定的库去加载
```javascript
export default {
  // input: ['src/index.js', 'src/album.js']
  input: {
    foo: 'src/index.js',
    bar: 'src/album.js'
  },
  output: {
    dir: 'dist',
    format: 'amd'
  },
}
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <!-- AMD 标准格式的输出 bundle 不能直接引用 -->
  <!-- <script src="foo.js"></script> -->
  <!-- 需要 Require.js 这样的库 -->
  <!--data-main：指定require入口路径-->
  <script src="https://unpkg.com/requirejs@2.3.6/require.js" data-main="foo.js"></script>
</body>
</html>
```

###　Rollup 选用原则
* 优势
    * 输出结果更加扁平
    * 自动移除未引用的代码
    * 打包结果依然完全可读
* 缺点
    * 加载非ESM的第三方模块比较复杂
    * 模块最终都被打包到一个函数中，无法实现HMR
    * 浏览器环境中，代码拆分功能依赖AMD库
* 应用开发建议使用webpack
* 库、框架开发建议使用Rollup

## Parcel打包器
* 零配置的前端应用打包器
* 安装 `yarn add parcel-bundler --dev`
* 官方建议使用html文件作为打包入口
* 打包 `yarn parcel src/index.html` parcel 会根据导入的模块查找 从而完成整个项目的打包，会自动开启一个服务
* 模块热更新
```javascript
if (module.hot) {
  module.hot.accept(() => {
    console.log('hmr')
  })
}
```
* 会自动安装模块依赖，如文件中导入JQ，保存文件后，会自动安装模块
* 支持导入其他类型文件，而且是零配置的 `import './style.css` 保存就生效了
* 可以动态导入模块import()
* 生成环境打包 `yarn parcel build src/index.html`
* 内部使用多进程同时工作，构建速度快

## 三、规范化标准

### Eslint安装
* 安装 `npm install eslint --save-dev`
* 使用 `npx eslint --init` 初始化一个配置文件
* 执行 `npm eslint test.js --fix` --fix 会自动修正代码风格问题，而一些问题代码就需要手动修正
* 当代码有语法问题时 Eslint 无法检查问题代码和代码风格，所有要先手动解决语法问题


### ESLint 配置文件解析
```javascript
module.exports = {
  env: { // 标记代码运行环境
    browser: true,
    es2020: true
  },
  extends: [ // 继承共享配置
    'standard'
  ],
  parser: '@typescript-eslint/parser', // 语法解析器
  parserOptions: {// 设置语法解析器，检查语法，而不是代表某个成员是否可以，成员通过环境定义
    ecmaVersion: 11
  },
  rules: { // 校验规则的开启、关闭 off：关闭 warning：结果 error：警告
    'no-alert': 'error'
  },
  globals: { // 额外声明代码中可以使用的全局成员
    'jQuery': 'readonly' // 代码中可以使用jQuery而且不会报错
  }
}

```

### ESLint 配置注释
* 在编码时有时需要违反eslint规则，eslint-disable-line可以通过注释临时禁用校验规则
* 当一行有多个问题时可以跟上具体禁用哪个规则
* [具体配置注释介绍文档](http://eslint.cn/docs/user-guide/configuring#configuring-rules)
```javascript
// eslint-disable-line no-template-curly-in-string
const str = "${name} is a coder"

console.log(str)
```

### ESLint 结合自动化工具
* gulp
    * 安装 gulp-eslint
    * 创建 eslint 配置文件
```javascript
// plugins 自动加载插件模块
const script = () => {
  return src('src/assets/script/*.js', { base: 'src'})
    .pipe(plugins.eslint()) // 默认只会检查代码的问题，并不会根据检查结果做出反馈
    // 控制台打印错误信息
    .pipe(plugins.eslint.format())
    // eslint检查错误后终止任务
    .pipe(plugins.eslint.failAfterError())
    .pipe(plugins.babel({presets: ['@babel/preset-env']}))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true}))
}
```

### ESLint 结合 Webpack
* 通过loader机制完成校验
* 安装 eslint-loader
* 初始化配置文件
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          // 'eslint-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enfore: 'pre'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
```
* 在react项目中会报React未使用的问题，和App is defined but never used no-unused-vars，可以使用插件
* 安装插件 `npm install eslint-plugin-react`
* 在配置文件的plugins属性配置
```javascript
modul.exports = {
  rules: {
    'react/jsx-uses-react': 2, // 开启报错，2 代替 error
    'react/jsx-uses-vars': 2
  },
  extends: [
    // 'plugin:react/recommended' // 方法二
  ],
  plugins: [
    'react' // 模块名会去除eslint-plugin
  ]
}
```

### Stylelint 认识
* 安装 `npm install stylelint -D`
* 添加配置文件 .stylelintrc.js
* 共享配置名称要完整的模块名称
* stylelint内部没有提供任何可用的共享配置，可以自定义安装
* `npm install stylelint-config-standard -D` 对css代码检查
* `npm install stylelint-config-sass-guidelines -D` 对sass代码检查
```javascript
module.exports = {
  // 共享配置
  extends: ["stylelint-config-standard","stylelint-config-sass-guidelines"]
}
```

### Prettier 的使用---代码格式化工具
* 安装 `npm install prettier -D`
* `npm prettier style.css --write` 自动格式化文件，--write把格式化的代码覆盖源代码

### ESLint 结合 Git Hooks
* 安装依赖 `npm install husky -D`
* 在 package.json 文件添加一个 husky 字段，在 husky 添加一个hooks属性，在hooks属性添加一个pre-commit钩子属性，值为 npm run xxxx，在提交commit前就会先执行scripts下的对应命令，比如执行eslint，如果不符合规范就不能直接提交到代码仓库中
```json
// package.json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "link": "eslint ./index.js"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run link"
    }
  }
}

```
* 安装 `npm install lint-staged -D` 在commit前执行eslint后，再进行其他操作，如格式化代码
* 安装代码格式化工具 `npm install prettier -D`
* 在 package.json 中添加一个 lint-staged 字段
* 一般 husky 和 lint-staged 配合使用
```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "link": "eslint ./index.js",
    "precommit": "lint-staged"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run precommit"
    }
  },
  "lint-staged": {
    "*.js": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ]
  }
}

```
### Git提交规范
* 安装插件 `yarn add husky @commitlint/cli @commitlint/config-conventional --dev`
* husky 是一个 Git Hook 工具
* 项目根目录创建配置文件 commitlint.config.js
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'never'],
    'type-enum': [
      2, // 代表必须输入
      'always',
      [
        'docs', // Adds or alters documentation. 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
        'chore', // Other changes that don't modify src or test files. 改变构建流程、或者增加依赖库、工具等
        'feat', // Adds a new feature. 新增feature
        'fix', // Solves a bug. 修复bug
        'merge', // Merge branch ? of ?.
        'perf', // Improves performance. 优化相关，比如提升性能、体验
        'refactor', // Rewrites code without feature, performance or bug changes. 代码重构，没有加新功能或者修复bug
        'revert', // Reverts a previous commit. 回滚到上一个版本
        'style', // Improves formatting, white-space. 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
        'test' // Adds or modifies tests. 测试用例，包括单元测试、集成测试等
      ]
    ]
  }
}
```
* 配置 package.json 文件，添加一下内容，在执行 `git commit -m "commit message"` 命令的时候，将会对 commit message 校验，是否符合 rules
```bash
"husky": { 
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
},
```
