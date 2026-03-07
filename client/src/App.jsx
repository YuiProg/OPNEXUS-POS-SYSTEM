import { useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/AuthPage/Login'
import { Toaster } from 'react-hot-toast'
import AuthStore from './store/Authstore'
import Dashboard from './pages/DashBoard/Dashboard'
import Sidebar from './components/Sidebar'

function App() {
  const { checkAuth, AuthUser, AuthLoading } = AuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (AuthLoading && !AuthUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster position='bottom-right'/>
      <Routes>
        <Route path='/' element={!AuthUser ? <Login/> : <Navigate to='/dashboard'/>}/>
        <Route path='/login' element={!AuthUser ? <Login/> : <Navigate to='/dashboard'/>}/>
        <Route path='/dashboard' element={
          <Sidebar user={AuthUser ? AuthUser.data : null}>
            <Dashboard/>
          </Sidebar>}
        />
      </Routes>
    </>
  )
}

export default App