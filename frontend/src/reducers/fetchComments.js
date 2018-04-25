const FETCH_COMMENTS = 'comments/FETCH_COMMENTS';
const FETCH_COMMENTS_SUCCESS = 'comments/FETCH_COMMENTS_SUCCESS';
const FETCH_COMMENTS_FAIL = 'comments/FETCH_COMMENTS_FAIL';

const initialState = {
  updating: true,
  comments: []
};

// Reducer

export default function fetchCommentsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        updating: true
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.result.data,
        updating: false
      };
    default:
      return state;
  }
}

// Actions

export function fetchCommentsByIdTrip(idTrip) {
  return  {
    types: [FETCH_COMMENTS, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAIL],
    promise: client => client.get(`/api/trips/${idTrip}/comments`)
  };
}
