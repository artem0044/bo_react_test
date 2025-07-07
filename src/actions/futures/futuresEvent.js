import {BIDS} from "../../constants";
import store from "../../redux/store";

export const futuresEvent = () => (dispatch) => {
  const state = store.getState();
  const bidEventListener = (e) => {
    console.log("!!!!! EVENT BY SOCKETS:", e);
    const state = store.getState();
    const walletType = state.wallet.active_wallet.type;

    if (e.event === "active" && e.bid.wallet_init === walletType) {
      dispatch({type: BIDS.ADD_TO_OPENED_HISTORY, payload: e.bid});
    }

    if (e.event === "closed" && e.bid.wallet_init === walletType) {
      dispatch({type: BIDS.REMOVE_FROM_OPENED_HISTORY, payload: e.bid.id});
      dispatch({
        type: BIDS.ADD_TO_CLOSED_HISTORY, payload: {date: e.bid.closing_at.split(" ")[0], bid: e.bid},
      });
    }
  };
  
  state.channel.user.listen("BidEvent", bidEventListener);
  
  return () => {
    state.channel.user.stopListening("FuturesEvent", bidEventListener);
  };
};
