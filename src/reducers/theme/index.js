import { THEME } from "../../constants";
import config from "../../config";

const initState = {
  theme: config.default_theme,
};

const themeReducer = (state = initState, action) => {
  switch (action.type) {
    case THEME.CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
};

export default themeReducer;
