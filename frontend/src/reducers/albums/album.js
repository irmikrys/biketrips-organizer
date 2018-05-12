const FETCH_ALBUM = 'album/FETCH_ALBUM';
const FETCH_ALBUM_SUCCESS = 'album/FETCH_ALBUM_SUCCESS';
const FETCH_ALBUM_FAIL = 'album/FETCH_ALBUM_FAIL';

const initialState = {
  updating: true,
  album: null
};

// Reducer

export default function albumReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALBUM:
      return {
        ...state,
        updating: true,
        album: null
      };
    case FETCH_ALBUM_SUCCESS:
      return {
        ...state,
        updating: false,
        album: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchAlbumByIdTripAndIdAlbum(idTrip, idAlbum) {
  return  {
    types: [FETCH_ALBUM, FETCH_ALBUM_SUCCESS, FETCH_ALBUM_FAIL],
    promise: client => client.get(`/api/trips/${idTrip}/albums/${idAlbum}`)
  };
}
