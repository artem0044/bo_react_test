import React, { useState } from "react";
import { Grid } from "@mui/material";
import { TimeIcon } from "@components/library";
import { useDispatch, useSelector } from "react-redux";
import { BIDS } from "@constants";
import { useTranslation } from "@helpers/translate";

const TimeMobile = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { time } = useSelector((state) => state.bids);
  const { __ } = useTranslation();

  const changeTime = (value) => {
    dispatch({ type: BIDS.UPDATE_FIELD, payload: { time: value } });
    setOpen(false);
  };

  const arrTime = [
    { value: "00:00:10", name: __("trading.10s"), minutes: 0.166666667 }, // added minutes field
    { value: "00:01:00", name: __("trading.1m"), minutes: 1 },
    { value: "00:03:00", name: __("trading.3m"), minutes: 3 },
    { value: "00:05:00", name: __("trading.5m"), minutes: 5 },
    { value: "00:10:00", name: __("trading.10m"), minutes: 10 },
    { value: "00:15:00", name: __("trading.15m"), minutes: 15 },
    { value: "00:30:00", name: __("trading.30m"), minutes: 30 },
    { value: "01:00:00", name: __("trading.1h"), minutes: 60 },
    { value: "04:00:00", name: __("trading.4h"), minutes: 240 },
  ];

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
              {arrTime.map(({ value, name }) => {
                return (
                  <Grid key={value} item xs={6}>
                    <button
                      type="button"
                      className={`select-trade-mobile__btn ${
                        time === value ? "active" : ""
                      }`}
                      onClick={() => changeTime(value)}
                    >
                      {name}
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
        <p className="select-trade-mobile__time">{time}</p>
        <TimeIcon className="select-trade-mobile__icon" />
      </button>
    </div>
  );
};

export default TimeMobile;
