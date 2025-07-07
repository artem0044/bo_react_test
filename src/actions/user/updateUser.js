import { ALERT, USER } from "../../constants";
import axios from "@helpers/axios/private.axios";

export const updateUser =
  ({ data }) =>
  async (dispatch) => {
    console.log(data);
    try {
      const resp = await axios.post("/users/update", {
        ...data,
      });

      dispatch({ type: USER.USER_FIELD, payload: resp.data.data.user });

      return resp.data;
    } catch (e) {
      console.log(e);
      const { message } = e.response.data;
      dispatch({ type: ALERT.ALERT_ERROR, payload: message });
      throw e;
    }
  };

export const updateUserKyc =
  ({ data }) =>
  async (dispatch) => {
    console.log(data);
    try {
      const resp = await axios.post("/kyc/start", {
        ...data,
      });

      return resp.data;
    } catch (e) {
      const { message } = e.response.data;
      dispatch({ type: ALERT.ALERT_ERROR, payload: message });
      throw e;
    }
  };
