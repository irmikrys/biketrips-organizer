import {connect} from 'react-redux';
import React, {Component} from 'react';
import {fetchUserTrips} from '../../../reducers/trips';

class TripsPage extends Component {
  render() {
    return (
      <div className="main">
        <h2>Trips</h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username,
    trips: state.trips.trips,
    updating: state.trips.updating
  };
}

const mapActionsToProps = {
  fetchTrips: fetchUserTrips
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripsPage);
