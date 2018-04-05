import { combineReducers } from 'redux';
import authentication from './authentication';
import register from './register';
import { routerReducer as routing } from 'react-router-redux';
import user from "./user";
import apply from "./apply";
import activeApplications from "./activeApplications";
import acceptModerator from "./acceptModerator";

export default combineReducers({
  authentication,
  register,
  user,
  apply,
  activeApplications,
  acceptModerator,
  routing
});
