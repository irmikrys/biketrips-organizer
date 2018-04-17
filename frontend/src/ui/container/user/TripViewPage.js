import React, {Component} from 'react';
import {connect} from 'react-redux';
import TripView from "../../component/trips/TripView";
import {fetchTripById} from "../../../reducers/trip";
import {fetchAvailableLevels} from "../../../reducers/levels";
import {fetchAvailableStatuses} from "../../../reducers/statuses";

export class TripViewPage extends Component {

  constructor(props) {
    super(props);
    props.fetchTrip(props.params.idTrip);
    props.fetchLevels();
    props.fetchStatuses();
  }

  render() {

    return (
      <div className="main">
        {!this.props.updating && <TripView trip={this.props.trip}
                                           levels={this.props.levels}
                                           statuses={this.props.statuses}
                                           username={this.props.username}
                                           fetchTrip={this.props.fetchTrip}
        />
        }
        {this.props.updating && <div className="loader margin-top"/>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.authentication.username,
    trip: state.trip.trip,
    updating: state.trip.updating,
    levels: state.levels.levels,
    statuses: state.statuses.statuses
  };
}

const mapActionsToProps = {
  fetchTrip: fetchTripById,
  fetchLevels: fetchAvailableLevels,
  fetchStatuses: fetchAvailableStatuses
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripViewPage);
