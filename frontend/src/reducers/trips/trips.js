import * as _ from "lodash";

const FETCH_TRIPS = 'trips/FETCH_TRIPS';
const FETCH_TRIPS_SUCCESS = 'trips/FETCH_TRIPS_SUCCESS';
const FETCH_TRIPS_FAIL = 'trips/FETCH_TRIPS_FAIL';
const FILTER_CRITERIA = 'trips/FILTER_CRITERIA';


const initialState = {
  updating: true,
  trips: [],
  filterCriteria: {},
};

// Reducer

export default function tripsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRIPS:
      return {
        ...state,
        updating: true
      };
    case FETCH_TRIPS_SUCCESS:
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

export function fetchModeratorTrips(filterCriteria) {
  const request = buildRequest(filterCriteria);
  return {
    types: [FETCH_TRIPS, FETCH_TRIPS_SUCCESS, FETCH_TRIPS_FAIL],
    promise: client => client.get(`/api/moderator/trips?${request}`)
  };
}

export function fetchUserTrips() {
  return {
    types: [FETCH_TRIPS, FETCH_TRIPS_SUCCESS, FETCH_TRIPS_FAIL],
    promise: client => client.get(`/api/user/trips`)
  };
}

export const buildRequest = filterCriteria => {
  return _.isEmpty(filterCriteria)
    ? ""
    : Object.keys(filterCriteria).reduce((previous, current) => `${previous}&${current}=${filterCriteria[current]}`, "");
};
