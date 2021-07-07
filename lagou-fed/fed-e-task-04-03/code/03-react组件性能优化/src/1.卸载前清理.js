import { useEffect } from "react"


function Test() {
  useEffect(() =>{
    let timer = setInterval(() => {
      console.log('定时器在执行')
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return <div>Test</div>
}

export default Test
