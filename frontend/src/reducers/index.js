import { combineReducers } from 'redux';
import authentication from './authentication';
import register from './register';
import { routerReducer as routing } from 'react-router-redux';
import user from "./user";
import apply from "./apply";
import activeApplications from "./activeApplications";

export default combineReducers({
  authentication,
  register,
  user,
  apply,
  activeApplications,
  routing
});
