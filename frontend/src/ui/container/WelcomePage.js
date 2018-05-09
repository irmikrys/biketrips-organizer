import React, {Component} from 'react';
import {connect} from 'react-redux';
import {timeFormatter} from "../component/utils";
import Timer from "../component/Timer";

export class WelcomePage extends Component {

  render() {
    return (
      <div className="margin-top">
        <div className="welcome">
          <h1>LET THE ADVENTURE BEGIN</h1>
          <Timer/>
          <div className='question'>What will you start your adventure with?</div>
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
