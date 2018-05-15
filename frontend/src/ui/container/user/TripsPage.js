import {connect} from 'react-redux';
import React from 'react';
import TripsUser from "../../component/trips/TripsUser";
import {fetchTripById} from "../../../reducers/trips/trip";
import {fetchAvailableLevels} from "../../../reducers/trips/levels";
import {fetchUserActiveTrips} from "../../../reducers/trips/tripsActive";
import {setFilterCriteria} from "../../../reducers/trips/tripsActive";
import {fetchAvailableStatuses} from "../../../reducers/trips/statuses";

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username,
    levels: state.levels.levels,
    statuses: state.statuses.statuses,
    trips: state.tripsActive.trips,
    updating: state.tripsActive.updating,
    filterCriteria: state.tripsActive.filterCriteria
  };
}

const mapActionsToProps = {
  fetchTrip: fetchTripById,
  fetchLevels: fetchAvailableLevels,
  fetchStatuses: fetchAvailableStatuses,
  fetchTrips: fetchUserActiveTrips,
  setFilters: setFilterCriteria
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripsUser);
