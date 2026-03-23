import React from "react";
import "./Inventory.css";
import { Table } from "../../components/TRTable/TrTable";
import InputField from "../../components/TRInputField/InputFIeld";
import DropDown from "../../components/TRDropDown/Dropdown";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
  }

  checkRole = () => {
    const { user } = this.props;

    console.log(user);
  }

  componentDidMount() {
    this.checkRole();
  }

  render() {

    const tableData = {
      header: "In stock",
      hasButton: true,
      CB: (data) => console.log(data),
      buttonInfo: "New",
      search: (
        <InputField
          placeholder="Search item"
          isSearch
          onEnterDown={(e) => console.log(e)}
        />
      ),
    };

    return (
      <div className="inventory-container">
        <div className="top-contents">
            <h1 className="bigtitle">Hello, What do you want to do today?</h1>
            <div className="branch-dropdown">
              <p className="branch-text">Branch</p>
              <DropDown className="branch-dd"/>
            </div>
        </div>
        <div>
            <Table
                data={[
                    { productid: 32, name: "test", quantity: 23 },
                    { productid: 213, name: "test2", quantity: 23 },
                    { productid: 213, name: "test2", quantity: 23 },
                    { productid: 213, name: "test2", quantity: 23 },
                    { productid: 213, name: "test2", quantity: 23 },
                ]}
                isDetailed={tableData}
                hasAction
                hasSelect
                onDelete={() => {}}
                onEdit={() => {}}
            />
        </div>
        
      </div>
    );
  }
}

export default Inventory;
