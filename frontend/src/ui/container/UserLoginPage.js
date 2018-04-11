import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router";
import {GoogleLogin} from 'react-google-login';

export class UserLoginPage extends Component {

  render(){
    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
      <div className="login-page">
        <div className="form-container">
          <form>
            <p className="message"><Link to="/admin_login">Log in as administrator</Link></p>
            <GoogleLogin
              clientId="54595961450-h0e06ev7237pca6i0742ecoif25ar04a.apps.googleusercontent.com"
              class="g-signin"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default connect(
)(UserLoginPage);
