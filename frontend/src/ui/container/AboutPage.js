import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router";

export class AboutPage extends Component {

  render() {
    return (
      <div className="main">
        <div className="left-content contact-page">
          <div className="paragraph-title">
            <h2>About service</h2>
          </div>
          <div className="paragraph">
            <div className="column">
              Service functions:
              <ul>
                <li>Apply for moderator</li>
                <li>Create trips</li>
                <li>Add participants to a trip</li>
                <li>Add episodes to a trip</li>
                <li>See created trips</li>
                <li>See your profile</li>
                <li>Collect points from taking part in a trip</li>
                <li>See trips in which you have taken part</li>
                <li>Add photos to trip albums</li>
              </ul>
            </div>
          </div>
          <div className="paragraph">
            <div className="column">
              {
                !this.props.isAuthenticated &&
                <div>
                  <Link to='/register'>Sign up</Link>
                  <span> or </span>
                  <Link to='/login'>sign in</Link>
                  <span> to start using! </span>
                  <span className='glyphicon glyphicon-fire'/>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
}

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AboutPage);
