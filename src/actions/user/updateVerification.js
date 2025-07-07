import { ALERT, USER } from "../../constants";
import store from "../../redux/store";

export const updateVerification = () => (dispatch) => {
  let state = store.getState();
  console.log("[updateVerification]");
  state.channel.user.listen("OndatoEvent", (e) => {
    console.log("!!!!! EVENT BY SOCKETS [OndatoEvent]:", e);

    dispatch({
      type: USER.USER_FIELD,
      payload: { ondato_status: e.ondato_status },
    });

    if (e.ondato_status === 1 || e.ondato_status === 4) {
      dispatch({ type: ALERT.ALERT_ERROR, payload: e.message });
    } else {
      dispatch({ type: ALERT.ALERT_SUCCESS, payload: e.message });
    }
  });
};
