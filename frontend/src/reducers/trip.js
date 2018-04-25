const FETCH_TRIP = 'trips/FETCH_TRIP';
const FETCH_TRIP_SUCCESS = 'trips/FETCH_TRIP_SUCCESS';
const FETCH_TRIP_FAIL = 'trips/FETCH_TRIP_FAIL';

const initialState = {
  updating: true,
  trip: {}
};

// Reducer

export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRIP:
      return {
        ...state,
        updating: true,
        trip: {}
      };
    case FETCH_TRIP_SUCCESS:
      return {
        ...state,
        updating: false,
        trip: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchTripById(id) {
  return  {
    types: [FETCH_TRIP, FETCH_TRIP_SUCCESS, FETCH_TRIP_FAIL],
    promise: client => client.get(`/api/trips/${id}`)
  };
}
