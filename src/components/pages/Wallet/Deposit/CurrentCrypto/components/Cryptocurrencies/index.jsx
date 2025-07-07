import React, { useCallback, useEffect, useState } from "react";
import { debounce, Grid } from "@mui/material";

// import CryptoIcon from "@assets/images/icons/Ethereum (ETH).svg";

import "./index.sass";
import { Button } from "@components/library";
import axios from "@helpers/axios/private.axios";
import { useTranslation } from "@helpers/translate";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { gatewayDeposit } from "@actions";

const arrValues = [100, 150, 200, 300, 500];

const Cryptocurrencies = () => {
  const { __ } = useTranslation();
  const [validating, setValidating] = useState(false);
  const currentMethod = 3;
  const dispatch = useDispatch();

  const [cryptoInfo, setCryptoInfo] = useState({
    withdraw_fee: "",
    deposit_min: "",
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    clearErrors,
    watch,
    setError,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    getGatewayCrypto();
  }, []);

  const deposit = () => {
    const { amount_deposit } = watch();
    dispatch(
      gatewayDeposit({ amount: amount_deposit, id: currentMethod })
    ).then(() => {
      reset();
    });
  };

  const getGatewayCrypto = async () => {
    try {
      const resp = await axios.get("/gateway/crypto");
      const data = resp.data.data;

      const { withdraw_fee, deposit_min } = data[0];
      setCryptoInfo({
        deposit_min,
        withdraw_fee,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const validateForm = useCallback(
    debounce(async () => {
      const { amount_deposit, bank_account } = watch();

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

  const updateAmount = (value) => {
    setValue("amount_deposit", `${value}`, {
      shouldValidate: true,
      shouldDirty: true,
    });
    formChange();
  };

  return (
    <form
      onChange={formChange}
      onSubmit={handleSubmit(deposit)}
      className="crypto-current"
    >
      {/*<h3 className="crypto-current__title">{__("common.cryptocurrency")}:</h3>*/}

      <Grid container spacing="1rem">
        {/*<Grid item xl={4} b680={6} xs={12}>*/}
        <Grid item xl={4} lg={6} xs={12}>
          {/*<div className="crypto-current__section crypto-deposit-btn">*/}
          {/*  <div className="crypto-deposit-btn__l-wrap">*/}
          {/*    <img*/}
          {/*      className="crypto-deposit-btn__icon"*/}
          {/*      src={CryptoIcon}*/}
          {/*      alt="#"*/}
          {/*    />*/}
          {/*    <p className="crypto-deposit-btn__text">ETH</p>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <p className="crypto-deposit-btn__full-name">Ethereum</p>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="crypto-current__section crypto-inp-counter">
            <h4 className="crypto-current__title">
              {__("wallet.enter_amount")}:
            </h4>
            <div className="bo-input crypto-inp-counter__inp-wrap">
              <label className="bo-input__label">
                <div className="bo-input__wrap">
                  <input
                    type="number"
                    placeholder="$100"
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
            <ul className="crypto-inp-counter__list">
              {arrValues.map((value) => (
                <li key={value} className="crypto-inp-counter__item">
                  <button
                    onClick={() => updateAmount(value)}
                    className="crypto-inp-counter__btn"
                    type="button"
                  >
                    ${value}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/*<div className="crypto-current__section fiat-info fiat-info--border">*/}
          {/*  <ul className="fiat-info__list">*/}
          {/*    <li className="fiat-info__item">*/}
          {/*      <div>*/}
          {/*        <p className="fiat-info__text">Deposit:</p>*/}
          {/*      </div>*/}
          {/*      <div>*/}
          {/*        <p className="fiat-info__value">0%</p>*/}
          {/*        <p className="fiat-info__rate">0,00054 ETH</p>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*    <li className="fiat-info__item">*/}
          {/*      <div>*/}
          {/*        <p className="fiat-info__text">Bonus :</p>*/}
          {/*      </div>*/}
          {/*      <div>*/}
          {/*        <p className="fiat-info__value">50%</p>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*    <li className="fiat-info__item">*/}
          {/*      <div>*/}
          {/*        <p className="fiat-info__text">You will recive:</p>*/}
          {/*      </div>*/}
          {/*      <div>*/}
          {/*        <p className="fiat-info__value">$150</p>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*    <li className="fiat-info__item">*/}
          {/*      <div>*/}
          {/*        <p className="fiat-info__text">*/}
          {/*          You can take profit and invested funds at any time.*/}
          {/*        </p>*/}
          {/*      </div>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}

          <div className="crypto-current__section fiat-info">
            <ul className="fiat-info__list">
              <li className="fiat-info__item">
                <div>
                  <p className="fiat-info__text">{__("wallet.min_deposit")}:</p>
                </div>
                <div>
                  <p className="fiat-info__value">${cryptoInfo.deposit_min}</p>
                </div>
              </li>
              <li className="fiat-info__item">
                <div>
                  <p className="fiat-info__text">
                    {__("wallet.min_withdraw")}:
                  </p>
                </div>
                <div>
                  <p className="fiat-info__value fiat-info__value--bg">
                    {__("wallet.no_limits")}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xl={4} b680={6} xs={12}></Grid>
      </Grid>

      <div className="crypto-current__btns">
        <Button
          type="submit"
          disabled={!(isValid && !Object.keys(errors).length && !validating)}
          className="crypto-current__btn"
          color="orange"
          size="middle"
        >
          {__("wallet.deposit")}
        </Button>
      </div>
    </form>
  );
};

export default Cryptocurrencies;
