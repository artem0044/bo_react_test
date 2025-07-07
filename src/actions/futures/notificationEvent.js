import {FUTURES} from "../../constants";
import store from "../../redux/store";

export const notificationEvent = () => (dispatch) => {
  const state = store.getState();
  
  const notificationEventListener = (e) => {
    console.log("!!!!! EVENT BY SOCKETS Notification:", e);
    dispatch({type: FUTURES.SHOW_NOTIFICATION, payload: {text: e.message, notificationType: 'message', id: new Date().getTime()}});
  };

  state.channel.user.listen("FuturesNotification", notificationEventListener);

  return () => {
    state.channel.user.stopListening("FuturesNotification", notificationEventListener);
  };
};
