import { ALERT, FUTURES } from "../../constants";
import axios from "@helpers/axios/private.axios";

export const PostPosition = (data) => async (dispatch) => {
  try {
    const resp = await axios.post("/futures/positions/store", {
      ...data
    });

    dispatch({ type: FUTURES.SHOW_NOTIFICATION, payload: {...resp.data.data, notificationType: 'orderOpened'} });
  } catch (e) {
    dispatch({
      type: ALERT.ALERT_ERROR,
      payload: e.response?.data?.message
    });
  }
};

