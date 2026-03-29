import React from "react";
import Toast from "../../toast/Toast";
import "./Dashboard.css";
import TodaysSales from "../../components/DashboardComponents/TodaysSales/TodaysSales";
import LowStockItems from "../../components/LowStockItems/LowStockItems";
import StocksDB from "../../components/DashboardComponents/StocksIcon/StocksDB";
import TodaysRevenue from "../../components/DashboardComponents/TodaysRevenue/TodaysRevenue";
import DropDown from "../../components/TRDropDown/Dropdown";
import InputField from "../../components/TRInputField/InputFIeld";
import DonutChart from "../../components/DashboardComponents/Charts/DonutChart";
import ActiveClerks from "../../components/DashboardComponents/ActiveClerks/ActiveClerks";
import Notes from "../../components/Notes/Notes";
import StaffCount from "../../components/DashboardComponents/StaffCount/StaffCount";
import RecentActivity from "../../components/DashboardComponents/RecentActivity/RecentActivity";
import LinesChart from "../../components/DashboardComponents/Charts/BarsChart";
import AuthStore from "../../context/Authstore";
import BarsChart from "../../components/DashboardComponents/Charts/BarsChart";
import TopProducts from "../../components/DashboardComponents/TopProducts/TopProducts";

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
    const { onlineUsers } = AuthStore.getState();

    const active = onlineUsers.filter((d) => d.role === "Clerk");
    return (
      <div className="dashboard-container">
        {/* HELLO WHAT DO YOU WANT TO DO KEME KEME SECTION */}
        <div className="db-top-contents">
          <div className="db-header">
            <h1 className="db-bigtitle">Dashboard</h1>
            <p className="db-sentence">Overview of system activity and performance.</p>
          </div>
          <div className="db-branch-dropdown">
            <p className="db-branch-text">Branch</p>
            <DropDown 
              className="db-branch-dd"
              options={["longos", "bulacan", "hagonoy"]} 
            />
          </div>
        </div>
        {/* GREEN CONTAINER */}
        <div className="top-three-contents">
          <StaffCount activeClerks={active.length}/>
          <TodaysRevenue />
          <RecentActivity />
        </div>
        {/* BLUE CONTAINER */}
        <div className="dashboard-container__graph-container">
          {/* DITO MACKY DAPAT YUNG STATISTICS PERO WALA */}
          <div>{<BarsChart />}</div>
          <DonutChart />
          <Notes />
        </div>
        {/* VIOLET CONTAINER */}
        <div className="todays-sales__top-products">
          <TodaysSales />
          <TopProducts />
        </div>
      </div>
    );
  }
}

export default Dashboard;
