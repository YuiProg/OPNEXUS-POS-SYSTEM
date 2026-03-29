import React from "react";
import "./Dropdown.css";
import { Layers } from "lucide-react";
import PropTypes from "prop-types";

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      value: ""
    }
  }

  render() {
    const { options, defaultValue, onChange, maxWidth, customWidth, isRequired } =
      this.props;
    
    return (
      <div className="tr-dropdown-wrapper">
        <Layers className="tr-dropdown-icon" />
        <select
          value={this.state.value}
          className="tr-dropdown"
          style={{
            width: maxWidth ? "100%" : customWidth ? customWidth : "328px",
          }}
          onChange={(e) => {
            this.setState({value: e.target.value});
            onChange(e.target.value)
          }}
          defaultValue={
            defaultValue ? `Select ${defaultValue}` : "Select Branch..."
          }
          required={isRequired}
        >
          <option value="" className="tr-options" disabled>
            {defaultValue ? `Select ${defaultValue}` : "Select Branch..."}
          </option>
          {options?.map((l, i) => {
            return (
              <option className="tr-options" key={i} value={l}>
                {l}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

DropDown.propTypes = {
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  maxWidth: PropTypes.number,
  customWidth: PropTypes.number,
};

export default DropDown;
