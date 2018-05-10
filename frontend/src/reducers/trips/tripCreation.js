import { browserHistory } from 'react-router';

const CREATE_TRIP = 'trips/CREATE_TRIP';
const CREATE_TRIP_SUCCESS = 'trips/CREATE_TRIP_SUCCESS';
const CREATE_TRIP_FAIL = 'trips/CREATE_TRIP_FAIL';

const initialState = {
  tripCreationSuccess: false
};

// Reducer

export default function tripCreationReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TRIP_FAIL:
      return {
        ...state,
        tripCreationSuccess: false
      };
    case CREATE_TRIP_SUCCESS:
      return {
        ...state,
        tripCreationSuccess: true
      };
    default:
      return state;
  }
}

// Actions

export function createTrip(tripInfo) {
  return  {
    types: [CREATE_TRIP, CREATE_TRIP_SUCCESS, CREATE_TRIP_FAIL],
    promise: (client) => client.post('/api/trips', tripInfo),
    afterSuccess: () => {
      browserHistory.push('/moderator-trips');
    }
  };
}
