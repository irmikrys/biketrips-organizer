import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUserFromSession} from "../../../reducers/user";
import {fetchUserTrips} from "../../../reducers/trips";
import UserProfile from "../../component/user/UserProfile";

export class UserProfilePage extends Component {

  constructor(props) {
    super(props);
    props.fetchUser();
    props.fetchTrips();
  }

  render() {
    //todo manage profile trips on backend
    let archivedTrips =
      Object.values(this.props.trips).filter(trip => {return trip.idStatus === 3});
    return (
      <div className="main">
        {
          (this.props.loading || this.props.updatingUser) &&
          <div className="loader"/>
        }
        {
          !this.props.loading && !this.props.updatingUser &&
          <UserProfile user={this.props.user}
                       trips={this.props.trips}
                       archivedTrips={archivedTrips}
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
