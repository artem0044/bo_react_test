import { AUTH } from "../../constants";

const initState = {
  token: null,
  user: null,
  loading: false,
  error_message: [],
  isAuth: false,
  isDemoUser: true,
  isAuthPopupOpen: true,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case AUTH.AUTH_LOADED:
      return {
        ...state,
        loading: false,
      };

    case AUTH.AUTH_RESPONSE:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        isAuth: true,
        isDemoUser: action.payload.isDemoUser,
      };

    case AUTH.AUTH_LOGOUT:
      return initState;

    case AUTH.AUTH_SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    case AUTH.AUTH_FAILURE:
      return {
        ...state,
        error_message: action.payload,
      };

    case AUTH.AUTH_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };

    case AUTH.AUTH_CHANGE_POPUP:
      return {
        ...state,
        isAuthPopupOpen: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
