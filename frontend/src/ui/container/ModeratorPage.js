import React, {Component} from 'react';
import {connect} from 'react-redux';

export class ModeratorPage extends Component {

  render() {
    return (
      <div className="main">
        <h2>Hello {this.props.username}, you are a moderator!</h2>
      </div>
    )
  }
}

export default connect(
  state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username
  })
)(ModeratorPage);
