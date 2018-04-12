import {browserHistory} from 'react-router';
import {setRegisterSuccess} from "./authentication";

const REGISTER = 'register/REGISTER';
const REGISTER_SUCCESS = 'register/REGISTER_SUCCESS';
const REGISTER_FAIL = 'register/REGISTER_FAIL';

const initialState = {
  errorMessage: null,
};

// Reducer

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
}

// Actions

export function register(userInfo) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/api/register', userInfo),
    afterSuccess: (dispatch, getState, response) => {
      browserHistory.push('/login');
      dispatch(setRegisterSuccess(true));
    }
  };
}
