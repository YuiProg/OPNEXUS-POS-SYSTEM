import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Router, Routes} from 'react-router-dom'
import Login from './pages/AuthPage/Login'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster position='bottom-right'/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>

  )
}

export default App
