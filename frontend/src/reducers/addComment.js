import {browserHistory} from 'react-router';
import {fetchCommentsByIdTrip} from "./fetchComments";

const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const CREATE_COMMENT_SUCCESS = 'comments/CREATE_COMMENT_SUCCESS';
const CREATE_COMMENT_FAIL = 'comments/CREATE_COMMENT_FAIL';

const initialState = {
  errorMessage: null,
  createSuccess: false
};

// Reducer

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COMMENT_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
        createSuccess: false
      };
    case CREATE_COMMENT_SUCCESS:
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

export function createComment(idTrip, commentInfo) {
  return {
    types: [CREATE_COMMENT, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAIL],
    promise: (client) => client.post(`/api/trips/${idTrip}/comments`, commentInfo),
    afterSuccess: (dispatch, getState, response) => {
      dispatch(fetchCommentsByIdTrip(idTrip));
      browserHistory.push(`/trips/${idTrip}`);
    }
  };
}
