import {browserHistory} from 'react-router';
import {fetchPhotosByIdAlbum} from "./photos";

const CREATE_PHOTO = 'photos/CREATE_PHOTO';
const CREATE_PHOTO_SUCCESS = 'photos/CREATE_PHOTO_SUCCESS';
const CREATE_PHOTO_FAIL = 'photos/CREATE_PHOTO_FAIL';

const initialState = {
  errorMessage: null,
  createSuccess: false
};

// Reducer

export default function photoCreationReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PHOTO_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
        createSuccess: false
      };
    case CREATE_PHOTO_SUCCESS:
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

export function addPhotoToAlbum(idTrip, idAlbum, photoInfo) {
  return {
    types: [CREATE_PHOTO, CREATE_PHOTO_SUCCESS, CREATE_PHOTO_FAIL],
    promise: (client) => client.post(`/api/trips/${idTrip}/albums/${idAlbum}/photos`, photoInfo),
    afterSuccess: (dispatch, getState, response) => {
      browserHistory.push(`/trips/${idTrip}/albums/${idAlbum}/`);
      dispatch(fetchPhotosByIdAlbum(idTrip, idAlbum));
    }
  };
}
