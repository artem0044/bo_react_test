import { ALERT } from "../../constants";

const initState = {
  message: "",
  hidden: true,
  type: "",
};

const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case ALERT.ALERT_SUCCESS:
      return {
        ...state,
        hidden: false,
        type: "success",
        message: action.payload,
      };

    case ALERT.ALERT_ERROR:
      return {
        ...state,
        hidden: false,
        type: "error",
        message: action.payload,
      };

    case ALERT.ALERT_HIDE:
      return {
        ...state,
        hidden: true,
        type: "",
      };

    default:
      return state;
  }
};

export default alertReducer;
