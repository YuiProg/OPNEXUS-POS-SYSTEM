import React from "react";
import Toast from "../../toast/Toast";
import "./Dashboard.css";
import TodaysSales from "../../components/DashboardComponents/TodaysSales/TodaysSales";
import TodaysRevenue from "../../components/DashboardComponents/TodaysRevenue/TodaysRevenue";
import DonutChart from "../../components/DashboardComponents/Charts/DonutChart";
import Notes from "../../components/Notes/Notes";
import StaffCount from "../../components/DashboardComponents/StaffCount/StaffCount";
import RecentActivity from "../../components/DashboardComponents/RecentActivity/RecentActivity";
import AuthStore from "../../context/Authstore";
import BarsChart from "../../components/DashboardComponents/Charts/BarsChart";
import TopProducts from "../../components/DashboardComponents/TopProducts/TopProducts";
import BranchStore from "../../context/BranchStore";
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

  componentDidMount() {
    const { getBranch } = BranchStore.getState();
    const { getActiveUsers } = AuthStore.getState();
    getActiveUsers();
    getBranch();
  }

  render() {
    const { activeUsers, recentActivity, setSelectedBranch, selectedBranch } = AuthStore.getState();
    const { branches } = BranchStore.getState();
    const branchNames = branches.map((d) => d.location);

    const active = activeUsers.filter((d) => d.role === "Clerk");

    return (
      <PanelPage
        user={this.props.user} 
        titlePage="Dashboard"
        subTitle="Overview of system activity and performance."
        hasBranch={true} 
        branchNames={branchNames}
        dropDownFunc={(e) => setSelectedBranch(e)}
        selectedBranch={selectedBranch}
      >
        <div className="dashboard-contents">
          {/* Top KPI Metrics Block */}
          <div className="top-three-contents">
            <StaffCount activeClerks={active.length} />
            <TodaysRevenue />
            <RecentActivity activity={recentActivity} />
          </div>

          {/* Main Analytics Block */}
          <div className="dashboard-container__graph-container">
            <div className="dashboard-container__chart-wrapper">
              <BarsChart />
            </div>
            <DonutChart />
            <Notes />
          </div>

          {/* Bottom Products & Sales Block */}
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