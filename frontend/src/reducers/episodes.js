const FETCH_EPISODES = 'episodes/FETCH_EPISODES';
const FETCH_EPISODES_SUCCESS = 'episodes/FETCH_EPISODES_SUCCESS';
const FETCH_EPISODES_FAIL = 'episodes/FETCH_EPISODES_FAIL';

const initialState = {
  loading: false,
  episodes: []
};

// Reducer

export default function episodesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EPISODES:
      return {
        ...state,
        loading: true
      };
    case FETCH_EPISODES_SUCCESS:
      return {
        ...state,
        episodes: action.result.data,
        loading: false
      };
    default:
      return state;
  }
}

// Actions

export function fetchEpisodesByIdTrip(idTrip) {
  return  {
    types: [FETCH_EPISODES, FETCH_EPISODES_SUCCESS, FETCH_EPISODES_FAIL],
    promise: client => client.get(`/api/trips/${idTrip}/episodes`)
  };
}
