let data = null
this.addEventListener('connect', function(e) {
  const port = e.ports[0]
  port.addEventListener('message', function(event) {
    // get 指令则返回存储的消息数据
    if (event.data.get) {
      data && port.postMessage(data)
    }else {
      // 非 get 指令则存储该消息数据
      data = event.data
    }
  })
  port.start()
})