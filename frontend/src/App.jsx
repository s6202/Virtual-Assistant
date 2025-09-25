import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/signUp'
import SignIn from './pages/signIn'
import Home from './pages/Home'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/customize" element={<Customize />} />
      <Route path="/customize2" element={<Customize2 />} />
    </Routes>
  )
}

export default App
