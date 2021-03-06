import { browserHistory } from 'react-router';
import {fetchActiveApplications} from "./activeApplications";

const DEACTIVATE = 'applications/DEACTIVATE';
const DEACTIVATE_SUCCESS = 'applications/DEACTIVATE_SUCCESS';
const DEACTIVATE_FAIL = 'applications/DEACTIVATE_FAIL';

const initialState = {
  refusalSuccess: false
};

// Reducer

export default function refusalReducer(state = initialState, action) {
  switch (action.type) {
    case DEACTIVATE_FAIL:
      return {
        ...state,
        refusalSuccess: false
      };
    case DEACTIVATE_SUCCESS:
      return {
        ...state,
        refusalSuccess: true
      };
    default:
      return state;
  }
}

// Actions

export function deactivateApplication(username, applicationInfo) {
  return  {
    types: [DEACTIVATE, DEACTIVATE_SUCCESS, DEACTIVATE_FAIL],
    promise: (client) => client.put(`/api/applications/${username}`, applicationInfo),
    afterSuccess: (dispatch, getState, response) => {
      browserHistory.push('/applications');
      dispatch(fetchActiveApplications());
    }
  };
}
