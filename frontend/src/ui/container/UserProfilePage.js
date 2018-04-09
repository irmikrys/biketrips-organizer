import React, {Component} from 'react';
import {connect} from 'react-redux';

export class UserProfilePage extends Component {

  render() {
    return (
      <div className="main">
        <h2>Hello {this.props.username}!</h2>
      </div>
    )
  }
}

export default connect(
  state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username
  })
)(UserProfilePage);
