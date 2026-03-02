import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Login from './pages/AuthPage/Login'
import {Toaster} from 'react-hot-toast'
import AuthStore from './store/Authstore'
import Dashboard from './pages/DashBoard/Dashboard'

function App() {
  const {checkAuth, AuthUser} = AuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Toaster position='bottom-right'/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={!AuthUser ? <Login/> : <Navigate to='/dashboard'/>}/>
        {/* DAT NAKA SUBSCRIBE TONG DASBOARD SA STATE PARA I CHECK KUNG MAY AUTHENTICATED NA USER */}
        <Route path='/dashboard' element={AuthUser ? <Dashboard/> : <Navigate to='/login'/>}/>
      </Routes>
    </>
  )
}

export default App
