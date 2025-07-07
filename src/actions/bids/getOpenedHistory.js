import { BIDS } from "../../constants";
import axios from "@helpers/axios/private.axios";
import store from "../../redux/store";

export const getOpenedHistory = () => async (dispatch) => {
  try {
    const state = store.getState();
    const walletType = state.wallet.active_wallet.type;

    dispatch({ type: BIDS.HISTORY_REQUEST });
    const resp = await axios.get(
      `/bid/active/${walletType ? walletType : "demo"}`
    );

    dispatch({
      type: BIDS.CHANGE_OPENED_HISTORY,
      payload: resp.data.data.bids,
    });
    dispatch({ type: BIDS.HISTORY_LOADED });
  } catch (e) {
    console.log("ERRROR");
  }
};
