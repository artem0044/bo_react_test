import axios from "@helpers/axios/private.axios";
import { ALERT, WALLET } from "../../constants";

export const gatewayDeposit =
  ({ amount, id }) =>
  async (dispatch) => {
    try {
      const resp = await axios.post(`/gateway/${id}/deposit`, {
        amount,
      });

      const {type, url_form } = resp.data.data;

      if (type === "form") {
        const div = document.createElement("div");
        div.hidden = true;

        div.innerHTML = resp.data.data.form;

        document.body.appendChild(div);
        const form = div.querySelector("form");
        form.submit();
        div.remove();
      }

      if (type === "link") {
        window.location = url_form;
      }

      return resp;
    } catch (error) {
      dispatch({
        type: ALERT.ALERT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const getTransaction = (transaction_id) => async (dispatch) => {
  try {
    const response = await axios.get(`/transaction/${transaction_id}`);
    const { status, amount, currency } = response.data.data;

    const data = {
      status,
      amount,
      currency,
    };

    console.log(data);

    dispatch({
      type: WALLET.SHOW_POPUP,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALERT.ALERT_ERROR,
      payload: error.response.data.message,
    });
  }
};
