import {fetchEpisodesByIdTrip} from "./episodes";

const CREATE_EPISODE = 'episodes/CREATE_EPISODE';
const CREATE_EPISODE_SUCCESS = 'episodes/CREATE_EPISODE_SUCCESS';
const CREATE_EPISODE_FAIL = 'episodes/CREATE_EPISODE_FAIL';

const initialState = {
  errorMessage: null,
  createSuccess: false
};

// Reducer

export default function episodeCreationReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_EPISODE_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
        createSuccess: false
      };
    case CREATE_EPISODE_SUCCESS:
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

export function createEpisode(idTrip, episodeInfo) {
  return {
    types: [CREATE_EPISODE, CREATE_EPISODE_SUCCESS, CREATE_EPISODE_FAIL],
    promise: (client) => client.post(`/api/trips/${idTrip}/episodes`, episodeInfo),
    afterSuccess(dispatch, getState, response) {
      // dispatch(fetchEpisodesByIdTrip(idTrip));
    }
  };
}
