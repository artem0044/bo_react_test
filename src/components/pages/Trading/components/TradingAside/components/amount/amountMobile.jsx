import React, { useState } from "react";
import { Grid } from "@mui/material";
import { TimeIcon } from "@components/library";
import { arrAmount } from "@components/pages/Trading/components/TradingAside/components/amount/index";
import { useDispatch, useSelector } from "react-redux";
import { BIDS } from "@constants";

const AmountMobile = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { amount } = useSelector((state) => state.bids);

  const changeAmount = (value) => {
    dispatch({ type: BIDS.UPDATE_FIELD, payload: { amount: value } });
    setOpen(false);
  };

  const changeValue = (e) => {
    dispatch({ type: BIDS.UPDATE_FIELD, payload: { amount: e.target.value } });
  };

  return (
    <div
      className={`select-trade-mobile ${
        open ? "select-trade-mobile--focused" : ""
      }`}
    >
      <div className={`select-trade-mobile__content ${open ? "active" : ""}`}>
        <div className="select-trade-mobile__bg"></div>
        <div
          onClick={() => setOpen(false)}
          className="select-trade-mobile__close"
        ></div>
        <div className="select-trade-mobile__content-wrap">
          <div className="select-trade-mobile__btns">
            <Grid container spacing="10px">
              {arrAmount.map((value) => {
                return (
                  <Grid key={value} item xs={6}>
                    <button
                      onClick={() => changeAmount(value)}
                      type="button"
                      className={`select-trade-mobile__btn ${
                        amount == value ? "active" : ""
                      }`}
                    >
                      ${value}
                    </button>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="select-trade-mobile__open-btn"
      >
        $
        <input
          type="number"
          onInput={changeValue}
          className="select-trade-mobile__time"
          value={amount}
          min="1"
        ></input>
        <TimeIcon className="select-trade-mobile__icon" />
      </button>
    </div>
  );
};

export default AmountMobile;
