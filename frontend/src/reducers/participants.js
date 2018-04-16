const FETCH_PARTICIPANTS = 'participants/FETCH_PARTICIPANTS';
const FETCH_PARTICIPANTS_SUCCESS = 'participants/FETCH_PARTICIPANTS_SUCCESS';
const FETCH_PARTICIPANTS_FAIL = 'participants/FETCH_PARTICIPANTS_FAIL';

const initialState = {
  loading: false,
  items: []
};

// Reducer

export default function participantsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PARTICIPANTS:
      return {
        ...state,
        loading: true
      };
    case FETCH_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        items: action.result.data,
        loading: false
      };
    default:
      return state;
  }
}

// Actions

export function fetchParticipants(idTrip) {
  return  {
    types: [FETCH_PARTICIPANTS, FETCH_PARTICIPANTS_SUCCESS, FETCH_PARTICIPANTS_FAIL],
    promise: client => client.get(`/api/trips/${idTrip}/participants`)
  };
}
