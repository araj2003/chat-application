import React, { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Register from './pages/Register'
function App() {
  

  return (
    <Routes>
      <Route path='/' element = {<Chat/>}/>
      <Route path='register' element = {<Register/>}/>
      <Route path = '/login' element= {<Login/>} />
    </Routes>
  )
}

export default App
