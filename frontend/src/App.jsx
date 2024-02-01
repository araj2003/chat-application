import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Register from './pages/Register'
import SetAvatar from './components/SetAvatar'
import { UserContextProvider } from './context/userContext'
function App() {


  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/setAvatar' element={<SetAvatar />}></Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
