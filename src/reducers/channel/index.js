import { CHANEL } from "../../constants";

const initState = {
  user: null,
};

const chanelReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANEL.CHANGE_USER_CHANEL:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default chanelReducer;
