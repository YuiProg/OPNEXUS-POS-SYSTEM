import React from "react";
import Toast from "../../toast/Toast";
import "./Dashboard.css";
import TodaysSales from "../../components/DashboardComponents/TodaysSales/TodaysSales";
import LowStockItems from "../../components/LowStockItems/LowStockItems";
import StocksDB from "../../components/DashboardComponents/StocksIcon/StocksDB";
import TodaysRevenue from "../../components/DashboardComponents/TodaysRevenue/TodaysRevenue";
import DropDown from "../../components/DropDown/Dropdown";
import Recentactivity from "../../components/RecentActivity/Recentactivity";
import InputField from "../../components/InputField/InputFIeld";


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

  testonchange = (test) => {
    console.log(test);
  }

  render() {
    const { toast } = this.state;

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
        <InputField placeholder='Enter name' required text onChange={value => this.testonchange(value)}/>
        {/* <DropDown options={['test1', 'test2']} onChange={(test) => this.testonchange(test)}/> */}
      </div>
    );
  }
}

export default Dashboard;
