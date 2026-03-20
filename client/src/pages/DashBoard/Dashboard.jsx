import React from "react";
import Toast from "../../toast/Toast";
import "./Dashboard.css";
import LowStockItems from "../../components/LowStockItems/LowStockItems";

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

  render() {
    const { toast } = this.state;

    return (
      <div>
        <h1>dashboard</h1>
        <button
          onClick={() =>
            this.showToast("Action completed.", false, () => this.hideToast())
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
        <LowStockItems lowStockItems={['test1', 'test2', 'test3', 'test3', 'test4', 'test5', 'test6', 'test7']}/>
      </div>
    );
  }
}

export default Dashboard;
