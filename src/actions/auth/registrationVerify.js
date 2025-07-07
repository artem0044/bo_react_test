import axios from "@helpers/axios/public.axios";
import { AUTH } from "../../constants";

export const registrationVerify =
  ({ hash }) =>
  async (dispatch) => {
    try {
      const response = await axios.post("/users/verify", {
        hash,
      });

      const { user, token } = response.data.data;

      console.log(response, hash);

      dispatch({
        type: AUTH.AUTH_RESPONSE,
        payload: {
          user,
          token,
          isDemoUser: false,
        },
      });
      // dispatch({ type: AUTH.AUTH_IS_AUTH, payload: false });

      return {
        user,
        token,
      };
    } catch (e) {
      dispatch({ type: AUTH.AUTH_ERROR, payload: e.response.data.message });
      throw e;
    }
  };
