import axios from "@helpers/axios/public.axios";
import { ALERT, AUTH } from "../../constants";

export const recoverPassword =
  ({ email }) =>
  async (dispatch) => {
    try {
      const response = await axios.post("/forgot", {
        email,
      });

      const { message } = response.data;

      dispatch({ type: ALERT.ALERT_SUCCESS, payload: message });

      return response.data.data;
    } catch (e) {
      dispatch({ type: AUTH.AUTH_ERROR, payload: e.response.data.message });
      throw e;
    }
  };
