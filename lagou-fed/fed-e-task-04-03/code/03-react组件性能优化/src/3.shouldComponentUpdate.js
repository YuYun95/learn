/*
 * @Author: your name
 * @Date: 2021-06-30 12:04:43
 * @LastEditTime: 2021-06-30 15:58:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \react-app\src\3.shouldComponentUpdate.js
 */
import { Component } from 'react'

class App extends Component {
  constructor() {
    super()
    this.state = {
      person: {
        name: '张三',
        age: 20,
        job: 'waiter'
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ person: {...this.state.person, job: 'chef'}})
    }, 2000)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.person.name !== this.state.person.name || nextState.person.age !== this.state.person.age) {
      return true
    }
    return false
  }

  render() {
    console.log('render')
    return (
      <div>
        { this.state.person.name } { this.state.person.age }
      </div>
    )
  }
}
export default App
