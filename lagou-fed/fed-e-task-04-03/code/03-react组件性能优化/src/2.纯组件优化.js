import { Component, PureComponent } from 'react'

class App extends Component {
  constructor() {
    super()
    this.state = {
      name: '张三'
    }
  }

  updateName() {
    setInterval(() => {
      this.setState({ name: '张三' })
    }, 1000)
  }

  componentDidMount() {
    this.updateName()
  }

  render() {
    return <>
      <ReguarComponent name={this.state.name} />
      <PureComponentDemo name={this.state.name} />
    </>
  }
}

// 非纯组件
class ReguarComponent extends Component {
  render() {
    console.log('ReguarComponent')
    return <div>{ this.props.name }</div>
  }
}

//纯组件
class PureComponentDemo extends PureComponent {
  render() {
    console.log('PureComponentDemo')
    return <div>{ this.props.name }</div>
  }
}

export default App
