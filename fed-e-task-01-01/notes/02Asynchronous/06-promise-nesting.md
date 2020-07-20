## Promise 常见误区
Promise 的本质上也是使用回调函数去定义异步任务结束后所需要执行的任务

嵌套使用的方式是使用Promise最常见的错误；应借助于Promise then方法链式调用的特点，尽可能保证异步任务扁平化

常见误区--嵌套
```javascript
function ajax(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function() {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

ajax('./api/urls.json').then(function(urls) {
  ajax(urls.users).then(function(users) {
    ajax(urls.users).then(function(users) {
      ajax(urls.users).then(function(users) {

      })
    })
  })
})
```
