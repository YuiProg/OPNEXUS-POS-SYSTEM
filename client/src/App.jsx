import { useEffect, lazy, Suspense } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/AuthPage/Login'
import { Toaster } from 'react-hot-toast'
import AuthStore from './store/Authstore'
import Sidebar from './components/Sidebar/Sidebar'
import POS from './pages/POS/POS.jsx'
import TimeInOut from './pages/TimeInOut/TimeInOut.jsx'

const Inventory = lazy(() => import('./pages/Inventory/Inventory.jsx'));
const Dashboard = lazy(() => import('./pages/DashBoard/Dashboard.jsx'));
const StaffManagement = lazy(() => import('./pages/StaffManagement/StaffManagement.jsx'));

function App() {
  const checkAuth = AuthStore(state => state.checkAuth);
  const AuthUser = AuthStore(state => state.AuthUser);
  const AuthLoading = AuthStore(state => state.AuthLoading);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //TODO: add loading page
  if (AuthLoading) return <div>Loading...</div>;

  const defaultRoute = AuthUser?.role === 'clerk' ? '/inventory' : '/dashboard';

  return (
    <>
      <Toaster />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={!AuthUser ? <Navigate to='/login' replace /> : <Navigate to={defaultRoute} replace />} />
          <Route path='/login' element={!AuthUser ? <Login /> : <Navigate to={defaultRoute} replace />} />

          <Route path='/dashboard' element={
            AuthUser?.role === 'clerk'
              ? <Navigate to='/inventory' replace />
              : <Sidebar user={AuthUser}><Dashboard /></Sidebar>
          } />

          <Route path='/inventory' element={
            <Sidebar user={AuthUser}><Inventory user={AuthUser} /></Sidebar>
          } />

          <Route path='/staff' element={
            <Sidebar user={AuthUser}><StaffManagement /></Sidebar>
          } />

          <Route path='/pos' element={
            <Sidebar user={AuthUser}><POS /></Sidebar>
          } />

          <Route path='/timeinout' element={
            <Sidebar user={AuthUser}><TimeInOut /></Sidebar>
          } />

          <Route path='*' element={<Navigate to='/' replace />} />

        </Routes>
      </Suspense>
    </>
  )
}

export default App