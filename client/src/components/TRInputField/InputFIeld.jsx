import React from "react";
import "./InputField.css";
import { Search } from "lucide-react";

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: null,
      searchValue: "",
    };
  }

  checkNumber = (e) => {
    const value = e.target.value;
    const { number, text, password } = this.props;
    const regex = /^\d+$/;

    if (value === "") {
      this.setState({ error: null, value: "" });
      return value;
    }

    if (text || password) {
      this.setState({ error: null, value: value });
      return value;
    }

    if (number) {
      if (regex.test(value)) {
        this.setState({ error: null, value: value });
        return value;
      } else {
        this.setState({ value: "", error: "Number only!" });
      }
    }
  };

  handleSearch = (e) => {
    const value = e.target.value;
    this.setState({searchValue: value});
    return value;
  }

  handleEnterDown = (e, CB) => {
    const key = e.key;
    if (key === 'Enter') {
      return CB(e.target.value);
    }
  }

  render() {
    const {
      required,
      onChange,
      disabled,
      placeholder,
      password,
      text,
      isSearch,
      onEnterDown,
      color
    } = this.props;
    
    return (
      <div className="input-container">
        {this.state.error && (
          <p className="input-error-message">{this.state.error}</p>
        )}
        <div
          className={`input-wrapper ${this.state.error ? "input-error" : ""}`}
        >
          {!isSearch ? (
            <>
              <input
                style={disabled ? {backgroundColor: color, cursor: 'not-allowed'} : {backgroundColor: color}}
                type={text ? "text" : password ? "password" : "text"}
                required={required}
                onChange={(e) => onChange(this.checkNumber(e))}
                disabled={disabled}
                value={this.state.value}
                placeholder=" "
                onKeyDown={(e) => this.handleEnterDown(e, onEnterDown)}
              />
              <label className="floating-label">{placeholder}</label>
            </>
          ) : (
            <>
              <input
                style={disabled ? {backgroundColor: color, cursor: 'not-allowed'} : {backgroundColor: color}}
                type="text"
                required={required}
                onChange={(e) => this.handleSearch(e)}
                disabled={disabled}
                value={this.state.searchValue}
                placeholder=" "
                onKeyDown={(e) => this.handleEnterDown(e, onEnterDown)}
                className="search-input"
              />
              <label className="floating-label">{placeholder}</label>
              <Search className="search-icon" size={15} />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default InputField;
