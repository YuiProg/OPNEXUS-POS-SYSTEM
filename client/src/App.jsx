import { useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/AuthPage/Login'
import { Toaster } from 'react-hot-toast'
import AuthStore from './store/Authstore'
import Dashboard from './pages/DashBoard/Dashboard'
import Sidebar from './components/Sidebar/Sidebar'
import Inventory from './pages/Inventory/Inventory'

function App() {
  const { checkAuth, AuthUser, AuthLoading } = AuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // if (AuthLoading && !AuthUser) {
  //   return <div>Loading...</div>;
  // }
  
  //const location = useLocation().pathname.slice(1);

  // const checkLocation = () => {
  //     switch (location) {
  //       case 'dashboard': 
  //         return <Dashboard/>
  //       case 'inventory':
  //         return <Inventory/>
  //     }
  // }

  return (
    <>
      <Routes>
        <Route path='/' element={!AuthUser ? <Navigate to="/login"/> : <Navigate to='/dashboard'/>}/>
        <Route path='/login' element={!AuthUser ? <Login/> : <Navigate to='/'/>}/>
        
        <Route path='/dashboard' element={
          <Sidebar user = {AuthUser && AuthUser}>
            <Dashboard/>
          </Sidebar>}
        />
        
        <Route path='/inventory' element={
          <Sidebar user = {AuthUser && AuthUser}>
            <Inventory user={AuthUser}/>
          </Sidebar>}
        />
      </Routes>
    </>
  )
}

export default App