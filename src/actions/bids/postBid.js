import { ALERT, BIDS } from "../../constants";
import axios from "@helpers/axios/private.axios";
import {playSound} from "@helpers";
import bidSound from "@assets/bid.mp3";
export const PostBid = ({ type, pair_name, expatriation, contribution }) => async (dispatch) => {
  try {
    const resp = await axios.post("/bid", {
      type,
      pair_name,
      expatriation,
      contribution,
    });

    dispatch({ type: BIDS.SHOW_NOTIFICATION, payload: resp.data.data.bid });
    dispatch({ type: BIDS.ADD_TO_OPENED_HISTORY, payload: resp.data.data.bid });
    playSound(bidSound);

  } catch (e) {
    dispatch({
      type: ALERT.ALERT_ERROR, 
      payload: e.response.data.message
    });
  }
};

