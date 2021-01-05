import React, { render, Component } from './react'

const root = document.getElementById('root')

const jsx = (
  <div>
    <p>Hello React </p>
    <p>Hi Fiber </p>
  </div>
)

// render(jsx, root)

// setTimeout(() => {
//   const jsx = (
//     <div>
//       <div>定时器触发</div>
//     </div>
//   )
//   render(jsx, root)
// }, 2000)

class Greating extends Component{
  constructor(props) {
    super(props)
    this.state = {
      name: '张三'
    }
  }
  render() {
    return (
      <div>
        hahaha {this.props.title} {this.state.name}
        <button onClick={() => this.setState({name: '李四'})}>按钮</button>
      </div>
    )
  }
}

render(<Greating title="Greating"/>, root)


function FnComponent(props) {
  return <div>FnComponent {props.title}</div>
}

// render(<FnComponent title="hello"/>, root)
