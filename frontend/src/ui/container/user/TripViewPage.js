import React, {Component} from 'react';
import {connect} from 'react-redux';
import TripView from "../../component/trips/TripView";
import Comments from "../../component/trips/Comments";
import {fetchTripById} from "../../../reducers/trip";
import {fetchAvailableLevels} from "../../../reducers/levels";
import {fetchAvailableStatuses} from "../../../reducers/statuses";
import {fetchEpisodesByIdTrip} from "../../../reducers/episodes";
import {fetchParticipantsByIdTrip} from "../../../reducers/participants";
import {getSession} from "../../../reducers/authentication";
import {fetchActivitiesForUser} from "../../../reducers/activities";
import {updateParticipant} from "../../../reducers/participantUpdate";
import {fetchCommentsByIdTrip} from "../../../reducers/fetchComments";
import {createComment} from "../../../reducers/addComment";
import {deleteCommentById} from "../../../reducers/commentDelete";

export class TripViewPage extends Component {

  constructor(props) {
    super(props);
    props.fetchLevels();
    props.fetchStatuses();
    props.fetchActivities();
    props.fetchTrip(props.params.idTrip);
    props.fetchEpisodes(props.params.idTrip);
    props.fetchParticipants(props.params.idTrip);
    props.fetchComments(props.params.idTrip);
    props.getCurrentSession(props.username);
  }

  render() {
    console.log(this.props);
    return (
      <div className="main">
        {!this.props.updatingTrip && !this.props.updatingEpisodes &&
        !this.props.updatingParticipants && !this.props.sessionUpdating &&
        <TripView trip={this.props.trip}
                  idTrip={this.props.params.idTrip}
                  levels={this.props.levels}
                  statuses={this.props.statuses}
                  activities={this.props.activities}
                  episodes={this.props.episodes}
                  participants={this.props.participants}
                  username={this.props.username}
                  fetchTrip={this.props.fetchTrip}
                  fetchParticipants={this.props.fetchParticipants}
                  updateParticipant={this.props.updateParticipant}
        />
        }
        {
          (this.props.updatingTrip || this.props.updatingEpisodes ||
            this.props.updatingParticipants || this.props.sessionUpdating) &&
          <div className="trip-view">
            <div className="loader"/>
          </div>
        }
        {
          !this.props.commentsUpdating && !this.props.sessionUpdating &&
          <Comments comments={this.props.comments}
                    username={this.props.username}
                    idTrip={this.props.params.idTrip}
                    participants={this.props.participants}
                    post={this.props.addComment.bind(this)}
                    deleteComment={this.props.deleteComment.bind(this)}
                    fetchComments={this.props.fetchComments.bind(this)}
          />
        }
        {
          (this.props.commentsUpdating || this.props.sessionUpdating) &&
          <div className='comments-view'>
            <div className="loader"/>
          </div>
        }
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
    activities: state.activities.activities,
    episodes: state.episodes.episodes,
    updatingEpisodes: state.episodes.updating,
    participants: state.participants.participants,
    updatingParticipants: state.participants.updating,
    comments: state.fetchComments.comments,
    commentsUpdating: state.fetchComments.updating
  };
}

const mapActionsToProps = {
  fetchTrip: fetchTripById,
  fetchLevels: fetchAvailableLevels,
  fetchActivities: fetchActivitiesForUser,
  fetchStatuses: fetchAvailableStatuses,
  fetchEpisodes: fetchEpisodesByIdTrip,
  fetchParticipants: fetchParticipantsByIdTrip,
  fetchComments: fetchCommentsByIdTrip,
  getCurrentSession: getSession,
  addComment: createComment,
  deleteComment: deleteCommentById,
  updateParticipant
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripViewPage);
