import * as React from "react"

function App(props) {
  React.useEffect(() => {
    console.log("useEffect")
  }, [])
  console.log(props.key);
  return <div>App works</div>
}

// class App extends React.Component {
//   componentDidMount() {
//     console.log("componentDidMount")
//   }
//   render() {
//     return <div>class component</div>
//   }
// }

export default App
