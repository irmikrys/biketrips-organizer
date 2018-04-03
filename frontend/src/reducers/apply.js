import { browserHistory } from 'react-router';

const APPLY = 'apply/APPLY';
const APPLY_SUCCESS = 'apply/APPLY_SUCCESS';
const APPLY_FAIL = 'apply/APPLY_FAIL';

const initialState = {
  errorMessage: null,
  applySuccess: false
};

// Reducer

export default function applyReducer(state = initialState, action) {
  switch (action.type) {
    case APPLY_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
        applySuccess: false
      };
    case APPLY_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        applySuccess: true
      };
    default:
      return state;
  }
}

// Actions

export function apply(applicationInfo) {
  return  {
    types: [APPLY, APPLY_SUCCESS, APPLY_FAIL],
    promise: (client) => client.post('/api/apply', applicationInfo),
    afterSuccess: () => {
      browserHistory.push('/');
    }
  };
}
