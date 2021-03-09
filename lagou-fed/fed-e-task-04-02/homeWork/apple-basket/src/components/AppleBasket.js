import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import '../style/appleBasket.scss'
import '../style/appleItem.scss'

@inject('apple')
@observer
class AppleBasket extends Component {
  // 获取未吃苹果
  getAppleItem() {
    const { apples } = this.props.apple
    return apples.filter(apple => !apple.isEaten)
  }

  
  render() {
    const { pickApple, isPicking, buttonText, eatApple, status } = this.props.apple
    const appleList = this.getAppleItem()

    const {
      appleNow: { several: notEatenSeveral, weight: notEatenWeight },
      appleEaten: { several: eatenSeveral, weight: eatenWeight }
    } = status

    return (
      <div className="appleBusket">
        <div className="title">苹果篮子</div>

        <div className="stats">
          <div className="section">
            <div className="head">当前</div>
            <div className="content">
              {notEatenSeveral}个苹果，{notEatenWeight}克
            </div>
          </div>
          <div className="section">
            <div className="head">已吃掉</div>
            <div className="content">
              {eatenSeveral}个苹果，{eatenWeight}克
            </div>
          </div>
        </div>

        <div className="appleList">
          {appleList.length ? (
            appleList.map(apple => {
              return (
                <div className="appleItem" key={apple.id}>
                  <div className="apple">
                    <img src={require('../images/apple.png').default} alt="" />
                  </div>
                  <div className="info">
                    <div className="name">红苹果 - {apple.id}号</div>
                    <div className="weight">{apple.weight}克</div>
                  </div>
                  <div className="btn-div">
                    <button onClick={() => eatApple(apple.id)}> 吃掉 </button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="empty-tip" key="empty">
              苹果篮子空空如也
            </div>
          )}
        </div>

        <div className="btn-div">
          <button className={isPicking ? 'disabled' : ''} onClick={pickApple}>
            {buttonText}
          </button>
        </div>
      </div>
    )
  }
}

export default AppleBasket
