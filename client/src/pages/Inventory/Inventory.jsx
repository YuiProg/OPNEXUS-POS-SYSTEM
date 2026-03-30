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

  componentDidUpdate() {
    
  }

  componentDidMount() {
    const { fetchProducts } = ProductStore.getState();
    this.checkRole();
    fetchProducts();
    
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

  render() {

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
      <>
        <div className="inventory-container">
          <div className="iv-top-contents">
            <div className="iv-header">
              <h1 className="iv-bigtitle">Stock Overview</h1>
              <p className="iv-sentence">Manage stock, items, and quantities.</p>
            </div>
            <div className="iv-branch-dropdown">
              <p className="iv-branch-text">Branch</p>
              <DropDown className="iv-branch-dd" />
            </div>
          </div>
          <div>
            <Table
              data={this.state.products}
              isDetailed={tableData}
              hasAction={this.state.isAdmin}
              hasSelect={this.state.isAdmin}
              onDelete={(item) => this.showDeleteModal(item)}
              onEdit={() => {}}
              search={this.state.searchValue}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Inventory;