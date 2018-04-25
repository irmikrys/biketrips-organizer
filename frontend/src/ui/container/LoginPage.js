import React, {Component} from 'react';
import {connect} from 'react-redux';
import {displayAuthError, login, setRegisterSuccess} from "../../reducers/authentication";
import LoginForm from "../component/forms/LoginForm";

export class LoginPage extends Component {

  clearErrorMessages = () => {
    this.props.displayAuthError(null);
    this.props.setRegisterSuccess(false);
  };

  render() {
    return (
      <div>
          <LoginForm errorMessage={this.props.errorMessage}
                     registerSuccess={this.props.registerSuccess}
                     login={this.props.login.bind(this)}
                     onClick={this.clearErrorMessages.bind(this)}
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.authentication.errorMessage,
    registerSuccess: state.authentication.registerSuccess
  };
}

const mapActionsToProps = {
  login,
  displayAuthError,
  setRegisterSuccess
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LoginPage);
