const FETCH_TRIPS = 'trips/FETCH_TRIPS';
const FETCH_TRIPS_SUCCESS = 'trips/FETCH_TRIPS_SUCCESS';
const FETCH_TRIPS_FAIL = 'trips/FETCH_TRIPS_FAIL';

const initialState = {
  updating: true,
  trips: []
};

// Reducer

export default function tripsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRIPS:
      return {
        ...state,
        updating: true
      };
    case FETCH_TRIPS_SUCCESS:
      return {
        ...state,
        trips: action.result.data,
        updating: false
      };
    default:
      return state;
  }
}

// Actions

export function fetchModeratorTrips() {
  return {
    types: [FETCH_TRIPS, FETCH_TRIPS_SUCCESS, FETCH_TRIPS_FAIL],
    promise: client => client.get(`/api/moderator/trips`)
  };
}

export function fetchUserTrips() {
  return {
    types: [FETCH_TRIPS, FETCH_TRIPS_SUCCESS, FETCH_TRIPS_FAIL],
    promise: client => client.get(`/api/user/trips`)
  };
}
