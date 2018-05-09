import {browserHistory} from 'react-router';
import {fetchAlbumsByIdTrip} from "./albums";

const CREATE_ALBUM = 'albums/CREATE_ALBUM';
const CREATE_ALBUM_SUCCESS = 'albums/CREATE_ALBUM_SUCCESS';
const CREATE_ALBUM_FAIL = 'albums/CREATE_ALBUM_FAIL';

const initialState = {
  errorMessage: null,
  createSuccess: false
};

// Reducer

export default function albumCreationReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ALBUM_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
        createSuccess: false
      };
    case CREATE_ALBUM_SUCCESS:
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

export function createAlbum(idTrip, albumInfo) {
  return {
    types: [CREATE_ALBUM, CREATE_ALBUM_SUCCESS, CREATE_ALBUM_FAIL],
    promise: (client) => client.post(`/api/trips/${idTrip}/albums`, albumInfo),
    afterSuccess: (dispatch, getState, response) => {
      browserHistory.push(`/trips/${idTrip}/albums`);
      dispatch(fetchAlbumsByIdTrip(idTrip));
    }
  };
}
