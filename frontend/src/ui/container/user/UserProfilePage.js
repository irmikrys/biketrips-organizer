import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUserByUsername, fetchUserFromSession} from "../../../reducers/user";
import {fetchUserTrips} from "../../../reducers/trips";
import UserProfile from "../../component/user/UserProfile";

export class UserProfilePage extends Component {

  constructor(props) {
    super(props);
    props.fetchUser();
  }

  render() {
    console.log(this.props);
    return (
      <div className="main">
        <h2>Hello {this.props.username}!</h2>
        {
          (this.props.loading || this.props.updatingUser) &&
          <div className="loader"/>
        }
        {
          !this.props.loading && !this.props.updatingUser &&
          <UserProfile user={this.props.user}
                       trips={this.props.trips}
                       fetchUser={this.props.fetchUser.bind(this, this.props.username)}
          />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username,
    loading: state.authentication.loading,
    user: state.user.user,
    updatingUser: state.user.updating,
    trips: state.trips.trips,
    updatingTrips: state.trips.updating
  };
}

const mapActionsToProps = {
  fetchUser: fetchUserFromSession,
  fetchTrips: fetchUserTrips
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserProfilePage);
