import { ALERT, USER } from "../../constants";
import axios from "@helpers/axios/private.axios";
import error from "@components/library/UI/Alert/icons/error";

export const post2FA =
  ({ data, secret }) =>
  async (dispatch) => {
    try {
      const { code } = data;

      const resp = await axios.post("/users/2fa/verify", {
        code,
        secret,
      });

      const {
        message,
        data: { app_2fa_type },
      } = resp.data;
      console.log(USER);
      dispatch({ type: USER.USER_FIELD, payload: { app_2fa_type } });
      dispatch({ type: ALERT.ALERT_SUCCESS, payload: message });

      return resp.data;
    } catch (e) {
      const { message } = e.response.data;
      dispatch({ type: ALERT.ALERT_ERROR, payload: message });
      throw error;
    }
  };

export const post2FASms =
  ({ code }) =>
  async (dispatch) => {
    try {
      const resp = await axios.post("/users/2fa/phone/verify", {
        code,
      });

      const {
        message,
        data: { app_2fa_type },
      } = await resp.data;

      dispatch({ type: USER.USER_FIELD, payload: { app_2fa_type } });
      dispatch({ type: ALERT.ALERT_SUCCESS, payload: message });

      return resp.data;
    } catch (e) {
      const { message } = e.response.data;
      dispatch({ type: ALERT.ALERT_ERROR, payload: message });
      throw error;
    }
  };
