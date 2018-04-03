import { combineReducers } from 'redux';
import authentication from './authentication';
import register from './register';
import user from './user';
import { routerReducer as routing } from 'react-router-redux';
import user from "./user";

export default combineReducers({
  authentication,
  register,
  user,
  routing
});
