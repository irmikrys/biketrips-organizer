const UPDATE_TRIP = 'trips/UPDATE_TRIP';
const UPDATE_TRIP_SUCCESS = 'trips/UPDATE_TRIP_SUCCESS';
const UPDATE_TRIP_FAIL = 'trips/UPDATE_TRIP_FAIL';

const initialState = {
  errorMessage: null,
};

// Reducer

export default function updateTripReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TRIP_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
      };
    case UPDATE_TRIP_SUCCESS:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
}

// Actions

export function updateTrip(idTrip, tripInfo, fetchTrip) {
  return  {
    types: [UPDATE_TRIP, UPDATE_TRIP_SUCCESS, UPDATE_TRIP_FAIL],
    promise: (client) => client.put(`/api/trips/${idTrip}`, tripInfo),
    afterSuccess: (dispatch, getState, response) => {
      fetchTrip(idTrip);
    }
  };
}

