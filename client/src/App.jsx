import { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/AuthPage/Login";
import AuthStore from "./context/Authstore.js";
import Sidebar from "./components/Sidebar/Sidebar";
import POS from "./pages/POS/POS.jsx";
import TimeInOut from "./pages/TimeInOut/TimeInOut.jsx";
import { Modal, ModalConfim, ModalYesNo } from "./TRModal/Modal.jsx";
import { InputForm, InputRow } from "./components/TRInputForm/TRInputForm.jsx";
import InputField from "./components/TRInputField/InputFIeld.jsx";
import ModalStore from "./context/ModalStore.js";
import DropDown from "./components/TRDropDown/Dropdown.jsx";
import TRAddfile from "./components/TRAddFile/TRAddFile.jsx";
import ProductStore from "./context/ProductStore.js";
import Loading from "./components/Loading/Loading.jsx";
import Toast from "./toast/Toast.jsx";
import Strings from "./strings/strings-codes.js";
import Branches from "./pages/Branches/Branches.jsx";
import BranchStore from "./context/BranchStore.js";
import { Table } from "./components/TRTable/TrTable.jsx";
import { Toaster } from 'react-hot-toast';

import Button from "./components/TRButton/Button.jsx";

const Inventory = lazy(() => import("./pages/Inventory/Inventory.jsx"));
const Dashboard = lazy(() => import("./pages/DashBoard/Dashboard.jsx"));
const StaffManagement = lazy(() => import("./pages/StaffManagement/StaffManagement.jsx"));

function App() {
  //store instantiate wag burahin baka gamitin sa susunod
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
    //errorUser,
    setInput,
    addUser,
    deleteMultipleUsers,
    deleteUser
  } = AuthStore();
  const { 
    isOpen, 
    setModal, 
    deleteModal, 
    setDeleteModal, 
    selectedItems, 
    url, 
    confirmModal,
    setConfirmModal,
    showAddModal,
    setShowAddModal,
    selectedItem,
    setYesNoModal,
    yesNoModal 
  } = ModalStore();
  const {
    setProductData,
    addNewProduct,
    branches,
    //errorProduct,
    categories,
    addLoading,
    deleteMultipleProducts,
    deleteProduct
  } = ProductStore();
  //const { showModalBranch, setShowModal } = BranchStore();

  const { SERVER_ERROR, PROD_FAIL } = Strings;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //BUG PAG NAG LOG OUT HINDI NAG REREDIRECT TO /LOGIN

  if (AuthLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const defaultRoute = AuthUser?.role.toLowerCase() === "clerk" ? "/inventory" : "/dashboard";

  const postProduct = (e) => {
    e.preventDefault();
    addNewProduct();
  };

  const showDeleteConfirmModal = () => {
    const tableData = {
      header: "Delete Data?",
      hasButton: true,
      CB: () => url === "staff" 
        ? deleteMultipleUsers(selectedItems) 
        : url === "inventory" 
        ? deleteMultipleProducts(selectedItems)
        : null,
      buttonInfo: "DELETE",
    };

    return (
      <Modal onClose={() => setDeleteModal(false)}>
        <Table data={selectedItems} isDetailed={tableData} />
      </Modal>
    );
  };


  //add user modal to hindi branch
  const showUserModal = () => {
    return (
      <Modal
        onClose={() => setShowAddModal(false)}
        header="Add clerk"
        subHeader="Fill in the details for the clerk"
        hasCancel
        onCancel={() => setShowAddModal(false)}
      >
        <InputForm
          isRequired
          onSubmit={(e) => {
            e.preventDefault();
            addUser();
          }}
        >
          <InputRow gap={15} titles={["Username", "Email", "Password"]}>
            <InputField
              text
              placeholder="Enter Username"
              onChange={(value) => setInput("username", value)}
            />
            <InputField
              email
              placeholder="Enter Email"
              onChange={(value) => setInput("email", value)}
            />
            <InputField
              password
              placeholder="Enter Password"
              onChange={(value) => setInput("password", value)}
            />
          </InputRow>
          <InputRow
            gap={15}
            titles={["First Name", "Middle Name", "Last Name"]}
          >
            <InputField
              text
              placeholder="Enter First Name"
              onChange={(value) => setInput("firstName", value)}
            />
            <InputField
              text
              placeholder="Enter Middle Name"
              onChange={(value) => setInput("middleName", value)}
            />
            <InputField
              text
              placeholder="Enter Last Name"
              onChange={(value) => setInput("lastName", value)}
            />
          </InputRow>
          <InputRow gap={15} titles={["Phone Number", "Address", "Salary"]}>
            <InputField
              number
              placeholder="(+63)"
              onChange={(value) => setInput("phoneNumber", value)}
            />
            <InputField
              text
              placeholder="Enter Address"
              onChange={(value) => setInput("address", value)}
            />
            <InputField
              number
              placeholder="Enter Salary"
              onChange={(value) => setInput("salary", value)}
            />
          </InputRow>
          <InputRow gap={15} titles={["Role", "Shift"]}>
            <DropDown
              maxWidth
              options={["Admin", "Clerk"]}
              defaultValue="Role"
              onChange={(value) => setInput("role", value)}
            />
            <DropDown
              maxWidth
              options={["Day", "Night"]}
              defaultValue="Shift"
              onChange={(value) => setInput("shift", value)}
            />
          </InputRow>
          <InputRow gap={15} titles={["Gender", "Branch"]}>
            <DropDown
              maxWidth
              options={["Male", "Female"]}
              defaultValue="Gender"
              onChange={(value) => setInput("gender", value)}
            />
            <DropDown
              maxWidth
              options={branches}
              onChange={(value) => setInput("branch", value)}
            />
          </InputRow>
        </InputForm>
      </Modal>
    );
  };

  const showConfirmModal = () => {
    return <ModalConfim 
              message={`Deleted ${selectedItems.length} item/s`} 
              onClose={() => setConfirmModal(false)}
            />
  }

  const showYesNoModal = () => {
    return <ModalYesNo
              message={`Are you sure you want to delete ${selectedItem.Employee}?`}
              onClose={() => setYesNoModal(false)}
              onYes={() => url === "staff" ? deleteUser(selectedItem.Id) : deleteProduct(selectedItem.Id)}
            />
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
          <InputForm
            isRequired
            onSubmit={(e) => postProduct(e)}
            btnDisabled={addLoading}
          >
            <InputRow gap={15} titles={["ProductID"]}>
              <InputField placeholder="PRODUCT ID (auto generated)" disabled />
            </InputRow>
            <InputRow
              gap={15}
              titles={[
                "Product Name (required)",
                "Quantity (required)",
                "Price (required)",
              ]}
            >
              <InputField
                text
                placeholder="Product Name"
                onChange={(value) => setProductData("productName", value)}
              />
              <InputField
                number
                placeholder="200"
                onChange={(value) => setProductData("quantity", value)}
              />
              <InputField
                number
                placeholder="$50"
                onChange={(value) => setProductData("price", value)}
              />
            </InputRow>
            <InputRow
              titles={["Category (required)", "Branch (required)"]}
              gap={15}
            >
              <DropDown
                maxWidth
                options={categories}
                onChange={(value) => setProductData("category", value)}
              />
              <DropDown
                maxWidth
                options={branches}
                onChange={(value) => setProductData("productBranch", value)}
              />
            </InputRow>
            <InputRow titles={["Add file"]}>
              <TRAddfile onChange={(value) => setProductData("image", value)} />
            </InputRow>
          </InputForm>
        </Modal>
      </>
    );
  };
  // eslint-disable-next-line no-unused-vars
  const showToastError = (type) => {
    switch (type) {
      case "product":
        return <Toast error message={PROD_FAIL} />;
      case "user":
        return <Toast error message={SERVER_ERROR} />;
    }
  };

  const returnModals = () => {
    return (
      <>
        {deleteModal && selectedItems.length > 0 ? showDeleteConfirmModal() : null}
        {isOpen && showModalAddProduct()}
        {showAddModal && showUserModal()}
        {confirmModal && showConfirmModal()}
        {yesNoModal && showYesNoModal()}
      </>
    );
  };

  return (
    <>
      {returnModals()}
      <Toaster position="top-center"/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              !AuthUser ? (
                <Navigate to="/login" replace />
              ) : (
                <Navigate to={defaultRoute} replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              !AuthUser ? <Login /> : <Navigate to={defaultRoute} replace />
            }
          />

          <Route
            path="/dashboard"
            element={
              AuthUser?.role.toLowerCase() === "clerk" ? (
                <Navigate to="/inventory" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <Dashboard />
                </Sidebar>
              )
            }
          />

          <Route
            path="/inventory"
            element={
              <Sidebar user={AuthUser}>
                <Inventory user={AuthUser} />
              </Sidebar>
            }
          />

          <Route
            path="/staff"
            element={
              AuthUser?.role.toLowerCase() === "clerk" ? (
                <Navigate to="/inventory" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <StaffManagement />
                </Sidebar>
              )
            }
          />

          <Route
            path="/pos"
            element={
              <Sidebar user={AuthUser}>
                <POS />
              </Sidebar>
            }
          />

          <Route
            path="/timeinout"
            element={
              <Sidebar user={AuthUser}>
                <TimeInOut />
              </Sidebar>
            }
          />

          <Route
            path="/monitor"
            element={<Sidebar user={AuthUser}>{null}</Sidebar>}
          />

          <Route
            path="/branch"
            element={
              AuthUser?.role.toLowerCase() === "clerk" ? (
                <Navigate to="/inventory" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <Branches />
                </Sidebar>
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
