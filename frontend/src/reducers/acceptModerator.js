import { browserHistory } from 'react-router';

const ACCEPT_MODER = 'applications/ACCEPT_MODER';
const ACCEPT_MODER_SUCCESS = 'applications/ACCEPT_MODER_SUCCESS';
const ACCEPT_MODER_FAIL = 'applications/ACCEPT_MODER_FAIL';

const initialState = {
  acceptSuccess: false
};

// Reducer

export default function acceptModerReducer(state = initialState, action) {
  switch (action.type) {
    case ACCEPT_MODER_FAIL:
      return {
        ...state,
        acceptSuccess: false
      };
    case ACCEPT_MODER_SUCCESS:
      return {
        ...state,
        acceptSuccess: true
      };
    default:
      return state;
  }
}

// Actions

export function acceptModer(username, userInfo) {
  return  {
    types: [ACCEPT_MODER, ACCEPT_MODER_SUCCESS, ACCEPT_MODER_FAIL],
    promise: (client) => client.put(`/api/users/${username}`, userInfo)
  };
}
