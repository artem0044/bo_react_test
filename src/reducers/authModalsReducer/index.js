const initialState = {
  isLogInOpen: false,
  isSignUpOpen: false,
  activeForm: null,
};

const authModalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_LOGIN_MODAL":
      return {
        ...state,
        isLogInOpen: action.payload,
        activeForm: action.payload ? "login" : null,
      };
    case "TOGGLE_SIGNUP_MODAL":
      return {
        ...state,
        isSignUpOpen: action.payload,
        activeForm: action.payload ? "signup" : null,
      };
    case "TOGGLE_RECOVER_MODAL":
      return {
        ...state,
        activeForm: action.payload ? "recover" : null,
        isLogInOpen: false,
        isSignUpOpen: false,
      };
    case "CLOSE_ALL_AUTH_MODALS":
      return {
        ...state,
        isLogInOpen: false,
        isSignUpOpen: false,
        activeForm: null,
      };
    default:
      return state;
  }
};

export default authModalsReducer;
