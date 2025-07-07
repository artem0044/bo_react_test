import React, { useState } from "react";
import { WALLET } from "../../../../../constants";
import { Button } from "@components/library";
import Input from "@components/library/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { confirmWithdrawal, updateWallets } from "@actions";
import { useForm } from "react-hook-form";
import axios from "@helpers/axios/private.axios";
import { useTranslation } from "@helpers/translate";

import "./index.sass";

const ConfirmWithdrawal = () => {
  const [show2FA, setShow2FA] = useState(false);
  const { withdrawalData, showWithdrawal } = useSelector(
    (state) => state.wallet
  );
  const {
    currency,
    amount,
    method,
    fee,
    withdrawn,
    transaction: { id, gateway_id, payee_wallet },
  } = withdrawalData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { __ } = useTranslation();

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm();

  const confirm = (data) => {
    const { code } = data;

    setLoading(true);
    dispatch(confirmWithdrawal({ code, id }))
      .then(() => {
        dispatch(updateWallets());
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const send2FACode = async () => {
    try {
      const resp = await axios.get(`/gateway/${gateway_id}/verify-request`);

      setShow2FA(resp.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={`popup confirmWithdrawal-popup ${
        showWithdrawal ? "active" : ""
      }`}
      onClick={() => dispatch({ type: WALLET.HIDE_WITHDRAWAL })}
    >
      <div onClick={(e) => e.stopPropagation()} className="popup__content">
        <form
          onChange={() => setError(false)}
          onSubmit={handleSubmit(confirm)}
          className="confirmWithdrawal"
        >
          <h2 className="confirmWithdrawal__title">
            {__("wallet.confirm_withdrawal")}
          </h2>
          <p className="confirmWithdrawal__text">
            {__("wallet.confirm_withdrawal_text")}
          </p>

          <div className="fiat-info fiat-info--confirm">
            <ul className="fiat-info__list">
              {currency && (
                <li className="fiat-info__item">
                  <div>
                    <p className="fiat-info__text">{__("wallet.currency")}:</p>
                  </div>
                  <div>
                    <p className="fiat-info__value fiat-info__value--bg">
                      {currency}
                    </p>
                  </div>
                </li>
              )}
              {amount && (
                <li className="fiat-info__item">
                  <div>
                    <p className="fiat-info__text">{__("common.amount")}:</p>
                  </div>
                  <div>
                    <p className="fiat-info__value fiat-info__value--bg">
                      {amount} {currency}
                    </p>
                  </div>
                </li>
              )}
              {method && (
                <li className="fiat-info__item">
                  <div>
                    <p className="fiat-info__text">
                      {__("common.payment_method")}
                    </p>
                  </div>
                  <div>
                    <p className="fiat-info__value">{method}</p>
                  </div>
                </li>
              )}
              {payee_wallet && (
                <li className="fiat-info__item">
                  <div>
                    <p className="fiat-info__text">
                      {__("common.payee_wallet")}
                    </p>
                  </div>
                  <div>
                    <p className="fiat-info__value">{payee_wallet}</p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="fiat-info fiat-info--confirm">
            <ul className="fiat-info__list">
              {fee && (
                <li className="fiat-info__item">
                  <div>
                    <p className="fiat-info__text">
                      {__("wallet.platform_fee")}:
                    </p>
                  </div>
                  <div>
                    <p className="fiat-info__value">{fee}%</p>
                  </div>
                </li>
              )}
              {withdrawn && (
                <li className="fiat-info__item">
                  <div>
                    <p className="fiat-info__text">
                      {__("wallet.will_be_withdrawn")}:
                    </p>
                  </div>
                  <div>
                    <p className="fiat-info__value">
                      {withdrawn} {currency}
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {show2FA ? (
            <>
              <Input
                className="confirmWithdrawal__inp-wrap"
                data={{
                  label: `${__("wallet.enter_2fa")}`,
                  type: "text",
                  placeholder: `${__("wallet.digit")}`,
                  errors,
                  error,
                  settings: {
                    ...register("code", {
                      required: true,
                      minLength: 6,
                      maxLength: 6,
                    }),
                  },
                  message: `${__("error.invalid_code_format")}`,
                  name: "code",
                }}
              />
              {error && <p className="auth-form__error">{error}</p>}
            </>
          ) : (
            <Button
              className="confirmWithdrawal__2fa-btn"
              onClick={send2FACode}
              type="button"
              color="orange"
              size="middle"
            >
              {__("wallet.send2FA")}
            </Button>
          )}

          <div className="confirmWithdrawal__wrap-btns">
            <Button
              onClick={() => dispatch({ type: WALLET.HIDE_WITHDRAWAL })}
              className="confirmWithdrawal__btn"
              color="grey"
              size="middle"
            >
              {__("common.cancel")}
            </Button>
            <Button
              className="confirmWithdrawal__btn"
              color="orange"
              size="middle"
              disabled={!isValid || !show2FA || error}
              isLoading={loading}
              type="submit"
            >
              {__("common.confirm")}
            </Button>
          </div>
        </form>
        <button
          onClick={() => dispatch({ type: WALLET.HIDE_WITHDRAWAL })}
          type="button"
          className="popup__close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L20.5303 19.4697C20.8232 19.7626 20.8232 20.2374 20.5303 20.5303C20.2374 20.8232 19.7626 20.8232 19.4697 20.5303L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.5303 3.46967C20.8232 3.76256 20.8232 4.23744 20.5303 4.53033L4.53033 20.5303C4.23744 20.8232 3.76256 20.8232 3.46967 20.5303C3.17678 20.2374 3.17678 19.7626 3.46967 19.4697L19.4697 3.46967C19.7626 3.17678 20.2374 3.17678 20.5303 3.46967Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ConfirmWithdrawal;
