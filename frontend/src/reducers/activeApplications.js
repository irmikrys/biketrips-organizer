const FETCH_ACTIVE_APPLICATIONS = 'applications/FETCH_ACTIVE_APPLICATIONS';
const FETCH_ACTIVE_APPLICATIONS_SUCCESS = 'applications/FETCH_ACTIVE_APPLICATIONS_SUCCESS';
const FETCH_ACTIVE_APPLICATIONS_FAIL = 'applications/FETCH_ACTIVE_APPLICATIONS_FAIL';

const initialState = {
  updating: true,
  applications: {}
};

// Reducer

export default function applicationsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVE_APPLICATIONS:
      return {
        ...state,
        updating: true
      };
    case FETCH_ACTIVE_APPLICATIONS_SUCCESS:
      return {
        ...state,
        updating: false,
        applications: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchActiveApplications() {
  return {
    types: [FETCH_ACTIVE_APPLICATIONS, FETCH_ACTIVE_APPLICATIONS_SUCCESS, FETCH_ACTIVE_APPLICATIONS_FAIL],
    promise: client => client.get(`/api/activeApplications`)
  };
}
