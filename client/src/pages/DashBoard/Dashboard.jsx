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
import {Table} from "../../components/TRTable/TrTable";
import DonutChart from "../../components/DashboardComponents/Charts/DonutChart";
import ActiveClerks from "../../components/DashboardComponents/ActiveClerks/ActiveClerks";

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
    return (
      <div className="dashboard-container">
        {/* HELLO WHAT DO YOU WANT TO DO KEME KEME SECTION */}
        <div>
          <h1>Hello, What do you want to today?</h1>
          <p>Branch</p>
          <DropDown options={['longos', 'bulacan', 'hagonoy']}/>
        </div>
        {/* GREEN CONTAINER */}
        <div>
          <ActiveClerks/>
          <TodaysRevenue/>
          <Recentactivity/>
        </div>
        {/* BLUE CONTAINER */}
        <div>
          <DonutChart/>
        </div>
        {/* VIOLET CONTAINER */}
        <div>
          <TodaysSales/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
