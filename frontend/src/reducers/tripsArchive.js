const FETCH_TRIPS_ARCHIVE = 'trips/FETCH_TRIPS_ARCHIVE';
const FETCH_TRIPS_ARCHIVE_SUCCESS = 'trips/FETCH_TRIPS_ARCHIVE_SUCCESS';
const FETCH_TRIPS_ARCHIVE_FAIL = 'trips/FETCH_TRIPS_ARCHIVE_FAIL';

const initialState = {
  updating: true,
  trips: []
};

// Reducer

export default function tripsArchiveReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRIPS_ARCHIVE:
      return {
        ...state,
        updating: true
      };
    case FETCH_TRIPS_ARCHIVE_SUCCESS:
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

export function fetchUserArchiveTrips() {
  return {
    types: [FETCH_TRIPS_ARCHIVE, FETCH_TRIPS_ARCHIVE_SUCCESS, FETCH_TRIPS_ARCHIVE_FAIL],
    promise: client => client.get(`api/user/trips/archive`)
  };
}

