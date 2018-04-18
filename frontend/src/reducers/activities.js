const FETCH_ACTIVITIES = 'activities/FETCH_ACTIVITIES';
const FETCH_ACTIVITIES_SUCCESS = 'activities/FETCH_ACTIVITIES_SUCCESS';
const FETCH_ACTIVITIES_FAIL = 'activities/FETCH_ACTIVITIES_FAIL';

const initialState = {
  updating: true,
  activities: []
};

// Reducer

export default function activitiesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {
        ...state,
        updating: true
      };
    case FETCH_ACTIVITIES_SUCCESS:
      return {
        ...state,
        updating: false,
        activities: action.result.data
      };
    default:
      return state;
  }
}

// Actions

export function fetchAvailableActivities() {
  return  {
    types: [FETCH_ACTIVITIES, FETCH_ACTIVITIES_SUCCESS, FETCH_ACTIVITIES_FAIL],
    promise: client => client.get(`/api/activities`)
  };
}
