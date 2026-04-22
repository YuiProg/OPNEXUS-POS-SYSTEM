import React from "react";
import ReactDOM from "react-dom";
import "./Dropdown.css";
import { Warehouse, ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

class DropdownPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: (this.props.value && this.props.value !== "N/A") ? this.props.value : "",
      isOpen: false,
      listPosition: { top: 0, left: 0 },
      openDirection: "down" // "up" or "down"
    };
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    window.addEventListener("scroll", this.updatePosition, true);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    window.removeEventListener("scroll", this.updatePosition, true);
  }

  handleClickOutside = (event) => {
  const isPortalClick = document.querySelector('.tr-dropdown-list-portal')?.contains(event.target);
  
  if (this.buttonRef.current && !this.buttonRef.current.contains(event.target) && !isPortalClick) {
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
      this.setState({ isOpen: !this.state.isOpen }, () => {
        if (this.state.isOpen) {
          setTimeout(this.updatePosition, 0);
        }
      });
    }
  };

  updatePosition = () => {
    if (!this.buttonRef.current) return;

    const rect = this.buttonRef.current.getBoundingClientRect();
    const listHeight = 200; // Approximate height, adjust as needed
    const gap = 0;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top = rect.bottom + gap;
    let openDirection = "down";

    if (top + listHeight > viewportHeight) {
      top = rect.top - listHeight - gap;
      openDirection = "up";
    }

    let left = rect.left;
    if (left + rect.width > viewportWidth) {
      left = viewportWidth - rect.width - 16; // 16px margin
    }

    if (left < 0) {
      left = 16;
    }

    this.setState({
      listPosition: {
        top: `${top}px`,
        left: `${left}px`,
        width: `${rect.width}px`
      },
      openDirection
    });
  };

  selectOption = (option) => {
    this.setState({ value: option, isOpen: false });
    this.props.onChange(option);
  };

  render() {
    const { options, defaultValue, isRequired, disabled, isHeader } = this.props;
    const { value, isOpen, listPosition, openDirection } = this.state;
    const displayValue = value || (defaultValue ? `Select ${defaultValue}...` : "Select Branch...");

    return (
      <>
        <div className="tr-dropdown-wrapper">
          <button
            ref={this.buttonRef}
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
        </div>

        {isOpen && ReactDOM.createPortal(
          <ul 
            className={`tr-dropdown-list tr-dropdown-list-portal tr-dropdown-${openDirection}`}
            style={listPosition}
          >
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
          </ul>,
          document.body
        )}
      </>
    );
  }
}

DropdownPortal.propTypes = {
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  isHeader: PropTypes.bool,
};

export default DropdownPortal;