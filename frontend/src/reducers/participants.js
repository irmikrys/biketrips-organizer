const FETCH_PARTICIPANTS = 'participants/FETCH_PARTICIPANTS';
const FETCH_PARTICIPANTS_SUCCESS = 'participants/FETCH_PARTICIPANTS_SUCCESS';
const FETCH_PARTICIPANTS_FAIL = 'participants/FETCH_PARTICIPANTS_FAIL';

const initialState = {
  updating: true,
  participants: []
};

// Reducer

export default function participantsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PARTICIPANTS:
      return {
        ...state,
        updating: true
      };
    case FETCH_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        participants: action.result.data,
        updating: false
      };
    default:
      return state;
  }
}

// Actions

export function fetchParticipantsByIdTrip(idTrip) {
  return  {
    types: [FETCH_PARTICIPANTS, FETCH_PARTICIPANTS_SUCCESS, FETCH_PARTICIPANTS_FAIL],
    promise: client => client.get(`/api/trips/${idTrip}/participants`)
  };
}
