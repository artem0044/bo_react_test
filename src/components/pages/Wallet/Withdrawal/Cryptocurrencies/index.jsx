import React, { useState, useEffect, useCallback } from "react";
import { debounce, Grid, Skeleton, Tooltip } from "@mui/material";
import { Button } from "@components/library";
import axios from "@helpers/axios/private.axios";
import { useDispatch } from "react-redux";
import { cryptoWithdrawal } from "@actions";
import { useForm } from "react-hook-form";
import { useTranslation } from "@helpers/translate";

const Cryptocurrencies = () => {
  const [validating, setValidating] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(3);
  const [cryptoInfo, setCurrencyInfo] = useState({
    withdraw_fee: "",
    withdraw_min: "",
  });
  const dispatch = useDispatch();
  const { __ } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    clearErrors,
    watch,
    setError,
    reset,
  } = useForm();

  const getGatewayCrypto = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("/gateway/crypto");
      const data = resp.data.data;
      setCurrency(data);
      setLoading(false);

      changeInfo(data);
    } catch (e) {
      console.log(e);
    }
  };

  const changeInfo = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === currentMethod) {
        const { withdraw_fee, withdraw_min } = data[i];
        setCurrencyInfo({
          withdraw_min,
          withdraw_fee,
        });
      }
    }
  };

  const changeMethod = (data) => {
    const { id, withdraw_fee, withdraw_min } = data;
    setCurrentMethod(id);

    setCurrencyInfo({
      withdraw_min,
      withdraw_fee,
    });

    if (isValid || Object.keys(errors).length) {
      formChange();
    }
  };

  const withdrawal = () => {
    const { amount_withdrawal, bank_account } = watch();

    dispatch(
      cryptoWithdrawal({
        amount: amount_withdrawal,
        bank_account,
        id: currentMethod,
      })
    ).then(() => {
      reset();
    });
  };

  useEffect(() => {
    getGatewayCrypto();
  }, []);

  const validateForm = useCallback(
    debounce(async () => {
      const { amount_withdrawal, bank_account } = watch();

      try {
        clearErrors();
        const resp = await axios.post(`/gateway/${currentMethod}/validate`, {
          amount_withdrawal,
          bank_account,
        });
        console.log(resp);
      } catch (e) {
        const errors = e.response.data.errors;

        if (!errors) return;

        [...Object.keys(errors)].forEach((error) => {
          if (errors?.[error]) {
            setError(error, {
              type: "custom",
              message: errors?.[error][0],
            });
          }
        });
      } finally {
        setValidating(false);
      }
    }, 500),
    [currentMethod]
  );

  const formChange = () => {
    setValidating(true);
    validateForm();
  };

  return (
    <>
      <form
        onChange={formChange}
        onSubmit={handleSubmit(withdrawal)}
        className="crypto-withdrawal"
      >
        <div className="crypto-withdrawal__currency">
          <h3 className="crypto-withdrawal__title">
            {__("wallet.select_currency")}:
          </h3>

          <ul className="crypto-withdrawal__list">
            {loading ? (
              <>
                <li className="crypto-withdrawal__item">
                  <Skeleton
                    className="crypto-withdrawal__skeleton"
                    variant="rounded"
                  />
                </li>
              </>
            ) : (
              currency &&
              currency.map((method) => {
                return (
                  <li key={method.id} className="crypto-withdrawal__item">
                    <button
                      onClick={() => changeMethod(method)}
                      type="button"
                      className={`crypto-btn ${
                        currentMethod === method.id ? "active" : ""
                      }`}
                    >
                      <img
                        className="crypto-btn__icon"
                        src={method.logo}
                        alt="#"
                      />
                      <p className="crypto-btn__text">{method.title}</p>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        <Grid container columnSpacing={"1rem"}>
          <Grid item lg={4} b680={6} xs={12}>
            <div className="bo-input fiat__inp-wrap">
              <label className="bo-input__label">
                <p className="bo-input__label-text">
                  {__("common.enter_amount")}:
                </p>
                <div className="bo-input__wrap">
                  <input
                    type="number"
                    placeholder="100$"
                    className={`${
                      errors.amount_withdrawal ? "error" : ""
                    } bo-input__input`}
                    {...register("amount_withdrawal", {
                      required: true,
                    })}
                  />
                  {errors.amount_withdrawal && (
                    <p className="bo-input__error">
                      {errors.amount_withdrawal.message}
                    </p>
                  )}
                </div>
              </label>
            </div>
          </Grid>
          <Grid item lg={4} b680={6} xs={12}>
            <div className="bo-input fiat__inp-wrap">
              <label className="bo-input__label">
                <p className="bo-input__label-text">{__("wallet.number")}:</p>
                <div className="bo-input__wrap">
                  <input
                    type="text"
                    placeholder="Enter address"
                    className={`${
                      errors.bank_account ? "error" : ""
                    } bo-input__input`}
                    {...register("bank_account", {
                      required: true,
                    })}
                  />
                </div>
                {errors.bank_account && (
                  <p className="bo-input__error">
                    {errors.bank_account.message}
                  </p>
                )}
              </label>
            </div>
          </Grid>
        </Grid>

        <Grid container columnSpacing={"1rem"}>
          <Grid item xl={4} lg={6} xs={12}>
            <div className="fiat-info">
              <ul className="fiat-info__list">
                <li className="fiat-info__item">
                  <div>
                    <p className="fiat-info__text">{__("wallet.fee")}:</p>
                  </div>
                  <div>
                    <p className="fiat-info__value fiat-info__value--bg">
                      {cryptoInfo.withdraw_fee}%
                    </p>
                  </div>
                </li>
                <li className="fiat-info__item">
                  <div>
                    <p className="fiat-info__text">{__("wallet.received")}:</p>
                  </div>
                  <div>
                    <p className="fiat-info__value">
                      ${cryptoInfo.withdraw_min}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>

        <div className="crypto-withdrawal__withdrawal">
          <div className="tooltip">
            <h3 className="crypto-withdrawal__title">
              {__("wallet.withdrawal")}:
            </h3>
            <Tooltip
              title={__("tooltip.withdraw")}
              placement="left-start"
              className="tooltip__icon"
              slotProps={{
                tooltip: {
                  className: "tooltip__popper",
                },
              }}
            >
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 11.5C8.76142 11.5 11 9.26142 11 6.5C11 3.73858 8.76142 1.5 6 1.5C3.23858 1.5 1 3.73858 1 6.5C1 9.26142 3.23858 11.5 6 11.5Z"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.54492 5.00028C4.66247 4.66612 4.8945 4.38434 5.1999 4.20485C5.5053 4.02536 5.86437 3.95975 6.21351 4.01964C6.56265 4.07953 6.87933 4.26105 7.10746 4.53205C7.33559 4.80305 7.46045 5.14605 7.45992 5.50028C7.45992 6.50028 5.95992 7.00028 5.95992 7.00028"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 9H6.00583"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Tooltip>
          </div>

          <Button
            className="crypto-withdrawal__btn"
            size="middle"
            color="orange"
            type="submit"
            disabled={!(isValid && !Object.keys(errors).length && !validating)}
          >
            {__("wallet.withdrawal_funds")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Cryptocurrencies;
