import React, {Component} from 'react';
import {connect} from 'react-redux';
import TripView from "../../component/trips/TripView";
import {fetchTripById} from "../../../reducers/trip";
import {fetchAvailableLevels} from "../../../reducers/levels";
import {fetchAvailableStatuses} from "../../../reducers/statuses";
import {fetchEpisodesByIdTrip} from "../../../reducers/episodes";
import {fetchParticipantsByIdTrip} from "../../../reducers/participants";
import {getSession} from "../../../reducers/authentication";

export class TripViewPage extends Component {

  constructor(props) {
    super(props);
    props.fetchLevels();
    props.fetchStatuses();
    props.fetchTrip(props.params.idTrip);
    props.fetchEpisodes(props.params.idTrip);
    props.fetchParticipants(props.params.idTrip);
    props.getCurrentSession(props.username);
  }

  render() {
    console.log(this.props);
    return (
      <div className="main">
        {!this.props.updatingTrip && !this.props.updatingEpisodes &&
        !this.props.updatingParticipants && !this.props.sessionUpdating &&
        <TripView trip={this.props.trip}
                  levels={this.props.levels}
                  statuses={this.props.statuses}
                  episodes={this.props.episodes}
                  participants={this.props.participants}
                  username={this.props.username}
                  fetchTrip={this.props.fetchTrip}
        />
        }
        {(this.props.updatingTrip || this.props.updatingEpisodes ||
          this.props.updatingParticipants || this.props.sessionUpdating) &&
        <div className="loader margin-top"/>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.authentication.username,
    sessionUpdating: state.authentication.loading,
    trip: state.trip.trip,
    updatingTrip: state.trip.updating,
    levels: state.levels.levels,
    statuses: state.statuses.statuses,
    episodes: state.episodes.episodes,
    updatingEpisodes: state.episodes.updating,
    participants: state.participants.participants,
    updatingParticipants: state.participants.updating
  };
}

const mapActionsToProps = {
  fetchTrip: fetchTripById,
  fetchLevels: fetchAvailableLevels,
  fetchStatuses: fetchAvailableStatuses,
  fetchEpisodes: fetchEpisodesByIdTrip,
  fetchParticipants: fetchParticipantsByIdTrip,
  getCurrentSession: getSession
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripViewPage);
