### 封装vue组件库
* 组件开发过和平时项目组件开发过程一样
* vue 规定插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
* Vue.use 方法可以接收一个函数，如果是函数会直接调用这个函数；可以传入对象，传入对象，会调用这个对象的install方法
* 如果是直接引入组件库(如：cnd引入)，那么需要在封装组件库时判断是否是 window，并且 window 有 Vue，就 install(window.Vue)

封装组件库的处理过程
```javascript
const components = [
  // 组件列表
]

const install = function (Vue) {
  // 遍历注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

// 判断是否直接引入文件(通过连接引入组件库)，如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

```

webpack 也要做一些处理，组件放在 packages 目录，把 src 改为了 examples，所以要修改入口文件路径，还有一些其他的配置
```javascript
const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, 'packages')).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项....
        return options
      })
  }
}

```

此时组件库已经封装完成

### 组件库打包发布npm
* [vue-cli]https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93 构建目标为库的介绍
* 在 package.json 添加打包命令把 packages 打包 ` "lib": "vue-cli-service build --target lib packages/index.js" `
* 代码上传 GitHub 托管
* 修改 package.json
    * private 属性值改为 false，私有包 npm 不让上传
    * name属性值要 npm 上没有的
    * 添加 main 属性，值为入口文件路径，该属性是一定要指定的(如： "main": "dist/yun-ui.umd.min.js")，将来导入到项目将会默认导入该文件
* 根目录添加 .npmignore 文件，忽略文件不被 npm 上传
    * 忽略目录： examples/ packages/ public/
    * 忽略指定文件：vue.config.js babel.config.js *.map
* 上传 npm
    * 源需要是 npm，不能是淘宝源
    * `npm login` 登录(需要先注册账号)
    * `npm publish` 发布
    * 以后修改后再上传需要修改 package.json 中的 version 属性，否则上传不了
