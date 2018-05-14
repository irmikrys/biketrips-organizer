const FETCH_TRIPS_ACTIVE = 'trips/FETCH_TRIPS_ACTIVE';
const FETCH_TRIPS_ACTIVE_SUCCESS = 'trips/FETCH_TRIPS_ACTIVE_SUCCESS';
const FETCH_TRIPS_ACTIVE_FAIL = 'trips/FETCH_TRIPS_ACTIVE_FAIL';

const initialState = {
  updating: true,
  trips: []
};

// Reducer

export default function tripsActiveReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRIPS_ACTIVE:
      return {
        ...state,
        updating: true
      };
    case FETCH_TRIPS_ACTIVE_SUCCESS:
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

export function fetchUserActiveTrips() {
  return {
    types: [FETCH_TRIPS_ACTIVE, FETCH_TRIPS_ACTIVE_SUCCESS, FETCH_TRIPS_ACTIVE_FAIL],
    promise: client => client.get('/api/user/trips/active')
  };
}

export function fetchModeratorActiveTrips() {
  return {
    types: [FETCH_TRIPS_ACTIVE, FETCH_TRIPS_ACTIVE_SUCCESS, FETCH_TRIPS_ACTIVE_FAIL],
    promise: client => client.get('/api/moderator/trips/active')
  };
}
