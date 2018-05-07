import {connect} from 'react-redux';
import React from 'react';
import {fetchTripById} from "../../../reducers/trips/trip";
import TripsUser from "../../component/trips/TripsUser";
import {fetchAvailableLevels} from "../../../reducers/trips/levels";
import {fetchUserActiveTrips} from "../../../reducers/trips/tripsActive";

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username,
    trips: state.tripsActive.trips,
    updating: state.tripsActive.updating,
    levels: state.levels.levels
  };
}

const mapActionsToProps = {
  fetchTrip: fetchTripById,
  fetchLevels: fetchAvailableLevels,
  fetchActiveTrips: fetchUserActiveTrips
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripsUser);
