import {connect} from 'react-redux';
import React from 'react';
import {fetchAllCreatedTrips, fetchUserTrips} from '../../../reducers/trips';
import {fetchTripById} from "../../../reducers/trip";
import TripsUser from "../../component/trips/TripsUser";
import {fetchAvailableLevels} from "../../../reducers/levels";

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username,
    trips: state.trips.trips,
    updating: state.trips.updating,
    levels: state.levels.levels
  };
}

const mapActionsToProps = {
  fetchTrips: fetchUserTrips,
  fetchTrip: fetchTripById,
  fetchLevels: fetchAvailableLevels,
  fetchAllTrips: fetchAllCreatedTrips
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripsUser);
