import {browserHistory} from 'react-router';
import {fetchCommentsByIdTrip} from "./fetchComments";

const DELETE_COMMENT = 'comments/DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS = 'comments/DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAIL = 'comments/DELETE_COMMENT_FAIL';

const initialState = {
  errorMessage: null,
  deleteSuccess: false
};

// Reducer

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
        deleteSuccess: false
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        deleteSuccess: true
      };
    default:
      return state;
  }
}

// Actions

export function deleteCommentById(idTrip, idComment) {
  return {
    types: [DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAIL],
    promise: (client) => client.delete(`/api/trips/${idTrip}/comments/${idComment}`),
    afterSuccess: (dispatch, getState, response) => {
      dispatch(fetchCommentsByIdTrip(idTrip));
      browserHistory.push(`/trips/${idTrip}`);
    }
  };
}
