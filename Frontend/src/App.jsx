import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Chats from './Pages/Chats'

function App() {
  
  return (
   <div className='App'>
    <Route path='/' component={Home} exact />
  <Route path='/chats' component={Chats} />
   </div>
    
  )
}

export default App
