import React, { Component } from "react";
import {ErrorPanel} from "./ErrorPanel";
import {Link} from "react-router";
import {USERNAME, PASSWORD, getFormField} from "../../constants/constants";

export default class LoginForm extends Component {

  state = {
    [USERNAME]: "",
    [PASSWORD]: ""
  };

  handleInputChange = event => {
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  render() {
    const {errorMessage, registerSuccess} = this.props;
    const errorPanel = errorMessage ? <ErrorPanel messageKey={errorMessage}/> : null;
    const successPanel = registerSuccess ? <SuccessPanel/> : null;
    return (
      <div className="form-page" id="login">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            {errorPanel}
            {successPanel}
            {
              [USERNAME, PASSWORD].map(fieldKey => {
                const field = getFormField(fieldKey);
                  return <input key={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                name={field.name}
                                pattern={field.pattern}
                                onChange={this.handleInputChange}
                                required
                  />
              })
            }
            <button type="submit">Login</button>
          </form>
          <p className="message"><Link to="/register" onClick={this.props.onClick}>Not registered? Sign up</Link></p>
        </div>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password);
  }
}

const SuccessPanel = () => (
  <p className="success-message">Your account has been successfully created!</p>
);
