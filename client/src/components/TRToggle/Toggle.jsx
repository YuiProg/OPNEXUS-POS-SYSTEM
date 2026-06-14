import React from "react";
import "./Toggle.css";
/**
 * @class
 * @component
 */
export class Toggle extends React.Component {
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
    const { isChecked, hideLabel } = this.props;
    return (
      <div className="toggle-container">
        <div className="toggle-btn">
          <label className="toggle-btn-control">
            <input 
              type="checkbox"
              checked={isActive || isChecked}
              onChange={this.handleToggle}
            />
            <span className="toggle-switch"></span>
          </label>
          {!hideLabel && (
            <p className={`toggle-subtitle ${isActive ? 'ACTIVE' : 'INACTIVE'}`}>
              {isActive ? "Active" : "Inactive"}
            </p>
          )}
        </div>
      </div>
    );
  }
}
/**
 * @class
 * @component
 */
export class BooleanToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue ?? false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.value !== undefined &&
      prevProps.value !== this.props.value
    ) {
      this.setState({ value: this.props.value });
    }
  }

  getValue() {
    return this.props.value !== undefined
      ? this.props.value
      : this.state.value;
  }

  handleToggle = () => {
    const newValue = !this.getValue();
    this.setState({ value: newValue });
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
  };

  render() {
    const value = this.getValue();
    const { hideLabel } = this.props;

    return (
      <div className="toggle-container">
        <div className="toggle-btn">
          <label className="toggle-btn-control">
            <input
              type="checkbox"
              checked={value}
              onChange={this.handleToggle}
            />
            <span className="toggle-switch"></span>
          </label>
          {!hideLabel && (
            <p className={`toggle-subtitle ${value ? "true" : "false"}`}>
              {String(value)}
            </p>
          )}
        </div>
      </div>
    );
  }
}

