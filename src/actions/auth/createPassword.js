import axios from "@helpers/axios/public.axios";
import { AUTH } from "../../constants";

export const createPassword =
  ({ myCode: code, new_password }) =>
  async (dispatch) => {
    try {
      const response = await axios.post("/change-password", {
        code,
        new_password,
      });
      console.log(response);

      return response;
    } catch (e) {
      dispatch({ type: AUTH.AUTH_ERROR, payload: e.response.data.message });
      throw e;
    }
  };
