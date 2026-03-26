import { useEffect, lazy, Suspense } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/AuthPage/Login'
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
import ProductStore from './store/ProductStore.js'
import Loading from './components/Loading/Loading.jsx'
import Toast from './toast/Toast.jsx'
import Strings from './strings/strings-codes.js'

const Inventory = lazy(() => import('./pages/Inventory/Inventory.jsx'));
const Dashboard = lazy(() => import('./pages/DashBoard/Dashboard.jsx'));
const StaffManagement = lazy(() => import('./pages/StaffManagement/StaffManagement.jsx'));

function App() {
  //store instantiate
  // const checkAuth = AuthStore(state => state.checkAuth);
  // const AuthUser = AuthStore(state => state.AuthUser);
  // const AuthLoading = AuthStore(state => state.AuthLoading);
  //const setModal = ModalStore(state => state.setModal);
  //const isOpen = ModalStore(state => state.isOpen);
  // const setProductData = ProductStore().setProductData;
  // const addProduct = ProductStore().addNewProduct;
  // const branches = ProductStore().branches;
  const {
    checkAuth, 
    AuthUser, 
    AuthLoading,
    errorUser
  } = AuthStore();
  const {
    isOpen, 
    setModal
  } = ModalStore();
  const {
    setProductData, 
    addNewProduct, 
    branches,
    errorProduct,
    categories,
    addLoading
  } = ProductStore();

  const {
    SERVER_ERROR,
    PROD_FAIL
  } = Strings;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (AuthLoading) return <div><Loading /></div>;

  const defaultRoute = AuthUser?.role === 'clerk' ? '/inventory' : '/dashboard';

  const postProduct = (e) => {
    e.preventDefault();
    addNewProduct();
  }

  const showModalAddProduct = () => {
    return (
      <>
        <Modal 
          onClose={() => setModal(false)}
          header="Add new stock"
          subHeader="Fill in the details for the new stock item"
          hasCancel
          onCancel={() => setModal(false)}
        >
          <InputForm isRequired onSubmit={(e) => postProduct(e)} btnDisabled={addLoading}>
              <InputRow gap={15} titles={['ProductID']}>
                <InputField placeholder="PRODUCT ID (auto generated)" disabled/>
              </InputRow>
              <InputRow gap={15} titles={['Product Name (required)', 'Quantity (required)', 'Price (required)']}>
                <InputField text placeholder="Product Name" onChange={(value) => setProductData("productName", value)}/>
                <InputField number placeholder="200" onChange={(value) => setProductData('quantity', value)}/>
                <InputField number placeholder="$50" onChange={(value) => setProductData('price', value)}/>
              </InputRow>
              <InputRow titles={['Category (required)', 'Branch (required)']} gap={15}>
                <DropDown maxWidth options={categories} onChange={value => setProductData('category', value)}/>
                <DropDown maxWidth options={branches} onChange={value => setProductData('productBranch', value)}/>
              </InputRow>
              <InputRow titles={['Add file']}>
                <TRAddfile onChange={value => setProductData('image', value)}/>
              </InputRow>
            </InputForm>
        </Modal>
      </>
    );
  }

  const showToastError = (type) => {
    switch (type) {
      case 'product':
        return (
          <Toast error message={PROD_FAIL}/>
        );
      case 'user':
        return(
          <Toast error message={SERVER_ERROR}/>
        );
    }
  }

  return (
    <>
    {isOpen && showModalAddProduct()}
    {
      errorProduct 
        ? showToastError('product') 
        : errorUser 
        ? showToastError('user') 
        : null
    }
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
            <Sidebar user={AuthUser}>
              <Inventory user={AuthUser}/>
            </Sidebar>
          } />

          <Route path='/staff' element={
            <Sidebar user={AuthUser}>
              <StaffManagement/>
            </Sidebar>
          } />

          <Route path='/pos' element={
            <Sidebar user={AuthUser}>
              <POS/>
            </Sidebar>
          } />

          <Route path='/timeinout' element={
            <Sidebar user={AuthUser}>
              <TimeInOut/>
            </Sidebar>
          } />

          <Route path='*' element={<Navigate to='/' replace />} />

        </Routes>
      </Suspense>
    </>
  )
}

export default App