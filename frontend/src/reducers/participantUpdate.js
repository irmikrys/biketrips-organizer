import {fetchParticipantsByIdTrip} from "./participants";

const UPDATE_PARTICIPANT = 'participants/UPDATE_PARTICIPANT';
const UPDATE_PARTICIPANT_SUCCESS = 'participants/UPDATE_PARTICIPANT_SUCCESS';
const UPDATE_PARTICIPANT_FAIL = 'participants/UPDATE_PARTICIPANT_FAIL';

const initialState = {
  errorMessage: null,
};

// Reducer

export default function updateParticipantReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PARTICIPANT_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
      };
    case UPDATE_PARTICIPANT_SUCCESS:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
}

// Actions

export function updateParticipant(idTrip, username, participantInfo, fetchTrip) {
  return  {
    types: [UPDATE_PARTICIPANT, UPDATE_PARTICIPANT_SUCCESS, UPDATE_PARTICIPANT_FAIL],
    promise: (client) =>
      client.put(`/api/trips/${idTrip}/participants/${username}`, participantInfo),
    afterSuccess: (dispatch, getState, response) => {
      fetchTrip(idTrip);
      fetchParticipantsByIdTrip(idTrip);
    }
  };
}

