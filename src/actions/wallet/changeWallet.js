import { WALLET } from "../../constants";
import axios from "@helpers/axios/private.axios";
import store from "../../redux/store";

export const changeWallet = (wallet_obj) => async (dispatch) => {
  try {
    const resp = await axios.post("/wallet/change", {
      wallet_id: wallet_obj.id,
    });

    console.log(resp);
    dispatch({
      type: WALLET.CHANGE_WALLET,
      payload: wallet_obj,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getWallets = () => async (dispatch) => {
  try {
    dispatch({ type: WALLET.WALLET_LOADING });
    const response = await axios.get("/wallet/all");
    const data = response.data.data;

    dispatch({
      type: WALLET.UPDATE_WALLETS,
      payload: {
        wallets: data,
        realWallet: data.find((el) => el.type === "real"),
      },
    });

    const activeWallet = data.find((el) => el.active_now === 1);

    console.log(activeWallet)
    
    dispatch({
      type: WALLET.CHANGE_WALLET,
      payload: activeWallet,
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateWallets = () => async (dispatch) => {
  try {
    const response = await axios.get("/wallet/all");
    const data = response.data.data;
    dispatch({
      type: WALLET.UPDATE_WALLETS,
      payload: {
        wallets: data,
        realWallet: data.find((el) => el.type === "real"),
      },
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const updateWalletEvent = () => (dispatch) => {
  let state = store.getState();
  console.log("[updateWalletEvent]");
  state.channel.user.listen("UpdateBalance", (e) => {
    const currentState = store.getState();
    console.log("!!!!! EVENT BY SOCKETS [UpdateBalance]:", e);

    console.log(e, currentState);

    const data = [...currentState.wallet.wallets];

    data.forEach((el) => {
      if (el.type === e.wallet.type) {
        el.balance = e.wallet.balance;
      }
    });
    dispatch({
      type: WALLET.UPDATE_WALLETS,
      payload: {
        wallets: data,
        realWallet: data.find((el) => el.type === "real"),
      },
    });
  });
};
