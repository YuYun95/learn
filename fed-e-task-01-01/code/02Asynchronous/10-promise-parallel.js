// Promise 并行执行

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

// 请求多个接口的情况，如果请求相互没依赖 ，最好同时请求，避免一个一个请求消耗更多时间

// 使用Promise.all([])可以把多个Promise合并为一个Promise，该方法返回一个全新的Promise对象，等待所有任务结束

// Promise.all接收一个数组，数组元素为Promise对象，可以看做一个个异步任务；当内部所有Promise完成后，返回的全新Promise才会完成，拿到的结果是一个数组，包含每个异步任务执行的结果；只有任务都成功结束了，新增的Promise才成功结束，其中一个失败，Promise以失败结束
var promise = Promise.all([ajax('./api/users.json'), ajax('./api/users.json')])
promise.then((values) => {
  console.log(values)

})

ajax('/api/urls.json').then(value => {
  const urls = Object.values(value)
  const tasks = urls.map(url => ajax(url))
  return Promise.all(tasks)
}).then(values => {
  console.log(values)
})

// Promise.race() 也可以把多个Promise对象组合为一个Promise对象，只会等待第一个结束的任务，即有一个Promise对象完成，就返回一个新的Promise对象

// 例子中 如果500毫秒内把结结果返回，那么就正常得到结果；如果500毫秒后请求没办法把结果返回，因为500毫秒后timeout以失败的方式结束；而race以第一个Promise为准
const request = ajax('/api/posts.json')
const timeout = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('timeout')), 500)
})
Promise.race([
  request,
  timeout
]).then(value => {
  console.log('success', value)
}).catch((error) => {
  console.log('reject', error)
})
