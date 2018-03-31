import { combineReducers } from 'redux';
import authentication from './authentication';
import register from './register';
import { routerReducer as routing } from 'react-router-redux';

export default combineReducers({
  authentication,
  register,
  routing
});
