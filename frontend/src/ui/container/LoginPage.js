import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from "../../reducers/authentication";
import LoginForm from "../component/forms/LoginForm";

export class LoginPage extends Component {

  render() {
    return (
      <div>
          <LoginForm errorMessage={this.props.errorMessage}
                     registerSuccess={this.props.registerSuccess}
                     login={this.props.login.bind(this)}
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.authentication.errorMessage,
    registerSuccess: state.register.registerSuccess
  };
}

const mapActionsToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LoginPage);
