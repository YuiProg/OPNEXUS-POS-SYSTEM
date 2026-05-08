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
import BranchStore from "../../context/BranchStore";
import DashboardStore from "../../context/DashboardStore";
import { PanelPage } from "../../components/TRPanelPage/TRPanelPage";

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

  componentDidMount () {
    const {getBranch} = BranchStore.getState();
    getBranch();
  }


  // testonchange = (test) => {
  //   console.log(test);
  // }

  render() {
    const { onlineUsers, recentActivity, setSelectedBranch, selectedBranch } = AuthStore.getState();
    const {branches} = BranchStore.getState();
    const branchNames = branches.map(d=>d.location);

    const active = onlineUsers.filter((d) => d.role === "Clerk");
    return (
      <PanelPage
        user={this.props.user} 
        titlePage="Dashboard"
        subTitle="Overview of system activity and performance."
        hasBranch={true} 
        branchNames={branchNames}
        dropDownFunc={(e) => setSelectedBranch(e)}
        branchNames={branchNames}
        selectedBranch={selectedBranch}
      >
        <div className="dashboard-contents">
          <div className="top-three-contents">
            <StaffCount activeClerks={active.length}/>
            <TodaysRevenue />
            <RecentActivity activity={recentActivity}/>
          </div>
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
      </PanelPage>
    );
  }
}

export default Dashboard;
