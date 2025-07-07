import React, { useEffect, useState, useCallback } from "react";
import { debounce, Grid, Skeleton } from "@mui/material";
import { Button } from "@components/library";
import axios from "@helpers/axios/private.axios";
import { useDispatch } from "react-redux";
import { fiatWithdrawal } from "@actions";
import { useForm } from "react-hook-form";
import { useTranslation } from "@helpers/translate";

const Fiat = () => {
  const [validating, setValidating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currentMethod, setCurrentMethod] = useState(1);
  const [fiatInfo, setFiatInfo] = useState({
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
  } = useForm({ mode: "onChange" });

  const getGatewayFiat = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("/gateway/fiat");
      const data = resp.data.data;

      setPaymentMethods(data);
      setLoading(false);

      changeFiatInfo(data);
    } catch (e) {
      console.log(e);
    }
  };

  const changeFiatInfo = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === currentMethod) {
        const { withdraw_fee, withdraw_min } = data[i];
        setFiatInfo({
          withdraw_min,
          withdraw_fee,
        });
      }
    }
  };

  const changeMethod = (data) => {
    const { id, withdraw_fee, withdraw_min } = data;
    setCurrentMethod(id);

    setFiatInfo({
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
      fiatWithdrawal({
        amount: amount_withdrawal,
        bank_account,
        id: currentMethod,
      })
    ).then(() => {
      reset();
    });
  };

  useEffect(() => {
    getGatewayFiat();
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
    <form
      onChange={formChange}
      onSubmit={handleSubmit(withdrawal)}
      className="fiat"
    >
      <h2 className="fiat__title">{__("common.payment_method")}:</h2>
      <div className="payment">
        <Grid container spacing={"1rem"}>
          {loading ? (
            <>
              {[1, 2].map((item) => (
                <Grid key={item} item lg={4} b680={6} xs={12}>
                  <Skeleton
                    className="fiat__skeleton"
                    variant="rounded"
                    width="100%"
                  />
                </Grid>
              ))}
            </>
          ) : (
            <>
              {paymentMethods.map((method) => (
                <Grid key={method.id} item lg={4} b680={6} xs={12}>
                  <button
                    onClick={() => changeMethod(method)}
                    type="button"
                    className={`payment__card ${
                      currentMethod === method.id ? "active" : ""
                    }`}
                  >
                    <picture className="payment__pic">
                      <img src={method.logo} alt="" />
                    </picture>
                    <p className="payment__text">{method.title}</p>
                  </button>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </div>
      <Grid container columnSpacing={"1rem"}>
        <Grid item lg={4} b680={6} xs={12}>
          <div className="bo-input fiat__inp-wrap">
            <label className="bo-input__label">
              <p className="bo-input__label-text">
                {__("wallet.enter_amount")}:
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
              </div>
              {errors.amount_withdrawal && (
                <p className="bo-input__error">
                  {errors.amount_withdrawal.message}
                </p>
              )}
            </label>
          </div>
        </Grid>
        <Grid item lg={4} b680={6} xs={12}>
          <div className="bo-input fiat__inp-wrap">
            <label className="bo-input__label">
              <p className="bo-input__label-text">{__("wallet.number")}</p>
              <div className="bo-input__wrap">
                <input
                  type="text"
                  placeholder="U01234567"
                  className={`${
                    errors.bank_account ? "error" : ""
                  } bo-input__input`}
                  {...register("bank_account", {
                    required: true,
                  })}
                />
              </div>
              {errors.bank_account && (
                <p className="bo-input__error">{errors.bank_account.message}</p>
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
                  <p className="fiat-info__text">{__("common.commission")}:</p>
                </div>
                <div>
                  <p className="fiat-info__value fiat-info__value--bg">
                    {fiatInfo.withdraw_fee}%
                  </p>
                </div>
              </li>
              <li className="fiat-info__item">
                <div>
                  <p className="fiat-info__text">
                    {__("wallet.min_withdraw")}:
                  </p>
                </div>
                <div>
                  <p className="fiat-info__value">${fiatInfo.withdraw_min}</p>
                </div>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>

      <div className="fiat__btns">
        <Button
          type="submit"
          disabled={!(isValid && !Object.keys(errors).length && !validating)}
          className="fiat__btn"
          color="orange"
          size="middle"
        >
          {__("wallet.withdrawal_funds")}
        </Button>
      </div>
    </form>
  );
};

export default Fiat;
