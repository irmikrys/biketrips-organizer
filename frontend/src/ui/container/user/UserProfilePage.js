import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserProfile from "../../component/user/UserProfile";
import {fetchUserFromSession} from "../../../reducers/user/user";
import {fetchUserTrips} from "../../../reducers/trips/trips";
import {fetchUserArchiveTrips} from "../../../reducers/trips/tripsArchive";
import {fetchUserActiveTrips} from "../../../reducers/trips/tripsActive";
import {editProfile} from "../../../reducers/user/editProfile";

export class UserProfilePage extends Component {

  constructor(props) {
    super(props);
    props.fetchUser();
    props.fetchTrips();
    props.fetchActive();
    props.fetchArchive();
  }

  render() {
    return (
      <div>
        {
          (this.props.loading || this.props.updatingUser || this.props.updatingTrips ||
            this.props.updatingArchive || this.props.updatingActive) &&
          <div className="loader margin-top"/>
        }
        {
          !this.props.loading && !this.props.updatingUser && !this.props.updatingTrips &&
          !this.props.updatingArchive && !this.props.updatingActive &&
          <UserProfile user={this.props.user}
                       trips={this.props.trips}
                       tripsArchive={this.props.tripsArchive}
                       tripsActive={this.props.tripsActive}
                       fetchUser={this.props.fetchUser.bind(this)}
                       editProfile={this.props.edit.bind(this)}
                       errorMessage={this.props.errorMessage}
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
    updatingTrips: state.trips.updating,
    tripsArchive: state.tripsArchive.trips,
    updatingArchive: state.tripsArchive.updating,
    tripsActive: state.tripsActive.trips,
    updatingActive: state.tripsActive.updating,
    errorMessage: state.editProfile.errorMessage
  };
}

const mapActionsToProps = {
  fetchUser: fetchUserFromSession,
  fetchTrips: fetchUserTrips,
  fetchArchive: fetchUserArchiveTrips,
  fetchActive: fetchUserActiveTrips,
  edit: editProfile
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserProfilePage);
