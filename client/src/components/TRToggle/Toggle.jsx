import React from "react";
import "./Toggle.css";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: props.currentStatus || "ACTIVE" };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentStatus !== this.props.currentStatus) {
      this.setState({ status: this.props.currentStatus });
    }
  }

  handleToggle = () => {
    const newStatus = this.state.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    this.setState({ status: newStatus });
    if (this.props.onToggle) {
      this.props.onToggle(newStatus);
    }
  };

  render() {
    const isActive = this.state.status === "ACTIVE";
    return (
      <div className="toggle-container">
        <div className="toggle-btn">
          <label className="toggle-btn-control">
            <input 
              type="checkbox"
              checked={isActive}
              onChange={this.handleToggle}
            />
            <span className="toggle-switch"></span>
          </label>
          <p className={`toggle-subtitle ${isActive ? 'active' : 'inactive'}`}>
            {isActive ? "Active" : "Inactive"}
          </p>
        </div>
      </div>
    );
  }
}

export default Toggle;