const FETCH_ALBUMS = 'albums/FETCH_ALBUMS';
const FETCH_ALBUMS_SUCCESS = 'albums/FETCH_ALBUMS_SUCCESS';
const FETCH_ALBUMS_FAIL = 'albums/FETCH_ALBUMS_FAIL';

const initialState = {
  updating: true,
  albums: []
};

// Reducer

export default function fetchAlbumsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALBUMS:
      return {
        ...state,
        updating: true
      };
    case FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.result.data,
        updating: false
      };
    default:
      return state;
  }
}

// Actions

export function fetchAlbumsByIdTrip(idTrip) {
  return  {
    types: [FETCH_ALBUMS, FETCH_ALBUMS_SUCCESS, FETCH_ALBUMS_FAIL],
    promise: client => client.get(`/api/trips/${idTrip}/albums`)
  };
}
