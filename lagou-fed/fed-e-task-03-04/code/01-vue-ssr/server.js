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
})

server.listen(3000, () => {
  console.log('server running at port 3000')
})
