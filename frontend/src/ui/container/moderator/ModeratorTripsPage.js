import React, {Component} from 'react';
import {connect} from "react-redux";
import TripsGrid from "../../component/trips/TripsGrid"
import {fetchModeratorTrips, setFilterCriteria} from "../../../reducers/trips/trips";
import {fetchTripById} from "../../../reducers/trips/trip";
import {updateTrip} from "../../../reducers/trips/tripUpdate";
import {fetchAvailableLevels} from "../../../reducers/trips/levels";
import {fetchAvailableStatuses} from "../../../reducers/trips/statuses";
import {fetchAvailableActivities} from "../../../reducers/participants/activities";
import FilterBar from "../../component/trips/FilterBar";
import * as _ from "lodash";

export class ModeratorTripsPage extends Component {

  constructor(props) {
    super(props);
    props.fetchLevels();
    props.fetchStatuses();

    if(_.isEmpty(props.filterCriteria))
      props.fetchTrips();

    this.state = {
      filterCriteria: props.filterCriteria
    };
  }

  handleFilterBarChange = filterCriteria => {
    this.props.setFilters(filterCriteria);
    this.props.fetchTrips(filterCriteria);
  };

  componentWillReceiveProps(props) {
    if (props.filterCriteria !== this.state.filterCriteria) {
      props.fetchTrips(props.filterCriteria);
      this.setState({filterCriteria: props.filterCriteria});
    }
  }

  render() {
    return (
      <div className="main-color-none">
        <FilterBar className='search-bar-container margin-bottom-30'
                   levels={this.props.levels}
                   statuses={this.props.statuses}
                   filterCriteria={this.state.filterCriteria}
                   onChange={this.handleFilterBarChange.bind(this)}
        />
        {
          (this.props.updating) &&
          <div className="loader"/>
        }
        {
          !this.props.updating &&
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
    trips: state.trips.trips,
    updating: state.trips.updating,
    levels: state.levels.levels,
    statuses: state.statuses.statuses,
    activities: state.activities.activities,
    filterCriteria: state.trips.filterCriteria
  };
}

const mapActionsToProps = {
  fetchTrips: fetchModeratorTrips,
  fetchTrip: fetchTripById,
  editTrip: updateTrip,
  fetchLevels: fetchAvailableLevels,
  fetchStatuses: fetchAvailableStatuses,
  fetchActivities: fetchAvailableActivities,
  setFilters: setFilterCriteria
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ModeratorTripsPage)
