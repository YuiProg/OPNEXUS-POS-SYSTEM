import React from "react";
import "./InputField.css";

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: null,
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

  render() {
    const {
      required,
      onChange,
      disabled,
      placeholder,
      password,
      text
    } = this.props;

    return (
      <div className="input-container">
        {this.state.error && (
          <p className="input-error-message">{this.state.error}</p>
        )}
        <div
          className={`input-wrapper ${this.state.error ? "input-error" : ""}`}
        >
          <>
            <input
              type={text ? 'text' : password ? 'password' : 'text'}
              required={required}
              onChange={(e) => onChange(this.checkNumber(e))}
              disabled={disabled}
              value={this.state.value}
              placeholder=" "
            />
            <label className="floating-label">{placeholder}</label>
          </>
        </div>
      </div>
    );
  }
}

export default InputField;
