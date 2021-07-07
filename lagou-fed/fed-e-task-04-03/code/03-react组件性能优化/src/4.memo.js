import { useEffect, useState, memo } from "react"

const ShowName = memo(function ({ name }) {
  console.log('render.......');
  return <div>{ name }</div>
})

function App() {
  const [name] = useState('张三')
  const [index, setIndex] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setIndex(prev => prev + 1)
    }, 1000)
  }, [])
  return (
    <div>
      { index }
      <ShowName name={name} />
    </div>
  )
}

// function ShowName ({ name }) {
//   console.log('render.......');
//   return <div>{ name }</div>
// }

export default App
