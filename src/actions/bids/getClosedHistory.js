import { BIDS } from "../../constants";
import axios from "@helpers/axios/private.axios";
import store from "../../redux/store";

export const getClosedHistory =
  ({ count = 1 }) =>
  async (dispatch) => {
    try {
      const state = store.getState();

      const walletType = state.wallet.active_wallet.type;

      console.log(state, "state");

      dispatch({ type: BIDS.LOADING_CLOSED_HISTORY });
      const resp = await axios.get(
        `/bid/closed/${walletType ? walletType : "demo"}?start=${count}`
      );
      const data = resp.data;
      console.log(data);
      dispatch({
        type: BIDS.CHANGE_CLOSED_HISTORY,
        payload: {
          data: data.data.bids,
          total: data.pagination.total,
        },
      });
    } catch (e) {
      console.log("ERRROR");
    }
  };
