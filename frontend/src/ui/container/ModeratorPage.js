import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router";

export class ModeratorPage extends Component {

  render() {
    return (
      <div className="main">
        <h2>Hello {this.props.username}, what do you want to do?</h2>
        <div>
          <ul>
            <li><Link to={'/moderate/create-trip'}>Create a trip</Link></li>
            <li><Link to={'/moderate'}>Edit a trip</Link></li>
            <li><Link to={'/moderate'}>See created trips</Link></li>
          </ul>
        </div>
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
