this.addEventListener('message', function(e) {
  console.log('service worker receive message', e.data)
  e.waitUntil(
    this.clients.matchAll().then(clients => {
      if (!clients || clients.length === 0) {
        return
      }
      clients.forEach(client => {
        client.postMessage(e.data)
      });
    })
  )
})