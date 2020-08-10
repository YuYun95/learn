// 搜索引擎是怎么获取网页内容的？
const http = require('http')

// 通过程序获取指定网页的内容
http.get('http://localhost:8080/', res => {
  let data = ''
  res.on('data', chunk => {
    data += chunk
  })

  res.on('end', () => {
    console.log(data)
  })
})

/*
打印结果：
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="/favicon.ico">
    <title>vuex-cart-demo-template</title>
  <link href="/js/about.js" rel="prefetch"><link href="/js/app.js" rel="preload" as="script"><link href="/js/chunk-vendors.js" rel="preload" as="script"></head>
  <body>
    <noscript>
      <strong>We're sorry but vuex-cart-demo-template doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  <script type="text/javascript" src="/js/chunk-vendors.js"></script><script type="text/javascript" src="/js/app.js"></script></body>
</html>
*/
