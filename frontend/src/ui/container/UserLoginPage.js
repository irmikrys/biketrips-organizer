import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router";

export class UserLoginPage extends Component {

  render() {
    return (
      <div className="form-page" id="login">
        <div className="form-container">
          <form>
            <p className="message"><Link to="/admin-login">Log in as administrator</Link></p>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(
)(UserLoginPage);
