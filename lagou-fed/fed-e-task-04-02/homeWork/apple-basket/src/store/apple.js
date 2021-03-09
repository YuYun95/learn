import { action, observable, computed } from 'mobx'

class Apple {
  @observable apples = [{ id: 0, weight: 233, isEaten: false }]
  @observable newAppleId = 1
  @observable isPicking = false
  @observable buttonText = '摘苹果'

  @computed get status() {
    const status = {
      appleNow: {
        several: 0,
        weight: 0
      },
      appleEaten: {
        several: 0,
        weight: 0
      }
    }

    this.apples.forEach(apple => {
      let selector = apple.isEaten ? 'appleEaten' : 'appleNow'
      status[selector].several++
      status[selector].weight += apple.weight
    })

    return status
  }

  @action.bound pickApple() {
    if (this.isPicking) return

    this.isPicking = true
    this.buttonText = '正在采摘...'
    let weight = Math.floor(200 + Math.random() * 50)
    setTimeout(() => {
      this.isPicking = false
      this.buttonText = '摘苹果'
      this.apples.push({
        id: this.newAppleId++,
        weight: weight,
        isEaten: false
      })
    }, weight)
  }

  @action.bound eatApple(appleId) {
    let targetIndex = ''
    this.apples.forEach((apple, index) => {
      if (apple.id === appleId) {
        targetIndex = index
      }
    })
    this.apples[targetIndex].isEaten = true
  }
}

const apple = new Apple()

export default apple
