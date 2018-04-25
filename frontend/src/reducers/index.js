import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import authentication from './authentication';
import register from './register';
import user from "./user";
import apply from "./apply";
import activeApplications from "./activeApplications";
import acceptModerator from "./acceptModerator";
import deactivateApplication from "./deactivateApplication";
import levels from "./levels";
import tripCreation from "./tripCreation";
import episodes from "./episodes";
import trips from "./trips";
import episode from "./episode";
import participant from "./participant";
import trip from "./trip";
import tripUpdate from "./tripUpdate";
import participants from "./participants";
import statuses from "./statuses";
import participantUpdate from "./participantUpdate";
import activities from "./activities";
import createEpisode from "./createEpisode";
import fetchComments from "./fetchComments";

export default combineReducers({
  authentication,
  register,
  user,
  apply,
  activeApplications,
  acceptModerator,
  deactivateApplication,
  levels,
  tripCreation,
  episodes,
  trips,
  episode,
  participant,
  trip,
  tripUpdate,
  participants,
  statuses,
  participantUpdate,
  activities,
  createEpisode,
  fetchComments,
  routing
});
