import axios from "@helpers/axios/public.axios";
import { AUTH } from "../../constants";
import { loadState } from "@helpers/storage/storeLocalData";

export const registration =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const p_hash = loadState("p_hash");
      const p_id = loadState("p_id");

      await axios.post("/register", {
        email,
        password,
        name: "test",
        type: "customer",
        p_hash,
        p_id,
      });
    } catch (e) {
      dispatch({ type: AUTH.AUTH_ERROR, payload: e.response.data.message });
      throw e;
    }
  };
