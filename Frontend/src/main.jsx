import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
// import './index.css'
import App from './App.jsx'
import ChatProvider from './Context/ChatProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ChatProvider>
  <BrowserRouter>
  <ChakraProvider>
    <App />
  </ChakraProvider>
  </BrowserRouter>
  </ChatProvider>
  // <App />
  
)
