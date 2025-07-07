import { USER } from "../../constants";

const initState = {
  user: {},
  loading: true,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER.USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER.USER_LOADED:
      return {
        ...state,
        loading: false,
      };

    case USER.USER_RESPONSE:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };

    case USER.USER_FIELD:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
