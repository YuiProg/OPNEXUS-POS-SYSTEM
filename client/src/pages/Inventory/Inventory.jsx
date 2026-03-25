import React from "react";
import "./Inventory.css";
import { Table } from "../../components/TRTable/TrTable";
import InputField from "../../components/TRInputField/InputFIeld";
import DropDown from "../../components/TRDropDown/Dropdown";
import AuthStore from "../../store/Authstore";
import { Modal } from "../../TRModal/Modal";
import { InputRow, TRInputFormPanel, InputForm } from "../../components/TRInputForm/TRInputForm";
import ModalStore from "../../store/ModalStore";
import ProductStore from "../../store/ProductStore";

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
    if (AuthUser.role === "admin") {
      this.setState({ isAdmin: true });
    }
  }

  componentDidMount() {
    const { fetchProducts } = ProductStore.getState();
    this.checkRole();
    fetchProducts();
    
    this.unsubscribe = ProductStore.subscribe((state) => {
      const {data} = state.products;
      // eslint-disable-next-line no-unused-vars
      const cleanedData = data.map(({ createdAt, updatedAt, createdById, _id, __v, ...rest }) => rest);
      this.setState({ products: cleanedData });
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
    };

    return (
      <>
        <div className="inventory-container">
          <div className="top-contents">
            <h1 className="bigtitle">Hello, What do you want to do today?</h1>
            <div className="branch-dropdown">
              <p className="branch-text">Branch</p>
              <DropDown className="branch-dd" />
            </div>
          </div>
          <div>
            <Table
              data={this.state.products}
              isDetailed={tableData}
              hasAction={this.state.isAdmin}
              hasSelect={this.state.isAdmin}
              onDelete={() => {}}
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