import { useEffect, lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/AuthPage/Login.jsx";
import AuthStore from "./context/Authstore.js";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import POS from "./pages/POS/POS.jsx";
import TimeInOut from "./pages/TimeInOut/TimeInOut.jsx";
import {
  Modal,
  ModalConfim,
  ModalEditItem,
  ModalYesNo,
} from "./TRModal/Modal.jsx";
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
import { Table } from "./components/TRTable/TrTable.jsx";
import toast, { Toaster } from "react-hot-toast";
import Button from "./components/TRButton/Button.jsx";
import BranchStore from "./context/BranchStore.js";
import TimeInOutStore from "./context/TimeinOut.js";
import URLError from "./components/ErrorPages/URLError/URLError.jsx";
import ScreenLoading from "./components/ScreenLoading/ScreenLoading.jsx";
import SalesStore from "./context/SalesStore.js";
import addVipUser from "./pages/VIP/AddVipModal.jsx";
import VipStore from "./context/VipStore.js";
import {confirmDeleteVip, editMainVipModal} from "./pages/VIP/EditVipModal.jsx";
import confirmChangesVipModal from "./pages/VIP/ConfirmChangesVipModal.jsx";
import disableManyConfirmModal from "./pages/VIP/DisableManyConfirm.jsx";
import newCategoryModal from "./pages/Inventory/NewCategoryModal.jsx";
import CategoryStore from "./context/CategoryStore.js";
import deleteCategoryConfirm from "./pages/Inventory/DeleteCategoryConfirm.jsx";
import CustomerLogin from "./pages/CustomerPage/CustomerLogIn.jsx";
import viewChangePasswordModal from "./pages/AuthPage/ChangePasswordModal.jsx";
import SettingsPage from "./pages/Settings/Settings.jsx";


const ServerError = lazy(
  () => import("./components/ErrorPages/ServerError/ServerError.jsx"),
);
const Logs = lazy(() => import("./pages/LogsPage/Logs.jsx"));
const Inventory = lazy(() => import("./pages/Inventory/Inventory.jsx"));
const Dashboard = lazy(() => import("./pages/DashBoard/Dashboard.jsx"));
const StaffManagement = lazy(
  () => import("./pages/StaffManagement/StaffManagement.jsx"),
);
const VipManagement = lazy(() => import("./pages/VIP/VipManagement.jsx"));

/* eslint-disable no-unused-vars */
export default function App() {
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
    deleteUser,
    updateUser,
    fetchUsers,
    input,
    changePasswordModal,
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
    yesNoModal,
    editProductModal,
    setEditProductModal,
    changesModal,
    setChangesModal,
    setUpdatedItem,
    editUserModal,
    setEditUserModal,
    timeInModal,
    setTimeInModal,
    viewBranch,
    setSelectedItem,
    screenLoading,
    setTransactConfirmModal,
    transactConfirmModal,
    showVipModal,
    showVipChangesModal,
    showVipDisableManyConfirm,
    setShowNewCategoryModal,
    showNewCategoryModal,
    showConfirmDeleteCategory
  } = ModalStore();
  const {
    setProductData,
    addNewProduct,
    //branches,
    //errorProduct,
    addLoading,
    deleteMultipleProducts,
    deleteProduct,
    updateProduct,
  } = ProductStore();
  const {
    showModalBranch,
    setShowModal,
    setBranchInput,
    newBranch,
    branches,
    selectedUsersToAdd,
    setSelectedUsers,
    removeUserFromBranch,
    deleteSelectedBranch,
    confirmDelete,
    setConfirmDelete,
  } = BranchStore();
  const { timeData } = TimeInOutStore();
  const {
    salesModal,
    setSalesModal,
    singleData,
    singleDataUnCleaned,
    loading,
    transactRefNo
  } = SalesStore();
  const {
    editVipModal,
    yesNoConfirmDelete
  } = VipStore();
  const {
    categories,
    getCategories
  } = CategoryStore();

  const { SERVER_ERROR, PROD_FAIL } = Strings;
  //const [currentRole, setCurrentRole] = useState("");
  const [deleteBranch, setDeleteBranch] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchUsers();
    getCategories();
  }, [checkAuth, fetchUsers, getCategories]);

  //BUG PAG NAG LOG OUT HINDI NAG REREDIRECT TO /LOGIN

  if (AuthLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const defaultRoute =
    AuthUser?.role.toLowerCase() === "clerk" ? "/timeinout" : "/dashboard";

  const postProduct = (e) => {
    e.preventDefault();
    addNewProduct();
  };

  const updateProductSelected = (e) => {
    e.preventDefault();
    updateProduct();
  };

  const updateUserSelected = (e) => {
    e.preventDefault();
    updateUser();
  };

  const addBranch = (e) => {
    e.preventDefault();
    newBranch(selectedUsersToAdd);
  };

  // const clearSelectedTime = () => {
  //   setTimeInModal(false);
  //   setSelectedItem(null);
  // }

  const showDeleteConfirmModal = () => {
    const tableData = {
      header: "Delete Data?",
      hasButton: true,
      CB: () =>
        url === "staff"
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
  const showUserModal = (isUpdate) => {
    const mainBranches = branches?.map((d) => d.location);
    //console.log(mainBranches);
    console.log(selectedItem);
    return (
      <Modal
        onClose={() => setShowAddModal(false) || setEditUserModal(false)}
        header={isUpdate ? "Update clerk" : "Add clerk"}
        subHeader={
          isUpdate
            ? "Update the details for the clerk"
            : "Fill in the details for the clerk"
        }
        hasCancel
        onCancel={() => setShowAddModal(false) || setEditUserModal(false)}
      >
        <InputForm
          onSubmit={(e) => {
            e.preventDefault();
            isUpdate ? updateUserSelected(e) : addUser(selectedItem?.role);
          }}
        >
          <InputRow gap={15} titles={["Username", "Email", "Password"]}>
            <InputField
              text
              placeholder="Enter Username"
              onChange={(value) => setInput("username", value)}
              value={isUpdate ? selectedItem.username : null}
              required
            />
            <InputField
              email
              placeholder="Enter Email"
              onChange={(value) => setInput("email", value.toLowerCase())}
              value={isUpdate ? selectedItem.email : null}
              required
            />
            {!isUpdate && (
              <InputField
                password
                placeholder="Enter Password"
                onChange={(value) => setInput("password", value)}
                required
              />
            )}
          </InputRow>
          <InputRow
            gap={15}
            titles={["First Name", "Middle Name", "Last Name"]}
          >
            <InputField
              text
              placeholder="Enter First Name"
              onChange={(value) => setInput("firstName", value)}
              value={isUpdate ? selectedItem.firstName : null}
              required
            />
            <InputField
              text
              placeholder="Enter Middle Name"
              onChange={(value) => setInput("middleName", value)}
              value={isUpdate ? selectedItem.middleName : null}
            />
            <InputField
              text
              placeholder="Enter Last Name"
              onChange={(value) => setInput("lastName", value)}
              value={isUpdate ? selectedItem.lastName : null}
              required
            />
          </InputRow>
          <InputRow gap={15} titles={["Phone Number", "Address", "Salary"]}>
            <InputField
              number
              maxLength={10}
              placeholder="(+63)"
              onChange={(value) => setInput("phoneNumber", value)}
              value={isUpdate ? selectedItem.phoneNumber : null}
              required
            />
            <InputField
              text
              placeholder="Enter Address"
              onChange={(value) => setInput("address", value)}
              value={isUpdate ? selectedItem.address : null}
              required
            />
            <InputField
              number
              placeholder="Enter Salary"
              onChange={(value) => setInput("salary", value)}
              value={isUpdate ? selectedItem.salary : null}
              required
            />
          </InputRow>
          <InputRow gap={15} titles={["Role", "Shift", "Gender"]}>
            <DropDown
              maxWidth
              options={["Admin", "Clerk"]}
              defaultValue="Role"
              onChange={(value) => {
                setInput("role", value);
                selectedItem.role = value;
              }}
              value={isUpdate ? selectedItem.role : null}
              isRequired
            />
            <DropDown
              maxWidth
              options={["Day", "Night"]}
              defaultValue="Shift"
              onChange={(value) => setInput("shift", value)}
              value={isUpdate ? selectedItem.shift : null}
              disabled={
                (selectedItem && selectedItem.role === "Admin") ||
                input.role === "Admin"
              }
              isRequired
            />
            <DropDown
              maxWidth
              options={["Male", "Female"]}
              defaultValue="Gender"
              onChange={(value) => setInput("gender", value)}
              value={isUpdate ? selectedItem.gender : null}
              isRequired
            />
          </InputRow>
          {isUpdate && (
            <InputRow gap={15} titles={["Branch"]}>
              <DropDown
                maxWidth
                options={mainBranches}
                defaultValue="Branch"
                onChange={(value) => setInput("branch", value)}
                value={isUpdate ? selectedItem.branchLocation : "N/A"}
                disabled={selectedItem.role === "Admin"}
                isRequired
              />
            </InputRow>
          )}
        </InputForm>
      </Modal>
    );
  };

  const showConfirmModal = () => {
    return (
      <ModalConfim
        message={`Deleted ${selectedItems.length} item/s`}
        onClose={() => setConfirmModal(false)}
      />
    );
  };

  const showTransactConfirmModal = () => {
    return (
      <ModalConfim
        message={`Order Successfull RefNo: ${transactRefNo}`}
        onClose={() => setTransactConfirmModal(false)}
      />
    );
  }

  const showYesNoModal = () => {
    console.log(selectedItem);
    return (
      <ModalYesNo
        message={`Are you sure you want to delete ${url === "staff" ? selectedItem.Username : selectedItem.Name}?`}
        message2={
          url === "staff"
            ? "This will delete the user from all branches."
            : "This will delete the product from all branches."
        }
        onClose={() => setYesNoModal(false)}
        onYes={() =>
          url === "staff"
            ? deleteUser(selectedItem.Id)
            : deleteProduct(selectedItem.Id)
        }
        loading={addLoading}
      />
    );
  };

  const showModalAddProduct = (isUpdate) => {
    //i request nalang yung product sa backend kesa kunin yung selecteditem store since di naman pala na store yung image link
    const mainBranches = branches?.map((d) => d.location);
    if (isUpdate && addLoading) {
      return <div>LOADING...</div>;
    }
    return (
      <>
        <Modal
          onClose={() => setModal(false) || setEditProductModal(false)}
          header={isUpdate ? "Update stock item" : "Add new stock item"}
          subHeader={
            isUpdate
              ? "Update the details for the stock item"
              : "Fill in the details for the new stock item"
          }
          hasCancel
          onCancel={() => setModal(false) || setEditProductModal(false)}
        >
          <InputForm
            isRequired
            onSubmit={(e) =>
              isUpdate ? updateProductSelected(e) : postProduct(e)
            }
            btnDisabled={addLoading}
          >
            <InputRow gap={15} titles={["ProductID"]}>
              <InputField
                placeholder="PRODUCT ID (auto generated)"
                disabled
                value={isUpdate ? selectedItem._id : null}
              />
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
                value={isUpdate ? selectedItem.productName : null}
              />
              <InputField
                number
                placeholder="200"
                onChange={(value) => setProductData("quantity", value)}
                value={isUpdate ? selectedItem.quantity : null}
              />
              <InputField
                number
                placeholder="$50"
                onChange={(value) => setProductData("price", value)}
                value={isUpdate ? selectedItem.price : null}
              />
            </InputRow>
            <InputRow
              titles={["Add New Category", "Category (required)", "Branch (required)"]}
              gap={15}
            >
              <Button
                maxWidth
                customBorder="2px solid #404040"
                cancel
                text="New Category"
                onClick={() => setShowNewCategoryModal(true)}
              />
              <DropDown
                maxWidth
                options={categories.map(d => d.categoryName)}
                onChange={(value) => setProductData("category", value)}
                defaultValue="Category"
                value={isUpdate ? selectedItem.category : null}
              />
              <DropDown
                maxWidth
                defaultValue="Branch"
                options={mainBranches}
                onChange={(value) => setProductData("productBranch", value)}
                value={isUpdate ? selectedItem.productBranch : null}
              />
            </InputRow>
            <InputRow titles={["Add file"]}>
              <TRAddfile
                image={isUpdate ? selectedItem.productImage : null}
                onChange={(value) => setProductData("image", value)}
              />
            </InputRow>
          </InputForm>
        </Modal>
      </>
    );
  };

  const viewUserChangesModal = () => {
    const { updatedItem, oldBranch } = ModalStore.getState();
    const { data, oldModel } = updatedItem;

    return (
      <Modal
        header="View Changes"
        subHeader="View the updated details of the user"
        onClose={() => setChangesModal(false)}
      >
        <InputRow gap={15}>
          <InputForm noBtn>
            <InputRow gap={15} titles={["Username", "Email"]}>
              <InputField
                text
                placeholder="Username"
                value={oldModel.username}
                disabled
              />
              <InputField
                text
                placeholder="Email"
                value={oldModel.email}
                disabled
              />
            </InputRow>
            <InputRow
              gap={15}
              titles={["First Name", "Middle Name", "Last Name"]}
            >
              <InputField
                text
                placeholder="First Name"
                value={oldModel.firstName}
                disabled
              />
              <InputField
                text
                placeholder="Middle Name"
                value={oldModel.middleName}
                disabled
              />
              <InputField
                text
                placeholder="Last Name"
                value={oldModel.lastName}
                disabled
              />
            </InputRow>
            <InputRow gap={15} titles={["Phone Number", "Address", "Salary"]}>
              <InputField
                text
                placeholder="First Name"
                value={oldModel.phoneNumber}
                disabled
              />
              <InputField
                text
                placeholder="Middle Name"
                value={oldModel.address}
                disabled
              />
              <InputField
                text
                placeholder="Last Name"
                value={oldModel.salary}
                disabled
              />
            </InputRow>
            <InputRow gap={15} titles={["Role", "Shift"]}>
              <InputField
                text
                placeholder="Role"
                value={oldModel.role}
                disabled
              />
              <InputField
                text
                placeholder="Shift"
                value={oldModel.shift}
                disabled
              />
            </InputRow>
            <InputRow gap={15} titles={["Gender", "Branch"]}>
              <InputField
                text
                placeholder="Gender"
                value={oldModel.gender}
                disabled
              />
              <InputField
                text
                placeholder="Branch"
                value={oldBranch}
                disabled
              />
            </InputRow>
          </InputForm>

          <InputForm noBtn>
            <InputRow gap={15} titles={["Username", "Email"]}>
              <InputField
                text
                placeholder="Username"
                value={data.username}
                color={oldModel.username !== data.username && "#22C55E"}
                disabled
              />
              <InputField
                text
                placeholder="Email"
                value={data.email}
                disabled
                color={oldModel.email !== data.email && "#22C55E"}
              />
            </InputRow>
            <InputRow
              gap={15}
              titles={["First Name", "Middle Name", "Last Name"]}
            >
              <InputField
                text
                placeholder="First Name"
                value={data.firstName}
                disabled
                color={oldModel.firstName !== data.firstName && "#22C55E"}
              />
              <InputField
                text
                placeholder="Middle Name"
                value={data.middleName}
                disabled
                color={oldModel.middleName !== data.middleName && "#22C55E"}
              />
              <InputField
                text
                placeholder="Last Name"
                value={data.lastName}
                disabled
                color={oldModel.lastName !== data.lastName && "#22C55E"}
              />
            </InputRow>
            <InputRow gap={15} titles={["Phone Number", "Address", "Salary"]}>
              <InputField
                text
                placeholder="First Name"
                value={data.phoneNumber}
                disabled
                color={oldModel.phoneNumber !== data.phoneNumber && "#22C55E"}
              />
              <InputField
                text
                placeholder="Middle Name"
                value={data.address}
                disabled
                color={oldModel.address !== data.address && "#22C55E"}
              />
              <InputField
                text
                placeholder="Last Name"
                value={data.salary}
                disabled
                color={oldModel.salary !== data.salary && "#22C55E"}
              />
            </InputRow>
            <InputRow gap={15} titles={["Role", "Shift"]}>
              <InputField
                text
                placeholder="Role"
                value={data.role}
                disabled
                color={oldModel.role !== data.role && "#22C55E"}
              />
              <InputField
                text
                placeholder="Shift"
                value={data.shift}
                disabled
                color={oldModel.shift !== data.shift && "#22C55E"}
              />
            </InputRow>
            <InputRow gap={15} titles={["Gender", "Branch"]}>
              <InputField
                text
                placeholder="Gender"
                value={data.gender}
                disabled
                color={oldModel.gender !== data.gender && "#22C55E"}
              />
              <InputField
                text
                placeholder="Branch"
                value={data.branchLocation}
                disabled
                color={oldBranch !== data.branchLocation && "#22C55E"}
                textColor="white"
              />
            </InputRow>
          </InputForm>
        </InputRow>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "end",
            justifyContent: "end",
            marginTop: "15px",
          }}
        >
          <Button
            success
            text="PROCEED"
            onClick={() => {
              setChangesModal(false);
              setUpdatedItem(null);
            }}
          />
        </div>
      </Modal>
    );
  };

  const viewProductChangesModal = () => {
    const { updatedItem } = ModalStore.getState();
    const { data, oldModel } = updatedItem;
    const oldData = oldModel[0];
    //console.log(updatedItem);
    return (
      <Modal
        header="View Changes"
        subHeader="View the updated details of the product"
        onClose={() => setChangesModal(false)}
      >
        <InputRow gap={15}>
          <InputForm noBtn>
            <InputRow gap={15} titles={["Product Id", "Product Name"]}>
              <InputField
                text
                placeholder="Product ID"
                disabled
                value={data._id}
              />
              <InputField
                text
                placeholder="Product Name"
                disabled
                value={oldData.productName}
              />
            </InputRow>
            <InputRow gap={15} titles={["Quantity", "Price"]}>
              <InputField
                number
                placeholder="Quantity"
                disabled
                value={data.quantity}
              />
              <InputField
                number
                placeholder="Price"
                disabled
                value={oldData.price}
              />
            </InputRow>
            <InputRow titles={["Category", "Branch"]} gap={15}>
              <InputField
                text
                placeholder="Category"
                disabled
                value={data.category}
              />
              <InputField
                text
                placeholder="Branch"
                disabled
                value={oldData.productBranch}
              />
            </InputRow>
            <InputRow titles={["Product Image"]} gap={15}>
              <TRAddfile image={oldData.productImage} disabled />
            </InputRow>
          </InputForm>
          <InputForm noBtn>
            <InputRow gap={15} titles={["Product Id", "Product Name"]}>
              <InputField
                text
                placeholder="Product ID"
                disabled
                value={data._id}
              />
              <InputField
                text
                placeholder="Product Name"
                color={oldData.productName !== data.productName && "#22C55E"}
                disabled
                value={data.productName}
              />
            </InputRow>
            <InputRow gap={15} titles={["Quantity", "Price"]}>
              <InputField
                number
                placeholder="Quantity"
                color={oldData.quantity !== data.quantity && "#22C55E"}
                disabled
                value={data.quantity}
              />
              <InputField
                number
                placeholder="Price"
                color={oldData.price !== data.price && "#22C55E"}
                disabled
                value={data.price}
              />
            </InputRow>
            <InputRow titles={["Category", "Branch"]} gap={15}>
              <InputField
                text
                placeholder="Category"
                color={oldData.category !== data.category && "#22C55E"}
                disabled
                value={data.category}
              />
              <InputField
                text
                placeholder="Branch"
                color={
                  oldData.productBranch !== data.productBranch && "#22C55E"
                }
                disabled
                value={data.productBranch}
              />
            </InputRow>
            <InputRow titles={["Product Image"]} gap={15}>
              <TRAddfile image={data.productImage} disabled />
            </InputRow>
          </InputForm>
        </InputRow>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "end",
            justifyContent: "end",
            marginTop: "15px",
          }}
        >
          <Button
            success
            text="PROCEED"
            onClick={() => {
              setChangesModal(false);
              setUpdatedItem(null);
            }}
          />
        </div>
      </Modal>
    );
  };

  const AddBranchModal = () => {
    const { users } = AuthStore.getState();

    const addToSelected = (data) => {
      const alreadyAdded = selectedUsersToAdd.some((d) => d.Id === data.Id);
      if (alreadyAdded) return toast.error("Already added this user");
      setSelectedUsers((prev) => [...prev, data]);
    };

    const removeFromSelected = (data) => {
      setSelectedUsers((prev) => prev.filter((d) => d.Id !== data.Id));
    };

    return (
      <Modal
        header="Add branches"
        subHeader="Add branches to your liking"
        onClose={() => setShowModal(false)}
      >
        <InputForm isRequired onSubmit={(e) => addBranch(e)}>
          <InputRow titles={["Set location"]}>
            <InputField
              text
              placeholder="Set Branch Location"
              onChange={(value) => setBranchInput("location", value)}
            />
          </InputRow>
          <Table
            data={selectedUsersToAdd || []}
            limit={4}
            onRowSelect={(e) => removeFromSelected(e)}
            noDataMessage="Add clerks here"
          />
          <Table data={users} limit={4} onRowSelect={(e) => addToSelected(e)} />
        </InputForm>
      </Modal>
    );
  };

  const confirmDeleteUserFromBranch = (deleteBranch) => {
    return (
      <ModalYesNo
        message={
          deleteBranch
            ? "Are you sure you want to remove this branch?"
            : `Are you sure you want to remove ${selectedItem.Username} from this branch?`
        }
        message2="This action will remove assigned clerk's respective branches"
        onClose={() => setConfirmDelete(false)}
        onYes={() =>
          deleteBranch
            ? deleteSelectedBranch(selectedItem)
            : removeUserFromBranch(selectedItem)
        }
      />
    );
  };

  const yesNoModalBranchDeleteUser = (data, isBranchDelete) => {
    setConfirmDelete(true);
    setSelectedItem(data);
    setDeleteBranch(isBranchDelete);
  };

  const viewBranchClerks = () => {
    const { selectedBranchView } = BranchStore.getState();
    const { setViewBranch } = ModalStore.getState();
    const clerks = selectedBranchView.clerks;

    const filteredClerks = clerks.map(({ branchLocation, ...rest }) => rest);

    return (
      <Modal
        header="View branch details"
        subHeader="View branch details and clerks"
        onClose={() => setViewBranch(false)}
      >
        <Table
          data={filteredClerks}
          hasAction
          onEdit={() => toast.error("Cant edit users")}
          onDelete={(e) => yesNoModalBranchDeleteUser(e, false)}
          noDataMessage="No clerks found"
        />
        <InputRow>
          <Button
            text="DELETE BRANCH"
            error
            onClick={() => yesNoModalBranchDeleteUser(selectedBranchView, true)}
          />
        </InputRow>
      </Modal>
    );
  };

  const viewSalesRecordModal = () => {
    if (!singleDataUnCleaned && loading) return null;
    
    const {
      amountPaid,
      branchLocation,
      clerkName,
      dateTime,
      itemSold,
      total,
      change,
      vip,
      purchasedBy,
      discountAmount,
      usedDiscount
    } = singleDataUnCleaned;
    console.log(singleDataUnCleaned);
    return (
      <Modal
        header="View Transaction Record"
        onClose={() => setSalesModal(false)}
      >
        <InputForm noBtn>
          <InputRow
            titles={["Amount Paid", "Total", "Change", "Item/s Sold"]}
            gap={15}
          >
            <InputField
              text
              placeholder="Amount Paid"
              value={Number(amountPaid).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              disabled
            />
            <InputField
              text
              placeholder="Total"
              value={Number(total).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              disabled
            />
            <InputField
              text
              placeholder="Change"
              value={Number(change).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              disabled
            />
            <InputField
              text
              placeholder="Items Sold"
              value={itemSold}
              disabled
            />
          </InputRow>
          <InputRow
            titles={["Clerk", "Branch", "Date Processed", "Is VIP?"]}
            gap={15}
          >
            <InputField text placeholder="Clerk" value={clerkName} disabled />
            <InputField
              text
              placeholder="Branch"
              value={branchLocation}
              disabled
            />
            <InputField
              text
              placeholder="Date Processed"
              value={dateTime}
              disabled
            />
            <InputField
              text
              placeholder="VIP"
              value={vip}
              disabled
            />
          </InputRow>
          <InputRow>
            <Table data={singleData || []} isLoading={loading} limit={5}/>
          </InputRow>
          {purchasedBy && (
            <>
            <InputRow titles={['VIP ID', 'Email', 'Contact No', 'Is Active?']} gap={16}>
              <InputField
                text
                placeholder="VIP ID"
                value={purchasedBy._id}
                disabled
              />
              <InputField
                text
                placeholder="EMAIL"
                value={purchasedBy.email}
                disabled
              />
              <InputField
                text
                placeholder="CONTACT NO"
                value={purchasedBy.contactNo}
                disabled
              />
              <InputField
                text
                placeholder="IS ACTIVE"
                value={purchasedBy.status}
                disabled
              />
            </InputRow>
            <InputRow gap={16} titles={['First Name', 'Middle Name', 'Last Name', 'Points Used']}>
              <InputField
                text
                placeholder="FIRST NAME"
                value={purchasedBy.firstName}
                disabled
              />
              <InputField
                text
                placeholder="MIDDLE NAME"
                value={purchasedBy.middleName}
                disabled
              />
              <InputField
                text
                placeholder="LAST NAME"
                value={purchasedBy.lastName}
                disabled
              />
              <InputField
                text
                placeholder={usedDiscount === 'No' ? 'Vip did not use discount' : 'Points used'}
                value={discountAmount}
                disabled
              />
            </InputRow>
            </>
          )}
        </InputForm>
      </Modal>
    );
  };

  const viewTimeRecordModal = () => {
    const totalHours = timeData.reduce(
      (acc, record) => acc + (record.totalHours || 0),
      0,
    );
    return (
      <Modal
        onClose={() => setTimeInModal(false)}
        header={`${selectedItem.employeeName}'s time logs.`}
        subHeader={`Total hours: ${totalHours}`}
      >
        <Table data={timeData} />
      </Modal>
    );
  };

  const showToastError = (type) => {
    switch (type) {
      case "product":
        return <Toast error message={PROD_FAIL} />;
      case "user":
        return <Toast error message={SERVER_ERROR} />;
    }
  };

  // const showModalEditItem = () => {
  //   return (
  //     <ModalEditItem

  //     />
  //   );
  // }


  const returnModals = () => {
    const location = () => {
      const hash = window.location.hash.replace('#', '')
      if (changesModal && hash === "/staff") {
        return viewUserChangesModal();
      } else if (changesModal && hash === "/inventory") {
        return viewProductChangesModal();
      }
    };

    return (
      <>
        {location()}
        {deleteModal && selectedItems.length > 0
          ? showDeleteConfirmModal()
          : null}
        {isOpen && showModalAddProduct(false)}
        {showAddModal && showUserModal()}
        {confirmModal && showConfirmModal()}
        {yesNoModal && showYesNoModal()}
        {editProductModal && showModalAddProduct(true)}
        {editUserModal && showUserModal(true)}
        {showModalBranch && AddBranchModal()}
        {timeInModal && viewTimeRecordModal()}
        {viewBranch && viewBranchClerks()}
        {confirmDelete && confirmDeleteUserFromBranch(deleteBranch)}
        {salesModal && viewSalesRecordModal()}
        {transactConfirmModal && showTransactConfirmModal()}
        {showVipModal && addVipUser()}
        {editVipModal && editMainVipModal()}
        {showVipChangesModal && confirmChangesVipModal()}
        {yesNoConfirmDelete && confirmDeleteVip()}
        {showVipDisableManyConfirm && disableManyConfirmModal()}
        {showNewCategoryModal && newCategoryModal()}
        {showConfirmDeleteCategory && deleteCategoryConfirm()}
        {changePasswordModal && viewChangePasswordModal()}
      </>
    );
  };

  //ROUTING
  return (
    <>
      {screenLoading && <ScreenLoading />}
      {returnModals()}
      <Toaster position="bottom-right" />
      <Suspense fallback={<Loading />}>
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
                <Navigate to="/timeinout" replace />
              ) : !AuthUser ? (
                <Navigate to="/login" replace />
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
              !AuthUser ? (
                <Navigate to="/login" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <Inventory user={AuthUser} />
                </Sidebar>
              )
            }
          />

          <Route
            path="/staff"
            element={
              AuthUser?.role.toLowerCase() === "clerk" ? (
                <Navigate to="/timeinout" replace />
              ) : !AuthUser ? (
                <Navigate to="/login" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <StaffManagement />
                </Sidebar>
              )
            }
          />

          <Route
            path="/vip"
            element={
              !AuthUser ? (
                <Navigate to="/login" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <VipManagement />
                </Sidebar>
              )
            }
          />

          <Route
            path="/pos"
            element={
              !AuthUser ? (
                <Navigate to="/login" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <POS />
                </Sidebar>
              )
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
                <Navigate to="/timeinout" replace />
              ) : !AuthUser ? (
                <Navigate to="/login" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <Branches />
                </Sidebar>
              )
            }
          />

          <Route
            path="/timeinout"
            element={
              AuthUser?.role.toLowerCase() === "admin" ? (
                <Navigate to="/dashboard" replace />
              ) : !AuthUser ? (
                <Navigate to="/login" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <TimeInOut />
                </Sidebar>
              )
            }
          />

          <Route
            path="/logs"
            element={
              AuthUser?.role.toLowerCase() === "clerk" ? (
                <Navigate to="/timeinout" replace />
              ) : !AuthUser ? (
                <Navigate to="/login" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <Logs />
                </Sidebar>
              )
            }
          />

          <Route
            path="/settings"
            element={
              AuthUser?.role.toLowerCase() === "clerk" ? (
                <Navigate to="/timeinout" replace />
              ) : !AuthUser ? (
                <Navigate to="/login" replace />
              ) : (
                <Sidebar user={AuthUser}>
                  <SettingsPage />
                </Sidebar>
              )
            }
          />

          <Route path='/customer-vip' element={<CustomerLogin/>}/>
          {/* NO URL AND ERROR */}
          <Route path="*" element={<URLError />} />
          <Route path="/servererror" element={<ServerError />} />
        </Routes>
      </Suspense>
    </>
  );
}
