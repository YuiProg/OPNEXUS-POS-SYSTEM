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
import PanelPage from "../../components/TRPanelPage/TRPanelPage";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      isAdmin: false,
      showModal: false,
      isOpen: ModalStore.getState().isOpen,
      products: []
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
      this.setState({products: products});
      // const cleanedData = data.map(({ createdAt, updatedAt, createdById, _id, __v, ...rest }) => rest);
      // this.setState({ products: cleanedData });
      //console.log(this.state.products);
    });
    //console.log(products);
    //this.setState({products: products});
    // this.unsubscribeModal = ModalStore.subscribe((state) => {
    //   this.setState({ isOpen: state.isOpen });
    // });

  }

  componentWillUnmount() {
    const {unsubscribeToProducts} = ProductStore.getState();
    unsubscribeToProducts();
    if (this.unsubscribeModal) this.unsubscribeModal();
  }

  handleTableSearch = (value) => {
    this.setState({ searchValue: value });
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

  render() {
    //const { setEditProductModal } = ModalStore.getState();
    const { user } = this.props;
    const { fetchLoading } = ProductStore.getState();
    const {setSelectedBranch, selectedBranch} = AuthStore.getState();
    const { branches } = BranchStore.getState();
    const branchNames = branches.map(d=>d.location);
    
    const tableData = {
      header: "ITEMS TEST",
      hasButton: this.state.isAdmin,
      CB: () => ModalStore.getState().setModal(true),
      buttonInfo: "NEW ITEM",
      search: (
        <InputField
          placeholder="Search item"
          isSearch
          onEnterDown={value => this.handleTableSearch(value)}
        />
      ),
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
        >
            <Table
              data={this.state.products}
              isDetailed={tableData}
              hasAction={this.state.isAdmin}
              hasSelect={this.state.isAdmin}
              onDelete={(item) => this.showDeleteModal(item)}
              onEdit={(item) => this.showEditModal(item)}
              search={this.state.searchValue}
              isLoading={fetchLoading}
            />
        </PanelPage>
    );
  }
}

export default Inventory;