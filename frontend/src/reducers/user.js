const FETCH_USER = 'user/FETCH_USER';
const FETCH_USER_SUCCESS = 'user/FETCH_USER_SUCCESS';
const FETCH_USER_FAIL = 'user/FETCH_USER_FAIL';

const initialState = {
  updating: true,
  user: null
};

// Reducer

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        updating: true,
        user: null
      };
    case FETCH_USER_SUCCESS:
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

export function fetchUserByUsername(username) {
  return  {
    types: [FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAIL],
    promise: client => client.get(`/api/profile/${username}`)
  };
}
