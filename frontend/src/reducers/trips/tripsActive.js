import * as _ from "lodash";

const FETCH_TRIPS_ACTIVE = 'trips/FETCH_TRIPS_ACTIVE';
const FETCH_TRIPS_ACTIVE_SUCCESS = 'trips/FETCH_TRIPS_ACTIVE_SUCCESS';
const FETCH_TRIPS_ACTIVE_FAIL = 'trips/FETCH_TRIPS_ACTIVE_FAIL';
const FILTER_CRITERIA = 'trips/FILTER_CRITERIA';

const initialState = {
  updating: true,
  trips: [],
  filterCriteria: {},
};

// Reducer

export default function tripsActiveReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRIPS_ACTIVE:
      return {
        ...state,
        updating: true
      };
    case FETCH_TRIPS_ACTIVE_SUCCESS:
      return {
        ...state,
        trips: action.result.data,
        updating: false
      };
    case FILTER_CRITERIA:
      return {
        ...state,
        filterCriteria: action.filterCriteria,
        updating: true
      };
    default:
      return state;
  }
}

// Actions

export function setFilterCriteria(filterCriteria) {
  return {type: FILTER_CRITERIA, filterCriteria};
}

export function fetchUserActiveTrips(filterCriteria) {
  const request = buildRequest(filterCriteria);
  return {
    types: [FETCH_TRIPS_ACTIVE, FETCH_TRIPS_ACTIVE_SUCCESS, FETCH_TRIPS_ACTIVE_FAIL],
    promise: client => client.get(`/api/user/trips/active?${request}`)
  };
}

export function fetchModeratorActiveTrips() {
  return {
    types: [FETCH_TRIPS_ACTIVE, FETCH_TRIPS_ACTIVE_SUCCESS, FETCH_TRIPS_ACTIVE_FAIL],
    promise: client => client.get('/api/moderator/trips/active')
  };
}

export const buildRequest = filterCriteria => {
  return _.isEmpty(filterCriteria)
    ? ""
    : Object.keys(filterCriteria).reduce((previous, current) => `${previous}&${current}=${filterCriteria[current]}`, "");
};
