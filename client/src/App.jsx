import { useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/AuthPage/Login'
import { Toaster } from 'react-hot-toast'
import AuthStore from './store/Authstore'
import Sidebar from './components/Sidebar/Sidebar'
import { lazy } from 'react'

const Inventory = lazy(() => import('./pages/Inventory/Inventory.jsx'));
const Dashboard = lazy(() => import('./pages/DashBoard/Dashboard.jsx'));
const StaffManagement = lazy(() => import('./pages/StaffManagement/StaffManagement.jsx'));

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

        <Route path='/staff' element={
          <Sidebar user = {AuthUser && AuthUser}>
            <StaffManagement/>
          </Sidebar>}
        />
      </Routes>
    </>
  )
}

export default App