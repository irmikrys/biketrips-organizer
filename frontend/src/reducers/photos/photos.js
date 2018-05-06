const FETCH_PHOTOS = 'photos/FETCH_PHOTOS';
const FETCH_PHOTOS_SUCCESS = 'photos/FETCH_PHOTOS_SUCCESS';
const FETCH_PHOTOS_FAIL = 'photos/FETCH_PHOTOS_FAIL';

const initialState = {
  updating: true,
  photos: []
};

// Reducer

export default function fetchPhotosReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PHOTOS:
      return {
        ...state,
        updating: true
      };
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.result.data,
        updating: false
      };
    default:
      return state;
  }
}

// Actions

export function fetchPhotosByIdAlbum(idTrip, idAlbum) {
  return  {
    types: [FETCH_PHOTOS, FETCH_PHOTOS_SUCCESS, FETCH_PHOTOS_FAIL],
    promise: client => client.get(`/api/trips/${idTrip}/albums/${idAlbum}/photos`)
  };
}
