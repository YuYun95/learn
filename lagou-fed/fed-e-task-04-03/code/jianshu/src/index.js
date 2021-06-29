import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'

ReactDOM.render(
  <Router>
    <ChakraProvider>
      <CSSReset />
      <App />
    </ChakraProvider>
  </Router>,
  document.getElementById('root')
)
