import { LOCALE } from "../../constants";
import axios from "@helpers/axios/private.axios";

export const changeLocale =
  ({ locale }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOCALE.LOADING_LOCALE });
      await axios.post("/users/update", {
        values: {
          locale,
        },
      });
      dispatch({ type: LOCALE.CHANGE_LOCALE, payload: locale });
    } catch (e) {
      dispatch({ type: LOCALE.END_LOADING_LOCALE });
    }
  };
