import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
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
  routing
});
