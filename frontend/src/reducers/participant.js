const CREATE_PARTICIPANT = 'participants/CREATE_PARTICIPANT';
const CREATE_PARTICIPANT_SUCCESS = 'participants/CREATE_PARTICIPANT_SUCCESS';
const CREATE_PARTICIPANT_FAIL = 'participants/CREATE_PARTICIPANT_FAIL';

const initialState = {
  errorMessage: null,
  createSuccess: false
};

// Reducer

export default function participantReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PARTICIPANT_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
        createSuccess: false
      };
    case CREATE_PARTICIPANT_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        createSuccess: true
      };
    default:
      return state;
  }
}

// Actions

export function createParticipant(idTrip, participantInfo) {
  return  {
    types: [CREATE_PARTICIPANT, CREATE_PARTICIPANT_SUCCESS, CREATE_PARTICIPANT_FAIL],
    promise: (client) => client.post(`/api/trips/${idTrip}/participants`, participantInfo)
  };
}
