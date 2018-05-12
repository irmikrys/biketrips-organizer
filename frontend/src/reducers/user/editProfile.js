const EDIT_PROFILE = 'edit_profile/EDIT_PROFILE';
const EDIT_PROFILE_SUCCESS = 'edit_profile/EDIT_PROFILE_SUCCESS';
const EDIT_PROFILE_FAIL = 'edit_profile/EDIT_PROFILE_FAIL';

const initialState = {
  errorMessage: null,
};

// Reducer

export default function editProfileReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        errorMessage: action.error.data.messageKey,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
}

// Actions

export function editProfile(userInfo, fetchUser) {
  const username = userInfo.username;
  return  {
    types: [EDIT_PROFILE, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAIL],
    promise: (client) => client.put(`/api/users/${username}`, userInfo),
    afterSuccess: () => {
      fetchUser();
    }
  };
}
