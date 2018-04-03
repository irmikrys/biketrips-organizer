import React, {Component} from 'react';
import {connect} from 'react-redux';

export class ApplicationsPage extends Component {

  render() {
    return (
      <div className="main">
        <h2>Hello {this.props.username}, you have applications to consider!</h2>
      </div>
    )
  }
}

export default connect(
  ({authentication}) => ({username: authentication.username})
)(ApplicationsPage);
