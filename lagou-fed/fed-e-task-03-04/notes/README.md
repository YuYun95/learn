# 搭建自己的SSR、静态站点生成（SSG）及封装 Vue.js 组件库
## 搭建字段的SSR
### 一、渲染一个Vue实例
* `mkdir vue-ssr`
* `cd vue-ssr`
* `npm init -y`
* `npm install vue vue-server-renderer`
* server.js
```javascript
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
  template: `
    <div id="app">
    <h1>{{ message }}</h1>
</div>
  `,
  data: {
    message: '拉勾教育'
  }
})

renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
})

```
* `node server.js` 运行结果：
```html
<div id="app" data-server-rendered="true"><h1>拉勾教育</h1></div>
```
`data-server-rendered="true"`：这个属性是为了将来客服端渲染激活接管的接口

### 二、结合到Web服务中
* `npm install express`
* 解决返回乱码的问题
    * 设置响应头`res.setHeader('Content-Type', 'text/html; charset=utf8')`
    * 返回信息包含`<meta charset="UTF-8">`，即返回一个完整的html结构
server.js
```javascript
const Vue = require('vue')
const express = require('express')

const renderer = require('vue-server-renderer').createRenderer()

const server = express()

server.get('/', (req, res) => {
  const app = new Vue({
    template: `
    <div id="app">
    <h1>{{ message }}</h1>
</div>
  `,
    data: {
      message: '拉勾教育'
    }
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error')
    }
    res.setHeader('Content-Type','text/html; charset=utf8') // 设置编码，防止乱码
    res.end(`
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `)
  })
})

server.listen(3000, () => {
  console.log('server running at port 3000')
})

```

### 三、使用HTML模板
1. 创建HTML模板文件
    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <!--vue-ssr-outlet-->
      </body>
    </html>
    
    ```
    `<!--vue-ssr-outlet-->`是占位符，为了接收将来要渲染的变量，不能写错，不能有多余的空格

2. js代码中的createRender方法指定模板文件

    readFileSync：读取到的是Buffer二进制，要给上utf-8，将按照编号转换
    server.js
    ```javascript
    const Vue = require('vue')
    const express = require('express')
    const fs = require('fs')
    
    const renderer = require('vue-server-renderer').createRenderer({
      // 指定模板文件
      template: fs.readFileSync('./index.template.html', 'utf-8') // readFileSync读取到的是Buffer二进制，要给上utf-8，将按照编号转换
    })
    
    const server = express()
    
    server.get('/', (req, res) => {
      const app = new Vue({
        template: `
        <div id="app">
        <h1>{{ message }}</h1>
    </div>
      `,
        data: {
          message: '拉勾教育'
        }
      })
    
      renderer.renderToString(app, (err, html) => { // 此处的html参数是被模板文件处理过了的，可以直接输出到用户页面上
        if (err) {
          return res.status(500).end('Internal Server Error')
        }
        res.setHeader('Content-Type','text/html; charset=utf8') // 设置编码，防止乱码
        res.end(html)
      })
    })
    
    server.listen(3000, () => {
      console.log('server running at port 3000')
    })
    
    ```

### 四、在模板中使用外包数据
index.template.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>

```
> 使用两个花括号可以接受外部数据变量，而标签也会进行转义后输出在页面上。此时可以使用三个花括号原样输出数据，不会对标签进行转义处理

在js代码中给`renderer.renderString`增加第二个参数为外部数据对象
```javascript
renderer.renderToString(app, {
  title: '拉钩教育',
  meta: `<meta name="description" content="拉钩教育">`
}, (err, html) => { // 此处的html参数是被模板文件处理过了的，可以直接输出到用户页面上
  if (err) {
    return res.status(500).end('Internal Server Error')
  }
  res.setHeader('Content-Type','text/html; charset=utf8') // 设置编码，防止乱码
  res.end(html)
})
```

### 五、构建配置
1. 基本思路
    
    ![](./img/1.jpg)

    Server entry：服务端入口，负责服务端渲染
    
    Client entry：客户端入口，客户端渲染，接管服务端渲染的内容，激活为一个动态页面
    
    前端编写这两个 entry 通过 webpack 打包为 bundle

2. 源码结构
    ```base
    src
    ├── components
    │   ├── Foo.vue
    │   ├── Bar.vue
    │   └── Baz.vue
    ├── App.vue
    ├── app.js # 通用 entry(universal entry)
    ├── entry-client.js # 仅运行于浏览器
    └── entry-server.js # 仅运行于服务器
    ```
    App.vue
    ```base
    <template>
      <div id="app">
        <h1>{{message}}</h1>
        <h2>客户端动态交互</h2>
        <div>
          <input v-model="message">
        </div>
        <div>
          <button @click="onClick">点击测试</button>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'App',
      data: function () {
        return {
          message: '拉勾教育'
        }
      },
      methods: {
        onClick () {
          console.log('Hello World！')
        }
      }
    }
    </script>
    ```
    `app.js` 是我们应用程序的「通用 entry」。在纯客户端应用程序中，我们将在此文件中创建根Vue实例，并直接挂载到DOM。但是，对应服务器端渲染（SSR），责任转移到纯客户端entry文件。`app.js`简单地使用export导出一个`createApp`函数：
    ```base
    /**
     * 通用启动入口
     */
    
    import Vue from 'vue'
    import App from './App.vue'
    
    // 导出一个工厂函数，用于创建新的
    // 应用程序、router 和 store 实例
    export function createApp () {
      const app = new Vue({
        // 根实例简单的渲染应用程序组件。
        render: h => h(App)
      })
      return { app }
    }
    ```
    `entry-client.js` 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中：
    ```base
    /**
     * 客户端入口
     */
    
    import { createApp } from './app'
    
    // 客户端特定引导逻辑……
    
    const { app } = createApp()
    
    // 这里假定 App.vue 模板中根元素具有 `id="app"`
    app.$mount('#app')
    ```
    服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数。此时，除了创建和返回应用程序实例之外，它不会做太多事情 - 但是稍后我们将在此执行服务器端路由匹配 (server-side route matching) 和数据预取逻辑 (data pre-fetching logic)
    ```base
    /**
     * 服务端启动入口
     */
    
    import { createApp } from './app'
    
    export default context => {
      const { app } = createApp()
      return app
    }
    ```

3. 安装依赖
    
    (1)安装生产依赖
    ```base
    npm i vue vue-server-renderer express cross-env
    ```
   | 包 | 说明 |
   | ---- | ---- |
   | vue | Vue.js核心库 |
   | vue-server-renderer | Vue服务端渲染工具 |
   | express | 基于Node的webpack服务框架 |
   | cross-env | 通过npm scripts设置跨平台环境变量 |
    (2).安装开发依赖
    ```base
    npm i -D webpack webpack-cli webpack-merge webpack-node-externals @babel/core @babel/plugin-transform-runtime @babel/preset-env babel-loader css-loader url-loader file-loader rimraf vue-loader vue-template-compiler friendly-errors-webpack-plugin
    ```
   | 包 | 说明 |
   | ---- | ---- |
   | webpack | webpack核心包 |
   | webpack-cli | webpack的命令行工具 |
   | webpack-merge | webpack配置信息合并工具 |
   | webpack-node-externals | 排除webpack中的Node模块 |
   | rimraf | 基于Node封装的一个跨平台`rm -rf`工具 |
   | friendly-errors-webpack-plugin | 友好的webpack错误提示 |
   | @babel/core<br/> @babel/plugin-transform-runtime<br/> @babel/preset-env<br/> babel-loader | Babel相关工具 |
   | vue-loader<br/> vue-template-compiler | 处理.vue资源 |
   | file-loader | 处理字体资源 |
   | css-loader | 处理CSS资源 |
   | url-loader | 处理图片资源 |

4. webpack配置文件及打包命令
    
    (1) 初始化webpack打包配置文件
    ```base
    build
    |---webpack.base.config.js # 公共配置
    |---webpack.client.config.js # 客户端打包配置文件
    |---webpack.server.config.js # 服务端打包配置文件
    ```

5. 配置构建命令
    ```base
    "scripts": {
      "build:client": "cross-env NODE_ENV=production webpack --config build/webpack.client.config.js",
      "build:server": "cross-env NODE_ENV=production webpack --config build/webpack.server.config.js",
      "build": "rimraf dist && npm run build:client && npm run build:server"
    }
    ```

6. 启动应用

    server.js
    ```base
    const Vue = require('vue')
    const express = require('express')
    const fs = require('fs')
    
    const serverBundle = require('./dist/vue-ssr-server-bundle.json')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    const { static } = require('express')
    const template = fs.readFileSync('./index.template.html', 'utf-8')
    const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
      template,
      clientManifest
    })
    
    const server = express()
    
    // 请求前缀，使用express中间件的static处理
    // 当请求'/dist'路径资源的时候，去'./dist'目录查找
    server.use('/dist', express.static('./dist'))
    
    server.get('/', (req, res) => {
    
      renderer.renderToString({
        title: '拉勾教育',
        meta: `
          <meta name="description" content="拉勾教育" >
        `
      }, (err, html) => {
        if (err) {
          return res.status(500).end('Internal Server Error.')
        }
        res.setHeader('Content-Type', 'text/html; charset=utf8') // 设置编码，防止乱码
        res.end(html)
      })
    })
    
    server.listen(3000, () => {
      console.log('server running at port 3000...')
    })

    ```
    
7. 解析渲染流程

    (1).vue-ssr-server-bundle.json解析
    
    `renderer.renderToString()`方法需要把Vue实例渲染为html，只不过是在`createBundleRenderer()`方法创建了
    
    `createBundleRenderer()`方法第一个参数是服务端打包的结果`vue-ssr-server-bundle.json`
    
    `vue-ssr-server-bundle.json`描述服务端打包信息，'entry'属性是服务端打包后的入口，值是打包配置文件定义的，值所指向的文件就在该文件的'files'属性中
    
    `files`中的模块代码就是在服务端打包通过`entry-server`打包出来的一个结果文件
    
    `maps`属性就是`files`中的js模块的信息，开发调试使用
    
     (2).vue-ssr-server-bundle.json如何使用的
      renderer在渲染的时候，会加载serverBundle当中的入口（entry）文件，加载里面的代码，然后执行，就得到了`entry-server.js`中的创建的Vue实例，把Vue实例渲染，把渲染结果注入到模板当中，最后把数据发送给客户端
      
     (3).`clientManifest`
      客户端渲染激活，把客户端打包的js注入到页面中，clientManifest，对应`vue-ssr-client-manifest.json`客户端打包后的文件
      
      `publicPath`属性，对应客户端打包中配置的出口`publicPath`
      
      `all`属性是客户端打包所有构建出来的资源文件app.js、app.map
      
      `initial`属性值是打包后的app.js，serverRender在渲染的时候把`initial`中的资源自动的注入到模板页面的`<!--vue-ssr-outlet-->`之后
      
      `async`属性存储一些异步资源的资源信息，如，在代码中加载了一些异步组件、模块
      
      `modules`是针对原始模块依赖信息说明
       
       客户端激活：https://ssr.vuejs.org/zh/guide/hydration.html












