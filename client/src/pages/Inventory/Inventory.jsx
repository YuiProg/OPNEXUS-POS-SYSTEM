import React from "react";
import "./Inventory.css";
import { Table } from "../../components/TRTable/TrTable";
import InputField from "../../components/TRInputField/InputFIeld";
import DropDown from "../../components/TRDropDown/Dropdown";
import AuthStore from "../../context/Authstore";
import { Modal } from "../../TRModal/Modal";
import { InputRow, TRInputFormPanel, InputForm } from "../../components/TRInputForm/TRInputForm";
import ModalStore from "../../context/ModalStore";
import ProductStore from "../../context/ProductStore";
import toast from "react-hot-toast";
import BranchStore from "../../context/BranchStore";
import { PanelPage, RightPanel } from "../../components/TRPanelPage/TRPanelPage";
import { Link } from "react-router-dom";
import SettingsStore from "../../context/SettingsStore";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      showModal: false,
      isOpen: ModalStore.getState().isOpen,
      products: [],
      filtersOpen: false,
    };
  }

  checkRole = () => {
    const { AuthUser } = AuthStore.getState();
    if (AuthUser.role.toLowerCase() === "admin") {
      this.setState({ isAdmin: true });
    }
  }

  componentDidMount() {
    const { fetchProducts, subscribeToProducts } = ProductStore.getState();
    const { user } = this.props;
    const { getBranch } = BranchStore.getState();
    this.checkRole();
    getBranch();
    if (user.role === 'Clerk') {
      fetchProducts(true, user.branchLocation);
    } else {
      fetchProducts(false, user.branchLocation);
    }
    subscribeToProducts();

    this.unsubscribe = ProductStore.subscribe((state) => {
      const products = state.products;
      this.setState({ products: products });
    });
  }

  componentWillUnmount() {
    const { unsubscribeToProducts } = ProductStore.getState();
    unsubscribeToProducts();
    if (this.unsubscribeModal) this.unsubscribeModal();
  }

  showDeleteModal = (item) => {
    const { setSelectedItem, setYesNoModal, setUrl } = ModalStore.getState();
    setSelectedItem(item);
    setYesNoModal(true);
    setUrl("inventory");
  }

  showConfirmDelModal = (e) => {
    const { setDeleteModal, setSelectedItems, setUrl } = ModalStore.getState();
    setDeleteModal(true);
    setSelectedItems(e);
    setUrl("inventory");
  }

  showEditModal = async (item) => {
    const { setSelectedItem, setEditProductModal } = ModalStore.getState();
    const { fetchProductSingle } = ProductStore.getState();
    try {
      const product = await fetchProductSingle(item.Id);
      setSelectedItem(product.data[0]);
      setEditProductModal(true);
      console.log(product.data[0]);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  rightSideFilters = () => {
    const { branches } = BranchStore.getState();
    const branchNames = branches.map(d => d.location);
    return (
          <RightPanel>
            <InputForm>
              <InputRow titles={['Search Item Id']}>
                <InputField
                  placeholder="Search Item Id"
                  isSearch
                />
              </InputRow>
              <InputRow titles={['Search Name']}>
                <InputField
                  placeholder="Search Name"
                  isSearch
                />
              </InputRow>
              <InputRow titles={['Quantity']}>
                <InputField
                  number
                  placeholder="Enter quantity"
                />
              </InputRow>
              <InputRow titles={['Price']}>
                <InputField
                  number
                  placeholder="Enter price"
                />
              </InputRow>
              <InputRow titles={['Filter by Category']}>
                <DropDown
                  placeholder="Select Category"
                  options={branchNames}
                />
              </InputRow>
            </InputForm>
          </RightPanel>
    );
  }

  render() {
    const { user } = this.props;
    const { fetchLoading } = ProductStore.getState();
    const { setSelectedBranch, selectedBranch } = AuthStore.getState();
    const { branches } = BranchStore.getState();
    const branchNames = branches.map(d => d.location);

    const tableData = {
      header: "ITEMS",
      hasButton: this.state.isAdmin,
      CB: () => this.props.navigate('/inventory/add'),
      buttonInfo: "NEW ITEM",
      hasDelete: true,
      deleteBtnInfo: "Delete",
      CBD: (e) => this.showConfirmDelModal(e)
    };

    return (
      <PanelPage
        branchNames={branchNames}
        selectedBranch={selectedBranch}
        dropDownFunc={(e) => setSelectedBranch(e)}
        user={user}
        titlePage="Stock Overview"
        subTitle="Manage stock, items, and quantities."
        hasBranch={true}
        hasTableFilters={true}
        onFilterToggle={(isOpen) => this.setState({ filtersOpen: isOpen })}
        filtersOpen={this.state.filtersOpen}
        rightPanel={this.rightSideFilters()}
      >
        <Table
          data={this.state.products}
          isDetailed={tableData}
          hasAction={this.state.isAdmin}
          hasSelect={this.state.isAdmin}
          onDelete={(item) => this.showDeleteModal(item)}
          onEdit={(item) => this.showEditModal(item)}
          isLoading={fetchLoading}
        />
        {/* {this.state.filtersOpen && (
          this.rightSideFilters()
        )} */}
      </PanelPage>
    );
  }
}

export default Inventory;