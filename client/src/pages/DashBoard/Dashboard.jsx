import React from "react";
import Toast from "../../toast/Toast";
import "./Dashboard.css";
import TodaysSales from "../../components/DashboardComponents/TodaysSales/TodaysSales";
import LowStockItems from "../../components/LowStockItems/LowStockItems";
import StocksDB from "../../components/DashboardComponents/StocksIcon/StocksDB";
import TodaysRevenue from "../../components/DashboardComponents/TodaysRevenue/TodaysRevenue";
import DropDown from "../../components/TRDropDown/Dropdown";
import Recentactivity from "../../components/RecentActivity/Recentactivity";
import InputField from "../../components/TRInputField/InputFIeld";
import {TableWrapper} from "../../components/TRTable/TrTable";
import DonutChart from "../../components/DashboardComponents/Charts/DonutChart";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: null,
    };
  }

  showToast = (message, hasButton = false, CB = null) => {
    this.setState({ toast: { message, hasButton, CB } });
  };

  hideToast = () => {
    this.setState({ toast: null });
  };

  // testonchange = (test) => {
  //   console.log(test);
  // }

  render() {
    const { toast } = this.state;

    //const headers = ['productid', 'name', 'quantity'];
    const tableData = {
      header: 'Products', 
      hasButton: true, 
      CB: (data) => console.log(data), 
      buttonInfo: 'New', 
      search: <InputField placeholder="Search item" isSearch onEnterDown={(e) => console.log(e)}/>
    };

    return (
      <div className="dashboard-container">
        <h1>dashboard</h1>
        <button
          onClick={() =>
            this.showToast("Action completed.", true, () => this.hideToast())
          }
        >
          TEST
        </button>
        {toast && (
          <Toast
            success
            message={toast.message}
            hasButton={toast.hasButton}
            CB={toast.CB}
            onClose={this.hideToast}
          />
        )}

        <TableWrapper data={
            [
              {productid: 32, name: 'test', quantity: 23},
              {productid: 213, name: 'test2', quantity: 23},
              {productid: 213, name: 'test2', quantity: 23},
              {productid: 213, name: 'test2', quantity: 23},
              {productid: 213, name: 'test2', quantity: 23}
            ]
          } 
          hasSelect
          onEdit={() => {}}
          onDelete={() => {}}
          hasAction
          isDetailed={tableData}
          width={100}
        />
        <InputField placeholder='Enter name' required text onChange={() => {}} onEnterDown={(e) => console.log(e)}/>
        <DonutChart />
        {/* <InputField placeholder='Enter name' required text onChange={value => this.testonchange(value)}/> */}
        {/* <DropDown options={['test1', 'test2']} onChange={(test) => this.testonchange(test)}/> */}
      </div>
    );
  }
}

export default Dashboard;
