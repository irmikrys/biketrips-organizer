import React, {Component} from 'react';
import {connect} from "react-redux";
import TripsGrid from "../../component/trips/TripsGrid"
import {fetchModeratorTrips} from "../../../reducers/trips";
import {fetchTripById} from "../../../reducers/trip";
import {updateTrip} from "../../../reducers/tripUpdate";
import {fetchAvailableLevels} from "../../../reducers/levels";
import {fetchAvailableStatuses} from "../../../reducers/statuses";
import {getSession} from "../../../reducers/authentication";
import {fetchAvailableActivities} from "../../../reducers/activities";

export class ModeratorTripsPage extends Component {

  constructor(props) {
    super(props);
    props.getCurrentSession();
    props.fetchLevels();
    props.fetchStatuses();
    props.fetchTrips();
  }

  render() {
    return (
      <div className="main">
        {
          (this.props.updating || this.props.userUpdating) &&
          <div className="loader"/>
        }
        {
          !this.props.updating && !this.props.userUpdating &&
          <div className="trip-grid">
            <TripsGrid trips={this.props.trips}
                       levels={this.props.levels}
                       statuses={this.props.statuses}
                       activities={this.props.activities}
                       fetchTrip={this.props.fetchTrip}
                       editTrip={this.props.editTrip}
            />
          </div>
        }
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    username: state.authentication.username,
    userUpdating: state.authentication.loading,
    trips: state.trips.trips,
    updating: state.trips.updating,
    levels: state.levels.levels,
    statuses: state.statuses.statuses,
    activities: state.activities.activities
  };
}

const mapActionsToProps = {
  fetchTrips: fetchModeratorTrips,
  fetchTrip: fetchTripById,
  editTrip: updateTrip,
  fetchLevels: fetchAvailableLevels,
  fetchStatuses: fetchAvailableStatuses,
  fetchActivities: fetchAvailableActivities,
  getCurrentSession: getSession
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ModeratorTripsPage)
