import axios from "@helpers/axios/public.axios";
import { AUTH } from "../../constants";

export const createDemoUser = () => async (dispatch) => {
  try {
    const response = await axios.post("/register/demo");

    const { user, token } = response.data.data;

    dispatch({
      type: AUTH.AUTH_RESPONSE,
      payload: {
        user,
        token,
        isDemoUser: true,
      },
    });

    return {
      user,
      token,
    };
  } catch (e) {
    dispatch({ type: AUTH.AUTH_ERROR, payload: e.response.data.message });
    throw e;
  }
};
