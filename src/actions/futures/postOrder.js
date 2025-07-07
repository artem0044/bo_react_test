import { ALERT, FUTURES } from "../../constants";
import axios from "@helpers/axios/private.axios";

export const PostOrder = (data) => async (dispatch) => {
  try {
    const resp = await axios.post("/futures/orders/store", {
      ...data
    });
    
    console.log(resp.data)

    dispatch({ type: FUTURES.SHOW_NOTIFICATION, payload: {...resp.data.data, notificationType: 'orderOpened'} });

  } catch (e) {
    console.log(e)
    dispatch({
      type: ALERT.ALERT_ERROR, 
      payload: e.response?.data?.message
    });
  }
};

