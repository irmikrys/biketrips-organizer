const FETCH_EPISODE = 'episode/FETCH_EPISODE';
const FETCH_EPISODE_SUCCESS = 'episode/FETCH_EPISODE_SUCCESS';
const FETCH_EPISODE_FAIL = 'episode/FETCH_EPISODE_FAIL';

const initialState = {
  updating: true,
  episode: null
};

// Reducer

export default function episodeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EPISODE:
      return {
        ...state,
        updating: true,
        user: null
      };
    case FETCH_EPISODE_SUCCESS:
      return {
        ...state,
        updating: false,
        user: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchEpisodeById(idTrip, idEpisode) {
  return  {
    types: [FETCH_EPISODE, FETCH_EPISODE_SUCCESS, FETCH_EPISODE_FAIL],
    promise: client => client.get(`/api/trips/${idTrip}/episodes/${idEpisode}`)
  };
}
