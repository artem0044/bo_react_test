import { USER } from "../../constants";
import axios from "@helpers/axios/private.axios";

export const getUserData = () => async (dispatch) => {
  try {
    dispatch({ type: USER.USER_REQUEST });
    const response = await axios.get("/users/me");

    const {
      user,
      user: { is_banned },
    } = response.data.data;

    if (!is_banned) {
      dispatch({
        type: USER.USER_RESPONSE,
        payload: { user },
      });
    }

    return { is_banned };
  } catch (error) {
    console.error(error);
  }
};
