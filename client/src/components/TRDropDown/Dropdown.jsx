import React from "react";
import "./Dropdown.css";
import { Warehouse, ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: (this.props.value && this.props.value !== "N/A") ? this.props.value : "",
      isOpen: false
    };
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && this.props.value !== undefined) {
      this.setState({
        value: this.props.value === "N/A" ? "" : this.props.value
      });
    }
  }

  toggleDropdown = () => {
    if (!this.props.disabled) {
      this.setState({ isOpen: !this.state.isOpen });
    }
  };

  selectOption = (option) => {
    this.setState({ value: option, isOpen: false });
    this.props.onChange(option);
  };

  render() {
    const { options, defaultValue, isRequired, disabled, isHeader } = this.props;
    const { value, isOpen } = this.state;

    const displayValue = value || (defaultValue ? `Select ${defaultValue}...` : "Select Branch...");

    return (
      <div className="tr-dropdown-wrapper" ref={this.wrapperRef}>
        <button
          className={`tr-dropdown-button ${disabled ? "disabled" : ""}`}
          onClick={this.toggleDropdown}
          type="button"
          required={isRequired}
          disabled={disabled}
        >
          <Warehouse className="tr-dropdown-icon" />
          <span className="tr-dropdown-text">{displayValue}</span>
          <ChevronDown className={`tr-dropdown-chevron ${isOpen ? "open" : ""}`} />
        </button>

        {isOpen && (
          <ul className="tr-dropdown-list">
            {isHeader && (
              <li
                className="tr-dropdown-item"
                onClick={() => this.selectOption("all")}
              >
                Select All
              </li>
            )}
            {options?.map((option, i) => (
              <li
                key={i}
                className={`tr-dropdown-item ${value === option ? "active" : ""}`}
                onClick={() => this.selectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

DropDown.propTypes = {
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  customWidth: PropTypes.string,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  isHeader: PropTypes.bool,
};

export default DropDown;