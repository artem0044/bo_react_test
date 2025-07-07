import axios from "@helpers/axios/private.axios";
import {ALERT, WALLET} from "../../constants";

export const transfer =
  ({ amount, from, to}) =>
    async (dispatch) => {
      try {
        const resp = await axios.post(`/wallet/transfer-balance`, {
          amount,
          wallet_type_from: from,
          wallet_type_to: to,
        });
        
        dispatch({type: WALLET.HIDE_TRANSFER_POPUP,});
        dispatch({
          type: ALERT.ALERT_SUCCESS,
          payload: resp.data.message,
        });
        return resp;
      } catch (error) {
        dispatch({
          type: ALERT.ALERT_ERROR,
          payload: error.response.data.message,
        });
      }
    };