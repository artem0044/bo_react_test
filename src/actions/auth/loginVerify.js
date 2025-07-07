import { AUTH } from "../../constants";
import axios from "@helpers/axios/public.axios";

export const loginVerify =
  ({ email, password, hash, verification }) =>
  async (dispatch) => {
    try {
      const response = await axios.post("/login/verify", {
        email,
        password,
        hash,
        code: verification,
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

      return {
        user,
        token,
      };
    } catch (e) {
      dispatch({ type: AUTH.AUTH_ERROR, payload: e.response.data.message });
      throw e;
    }
  };
