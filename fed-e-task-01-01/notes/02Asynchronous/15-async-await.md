## Async / await
async/await的目的是简化使用多个 promise 时的同步行为，并对一组 Promises执行某些操作。正如Promises类似于结构化回调，async/await更像结合了generators和 promises
### async
async 函数返回一个Promise对象（返回的Promise对象会运行执行(resolve)异步函数的返回结果，或者运行拒绝(reject)——如果异步函数抛出异常的话）

### await
1. 操作符用于等待一个Promise对象，返回的是Promise对象的处理结果
2. 如果等待的不是 Promise对象，则返回该值本身
3. 会暂停当前 async function 的执行，等待 Promise 处理完成，然后继续执行异步函数，并返回结果。若 Promise 正常处理(fulfilled)，其回调的resolve函数参数作为 await 表达式的值，继续执行 async function
4. 当异步函数暂停时，它调用的函数会继续执行(收到异步函数返回的隐式Promise)

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

async function main() {
  try {
    const users = await ajax('./api/users.json')
    console.log('main users', users)

    const posts = await ajax('./api/posts.json')
    console.log('posts', posts)

    const urls = await ajax('./api/urls.json')
    console.log('urls', urls)

    const value = await 'value'
    console.log('等待的不是 Promise 对象', value)

  } catch (error) {

    console.log(error)

  }

  return Promise.resolve('async return 的值')
}

const promise = main()

console.log('promise', promise) // Promise对象

promise.then((value) => {
  console.log('all completen', value) // async 函数返回的值
})

```
