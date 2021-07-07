import { useEffect, useState, memo } from "react"

function compare(prevProps, nextProps) {
  if (prevProps.person.name !== nextProps.person.name || prevProps.person.age !== nextProps.person.age) {
    return false
  }
  return true
}

const ShowName = memo(function ({ person }) {
  console.log('render.......');
  return <div>{ person.name } {person.age}</div>
}, compare)

function App() {
  const [person, setPerson] = useState({ name: '张三', age: 20, job: 'waiter' })
  
  useEffect(() => {
    setInterval(() => {
      setPerson({ ...person, job: 'chef' })
    }, 1000)
  }, [])
  
  return (
    <div>
      <ShowName person={person} />
    </div>
  )
}

export default App
