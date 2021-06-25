import React, { useEffect, useState } from 'react'
import axios from 'axios'

function useGetPost() {
  const [post, setPost] = useState({})
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => setPost(response.data))
  }, [])
  return [post, setPost]
}

function App(props) {
  const [post, setPost] = useGetPost()
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </div>
  )
}

export default App
