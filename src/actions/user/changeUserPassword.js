import { ALERT } from "../../constants";
import axios from "@helpers/axios/private.axios";

export const changeUserNumber =
  ({ old_password, password, confirm_password }) =>
  async (dispatch) => {
    const resp = await axios.post("/users/change/password", {
      old_password,
      password,
      confirm_password,
    });

    const { message } = resp.data;

    dispatch({ type: ALERT.ALERT_SUCCESS, payload: message });

    return resp.data;
  };
