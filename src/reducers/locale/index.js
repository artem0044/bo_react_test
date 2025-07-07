import { LOCALE } from "../../constants";
import config from "../../config";

const initState = {
  locale: config.default_locale,
  loading: false,
};

const localeReducer = (state = initState, action) => {
  switch (action.type) {
    case LOCALE.LOADING_LOCALE:
      return {
        ...state,
        loading: true,
      };
    case LOCALE.CHANGE_LOCALE:
      return {
        ...state,
        locale: action.payload,
        loading: false,
      };
    case LOCALE.END_LOADING_LOCALE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default localeReducer;
