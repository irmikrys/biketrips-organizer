import React, {Component} from 'react';
import {connect} from 'react-redux';
import TripView from "../../component/trips/TripView";
import {fetchTripById} from "../../../reducers/trip";
import {fetchAvailableLevels} from "../../../reducers/levels";
import {fetchAvailableStatuses} from "../../../reducers/statuses";
import {fetchEpisodesByIdTrip} from "../../../reducers/episodes";

export class TripViewPage extends Component {

  constructor(props) {
    super(props);
    props.fetchTrip(props.params.idTrip);
    props.fetchLevels();
    props.fetchStatuses();
    props.fetchEpisodes(props.params.idTrip);
  }

  render() {

    return (
      <div className="main">
        {!this.props.updating && <TripView trip={this.props.trip}
                                           levels={this.props.levels}
                                           statuses={this.props.statuses}
                                           episodes={this.props.episodes}
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
    statuses: state.statuses.statuses,
    episodes: state.episodes.episodes
  };
}

const mapActionsToProps = {
  fetchTrip: fetchTripById,
  fetchLevels: fetchAvailableLevels,
  fetchStatuses: fetchAvailableStatuses,
  fetchEpisodes: fetchEpisodesByIdTrip
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripViewPage);
