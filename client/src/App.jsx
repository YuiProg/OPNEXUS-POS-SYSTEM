import { useEffect, lazy, Suspense } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/AuthPage/Login'
import { Toaster } from 'react-hot-toast'
import AuthStore from './store/Authstore'
import Sidebar from './components/Sidebar/Sidebar'
import POS from './pages/POS/POS.jsx'
import TimeInOut from './pages/TimeInOut/TimeInOut.jsx'
import { Modal } from './TRModal/Modal.jsx'
import { InputForm, InputRow } from './components/TRInputForm/TRInputForm.jsx'
import InputField from './components/TRInputField/InputFIeld.jsx'
import ModalStore from './store/ModalStore.js'
import DropDown from './components/TRDropDown/Dropdown.jsx'
import TRAddfile from './components/TRAddFile/TRAddFile.jsx'

const Inventory = lazy(() => import('./pages/Inventory/Inventory.jsx'));
const Dashboard = lazy(() => import('./pages/DashBoard/Dashboard.jsx'));
const StaffManagement = lazy(() => import('./pages/StaffManagement/StaffManagement.jsx'));

function App() {
  const checkAuth = AuthStore(state => state.checkAuth);
  const AuthUser = AuthStore(state => state.AuthUser);
  const AuthLoading = AuthStore(state => state.AuthLoading);
  const setModal = ModalStore(state => state.setModal);
  const isOpen = ModalStore(state => state.isOpen);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //TODO: add loading page
  if (AuthLoading) return <div>Loading...</div>;

  const defaultRoute = AuthUser?.role === 'clerk' ? '/inventory' : '/dashboard';

  const showModalAddProduct = () => {
    return (
      <>
        <Modal 
          onClose={() => setModal(false)}
          header="Add new stock"
          subHeader="Fill in the details for the new stock item"
        >
          <InputForm isRequired onSubmit={(e) => {
            e.preventDefault();
            console.log('test')
          }}>
              <InputRow gap={15} titles={['ProductID']}>
                <InputField placeholder="PRODUCT ID (auto generated)" disabled/>
              </InputRow>
              <InputRow gap={15} titles={['Product Name', 'Quantity']}>
                <InputField text placeholder="Product Name" onChange={(e) => console.log(e)} required/>
                <InputField number placeholder="200" onChange={(e) => console.log(e)}/>
              </InputRow>
              <InputRow titles={['Category', 'Branch']} gap={15}>
                <DropDown maxWidth/>
                <DropDown maxWidth/>
              </InputRow>
              <InputRow titles={['Add file']}>
                <TRAddfile isRequired onChange={async (e) => console.log(await e)}/>
              </InputRow>
            </InputForm>
        </Modal>
      </>
    );
  }

  return (
    <>
    {isOpen && showModalAddProduct()}
      {/* <Toaster /> */}
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