import { ALERT, USER } from "../../constants";
import axios from "@helpers/axios/private.axios";

export const changeUserNumber =
  ({ code }) =>
  async (dispatch) => {
    const resp = await axios.post("/users/change/phone/confirm", {
      code,
    });

    const {
      message,
      data: { phone },
    } = resp.data;

    dispatch({ type: USER.USER_FIELD, payload: { phone } });
    dispatch({ type: ALERT.ALERT_SUCCESS, payload: message });

    return resp.data;
  };
