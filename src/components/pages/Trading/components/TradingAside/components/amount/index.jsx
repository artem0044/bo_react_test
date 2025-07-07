import React, { useState } from "react";
import { Collapse, Grid, Tooltip } from "@mui/material";
import Help from "@assets/images/icons/help-circle.svg";
import { useDispatch, useSelector } from "react-redux";
import { BIDS } from "@constants";
import { useTranslation } from "@helpers/translate";

export const arrAmount = [100, 150, 200, 300, 400, 500];

const Amount = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { amount } = useSelector((state) => state.bids);
  const { __ } = useTranslation();

  const decrement = () => {
    if (amount > 100)
      dispatch({
        type: BIDS.UPDATE_FIELD,
        payload: { amount: Number(amount) - 1 },
      });
  };

  const increment = () => {
    dispatch({
      type: BIDS.UPDATE_FIELD,
      payload: { amount: Number(amount) + 1 },
    });
  };

  const changeAmount = (value) => {
    dispatch({ type: BIDS.UPDATE_FIELD, payload: { amount: value } });
  };

  const changeValue = (e) => {
    dispatch({ type: BIDS.UPDATE_FIELD, payload: { amount: e.target.value } });
  };

  return (
    <section className="trading-aside__section">
      <div className="trading-aside-amount">
        <div
          onClick={() => setOpen(!open)}
          className={`trading-aside-sec ${open ? "active" : ""}`}
        >
          <div className="trading-aside-sec__header">
            <h5 className="trading-aside-sec__title">{__("trading.amount")}</h5>
            <Tooltip
              title={__("tooltip.amount")}
              placement="right-start"
              className="tooltip__icon"
              slotProps={{
                tooltip: {
                  className: "tooltip__popper",
                },
              }}
            >
              <img className="trading-aside-sec__help" src={Help} />
            </Tooltip>
          </div>
          <div className="trading-aside-sec__wrap">
            $
            <input
              type="number"
              onChange={changeValue}
              className="trading-aside-sec__val"
              value={amount}
            ></input>
          </div>
        </div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="trading-aside-amount__content">
            <Grid container spacing="7px">
              <Grid item xs={6}>
                <button
                  onClick={decrement}
                  type="button"
                  className="trading-aside-amount__btn"
                >
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0467 11.9466V7.79329V4.05329C11.0467 3.41329 10.2734 3.09329 9.82003 3.54662L6.36669 6.99995C5.81336 7.55329 5.81336 8.45329 6.36669 9.00662L7.68003 10.32L9.82003 12.46C10.2734 12.9066 11.0467 12.5866 11.0467 11.9466Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </Grid>
              <Grid item xs={6}>
                <button
                  onClick={increment}
                  type="button"
                  className="trading-aside-amount__btn"
                >
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.95331 4.05338L5.95331 8.20671V11.9467C5.95331 12.5867 6.72664 12.9067 7.17997 12.4534L10.6333 9.00005C11.1866 8.44671 11.1866 7.54671 10.6333 6.99338L9.31997 5.68005L7.17997 3.54005C6.72664 3.09338 5.95331 3.41338 5.95331 4.05338Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </Grid>
              {arrAmount.map((value) => {
                return (
                  <Grid key={value} item xs={6}>
                    <button
                      onClick={() => changeAmount(value)}
                      type="button"
                      className={`trading-aside-amount__btn ${
                        amount === value ? "active" : ""
                      }`}
                    >
                      ${value}
                    </button>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Collapse>
      </div>
    </section>
  );
};

export default Amount;
