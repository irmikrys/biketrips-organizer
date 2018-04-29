import React, {Component} from 'react';
import {connect} from 'react-redux';

export class WelcomePage extends Component {

  render() {
    return (
      <div className="margin-top">
        <div className="welcome">
          <h1>LET THE ADVENTURE BEGIN</h1>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username
  };
}

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(WelcomePage);
