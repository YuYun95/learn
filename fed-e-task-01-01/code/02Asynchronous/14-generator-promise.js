// Generator配合Promise的异步方案

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

function * main() {
  try {
    const users = yield ajax('./api/users.json') // 返回Promise对象
    // 外部出入的data作为yield的返回值，
    console.log(users)

    const posts = yield ajax('./api/posts.json')
    console.log(posts)

    const urls = yield ajax('./api/urls1.json')
    console.log(urls)
  } catch (error) {
    console.log(error)
  }
}

// const g = main()
// const result = g.next() // 执行到yield（执行ajax调用），返回的value就是Promise对象
// result.value.then(data => {
//   const result2 = g.next(data) // 把data传入函数，main函数继续执行
//
//   if (result2.done) return
//
//   result2.value.then(data => {
//     const result3 = g.next(data)
//
//     if (result3.done) return
//     result3.value.then(data => {
//       g.next(data)
//     })
//   })
// })

// 使用递归方式
const g = main()

function handleResult(result) {
  if (result.done) return // 生成器函数结束
  result.value.then(data => {
    handleResult(g.next(data))
  }, error => {
    g.throw(error) // 处理异常，函数体通过try catch捕获异常
  })
}

handleResult(g.next())

// 封装为公共函数
function co(generator) {
  const g = generator()

  function handleResult(result) {
    if (result.done) return // 生成器函数结束
    result.value.then(data => {
      handleResult(g.next(data))
    }, error => {
      g.throw(error) // 处理异常，函数体通过try catch捕获异常
    })
  }

  handleResult(g.next())
}

co(main)
