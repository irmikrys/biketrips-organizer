const FETCH_LEVELS = 'levels/FETCH_LEVELS';
const FETCH_LEVELS_SUCCESS = 'levels/FETCH_LEVELS_SUCCESS';
const FETCH_LEVELS_FAIL = 'levels/FETCH_LEVELS_FAIL';

const initialState = {
  updating: true,
  levels: []
};

// Reducer

export default function levelsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEVELS:
      return {
        ...state,
        updating: true
      };
    case FETCH_LEVELS_SUCCESS:
      return {
        ...state,
        updating: false,
        levels: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchAvailableLevels() {
  return  {
    types: [FETCH_LEVELS, FETCH_LEVELS_SUCCESS, FETCH_LEVELS_FAIL],
    promise: client => client.get(`/api/levels`)
  };
}
