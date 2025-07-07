import { ALERT, WALLET } from "../../constants";
import axios from "@helpers/axios/private.axios";

export const fiatWithdrawal =
  ({ amount, bank_account, id }) =>
  async (dispatch) => {
    try {
      const resp = await axios.post(`/gateway/${id}/request`, {
        amount,
        bank_account,
      });
      console.log(resp.data.data);
      dispatch({
        type: WALLET.SHOW_WITHDRAWAL,
        payload: resp.data.data,
      });

      return resp;
    } catch (error) {
      console.error(error);
      dispatch({
        type: ALERT.ALERT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const cryptoWithdrawal =
  ({ amount, bank_account, id }) =>
  async (dispatch) => {
    console.log(cryptoWithdrawal);
    try {
      const resp = await axios.post(`/gateway/${id}/request`, {
        amount,
        bank_account,
      });

      dispatch({
        type: WALLET.SHOW_WITHDRAWAL,
        payload: resp.data.data,
      });

      return resp;
    } catch (error) {
      console.error(error);
      dispatch({
        type: ALERT.ALERT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const confirmWithdrawal =
  ({ code, id }) =>
  async (dispatch) => {
    console.log(id);
    const resp = await axios.post(`/gateway/transaction/${id}/verify`, {
      code,
    });

    dispatch({
      type: WALLET.HIDE_WITHDRAWAL,
    });
    dispatch({
      type: ALERT.ALERT_SUCCESS,
      payload: resp.data.message,
    });

    return resp;
  };
