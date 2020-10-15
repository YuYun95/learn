#!/usr/bin/env node
const path = require('path')
const { Readable } = require('stream')
const Koa = require('koa')
const send = require('koa-send')
const compilerSFC = require('@vue/compiler-sfc')

const app = new Koa()

// 流转字符串
const streamToString = stream => new Promise((resolve, reject) => {
  const chunks = []
  stream.on('data', chunk => chunks.push(chunks))
  stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
  stream.on('error', reject)
})

// 字符串转流
const stringToStream = text => {
  const stream = new Readable()
  stream.push(text)
  stream.push(null) // 流写完了
  return stream
}

// 3. 加载第三方模块，判断请求路径中是否以'@modules'开头，如果是的话，去node_modules加载对应的模块
app.use(async(ctx, next) => {
  // ctx.path --> /@modules/vue
  if (ctx.path.startsWith('/@modules/')) {
    const moduleName = ctx.path.substr(10)
    const pkgPath = path.join(process.cwd(), 'node_modules', moduleName, 'package.json')
    const pkg = require(pkgPath)
    ctx.path = path.join('/node_modules', moduleName, pkg.module)
  }
  await next()
})

// 1. 静态文件服务器
app.use(async(ctx, next) => {
  await send(ctx, ctx.path, { root: process.cwd(), index: 'index.html' })
  await next()
})

// 4. 处理单文件组件
app.use(async (ctx,next) => {
  // 判断是否是单文件组件
  if (ctx.path.endsWith('.vue')){
    const contents = await streamToString(ctx.body)
    const { descriptor } = compilerSFC.parse(contents)
    let code
    // 判断是第一次请求
    if (!ctx.query.type){
      code = descriptor.script.content
      code = code.replace(/export\s+default\s+/g, 'const __script = ')
      code += `
      import { render as __render } from "${ctx.path}?type=template"
      __script.render = __render
      export default __script
      `
      // 第二次请求
    } else if (ctx.query.type === 'template'){
      const templateRender = compilerSFC.compileTemplate({ source: descriptor.template.content})
      code = templateRender.code
    }    
    ctx.type = 'application/javascript' // 设置Conten-Type，告诉浏览器请求的是javascript文件
    ctx.body = stringToStream(code) // 转化成流
  }
  await next()
})

// 2. 修改第三方模块的路径
app.use(async(ctx, next) => {
  if (ctx.type === 'application/javascript') {
    const content = await streamToString(ctx.body)
    // import vue from 'vue'
    // import App from './App.vue'
    // 分组匹配，第一个分组中，form原样匹配form，\s+匹配一个至多个空格，['"]匹配单引号或双引号
    // 第二个分组中，?!标识不匹配这个分组的结果，也就是排除点开头或\开头的情况
    ctx.body = content
      .replace(/(from\s+['"])(?![\.\/])/g, '$1/@modules/')
      .replace(/process\.env\.NODE_ENV/g, '"development"')
      // 替换process对象，浏览器环境没有process对象
  }
})

app.listen(3000)
console.log('Server running @ http://localhost:3000')
