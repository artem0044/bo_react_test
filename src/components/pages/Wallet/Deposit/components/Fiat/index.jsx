import React, { useEffect, useState, useCallback } from "react";
import { debounce, Grid, Skeleton } from "@mui/material";
import { Button } from "@components/library";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "@helpers/axios/private.axios";
import { gatewayDeposit, getTransaction } from "@actions";
import { useTranslation } from "@helpers/translate";
import { useSearchParams } from "react-router-dom";

const Fiat = () => {
  const [validating, setValidating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currentMethod, setCurrentMethod] = useState(1);
  const [fiatInfo, setFiatInfo] = useState({
    withdraw_fee: "",
    deposit_min: "",
  });
  const dispatch = useDispatch();
  const { __ } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const transaction_id = searchParams.get("transaction_id");
    if (transaction_id) {
      dispatch(getTransaction(transaction_id));
      searchParams.delete("transaction_id");
      setSearchParams(searchParams);
    }
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    clearErrors,
    watch,
    setError,
    reset,
  } = useForm();

  const changeFiatInfo = (data) => {
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i].id === currentMethod) {
        const { withdraw_fee, deposit_min } = data[i];
        setFiatInfo({
          deposit_min,
          withdraw_fee,
        });
      }
    }
  };

  const changeMethod = (data) => {
    const { id, withdraw_fee, deposit_min } = data;
    setCurrentMethod(id);

    setFiatInfo({
      deposit_min,
      withdraw_fee,
    });

    if (isValid || Object.keys(errors).length) {
      formChange();
    }
  };

  const validateForm = useCallback(
    debounce(async () => {
      const { amount_deposit, bank_account } = watch();

      console.log(currentMethod);

      try {
        clearErrors();
        const resp = await axios.post(`/gateway/${currentMethod}/validate`, {
          amount_deposit,
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

  const deposit = () => {
    const { amount_deposit } = watch();
    dispatch(
      gatewayDeposit({ amount: amount_deposit, id: currentMethod })
    ).then(() => {
      reset();
    });
  };

  const getGatewayFiat = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("/gateway/fiat");
      const data = resp.data.data;

      setPaymentMethods(data);
      setLoading(false);
      changeMethod(data[0]);

      changeFiatInfo(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGatewayFiat();
  }, []);

  return (
    <form
      onChange={formChange}
      onSubmit={handleSubmit(deposit)}
      className="fiat"
    >
      <h2 className="fiat__title">{__("common.payment_method")}:</h2>
      <div className="payment">
        <Grid container spacing={"1rem"}>
          {loading ? (
            <>
              <Grid item lg={4} b680={6} xs={12}>
                <Skeleton
                  className="fiat__skeleton"
                  variant="rounded"
                  width="100%"
                />
              </Grid>
              <Grid item lg={4} b680={6} xs={12}>
                <Skeleton
                  className="fiat__skeleton"
                  variant="rounded"
                  width="100%"
                />
              </Grid>
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
                    errors.amount_deposit ? "error" : ""
                  } bo-input__input`}
                  {...register("amount_deposit", {
                    required: true,
                  })}
                />
              </div>
              {errors.amount_deposit && (
                <p className="bo-input__error">
                  {errors.amount_deposit.message}
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
                  <p className="fiat-info__text">{__("wallet.min_deposit")}:</p>
                </div>
                <div>
                  <p className="fiat-info__value">${fiatInfo.deposit_min}</p>
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
          {__("wallet.deposit")}
        </Button>
      </div>
    </form>
  );
};

export default Fiat;
