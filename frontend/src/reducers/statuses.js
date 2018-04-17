const FETCH_STATUSES = 'statuses/FETCH_STATUSES';
const FETCH_STATUSES_SUCCESS = 'statuses/FETCH_STATUSES_SUCCESS';
const FETCH_STATUSES_FAIL = 'statuses/FETCH_STATUSES_FAIL';

const initialState = {
  updating: true,
  statuses: []
};

// Reducer

export default function statusesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STATUSES:
      return {
        ...state,
        updating: true
      };
    case FETCH_STATUSES_SUCCESS:
      return {
        ...state,
        updating: false,
        statuses: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchAvailableStatuses() {
  return  {
    types: [FETCH_STATUSES, FETCH_STATUSES_SUCCESS, FETCH_STATUSES_FAIL],
    promise: client => client.get(`/api/statuses`)
  };
}
