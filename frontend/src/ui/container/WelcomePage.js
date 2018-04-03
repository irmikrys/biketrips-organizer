import React, {Component} from 'react';
import {connect} from 'react-redux';

export class WelcomePage extends Component {

  render() {
    return (
      <div className="main">
        <h2>Welcome!</h2>
      </div>
    )
  }
}

export default connect(
)(WelcomePage);
