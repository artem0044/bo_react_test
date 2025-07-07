import React, { useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import { BIDS } from "@constants";
import TimeIcon from "@assets/images/icons/time.svg";
import Help from "@assets/images/icons/help-circle.svg";
import Collapse from "@mui/material/Collapse";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@helpers/translate";
import moment from "moment";

const Time = () => {
  const [open, setOpen] = useState(false);
  const [tooltipIntervalId, setTooltipIntervalId] = useState(null);
  const dispatch = useDispatch();
  const { time } = useSelector((state) => state.bids);
  const { __ } = useTranslation();

  const [currentTime, setCurrentTime] = useState("");
  const changeTime = (value) => {
    dispatch({ type: BIDS.UPDATE_FIELD, payload: { time: value } });
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

  const handleTooltipOpen = () => {
    const intervalId = setInterval(() => {
      const selectedTime = moment(time, "HH:mm:ss");
      setCurrentTime(
        moment()
          .add(selectedTime.hours(), "hours")
          .add(selectedTime.minutes(), "minutes")
          .add(selectedTime.seconds(), "seconds")
          .format("DD.MM.YYYY HH:mm:ss")
      );
    }, 1000);
    setTooltipIntervalId(intervalId);
  };

  const handleTooltipClose = () => {
    if (tooltipIntervalId) {
      clearInterval(tooltipIntervalId);
      setTooltipIntervalId(null);
    }
  };

  return (
    <section className="trading-aside__section">
      <div className="trading-aside-time">
        <div
          onClick={() => setOpen(!open)}
          className={`trading-aside-sec ${open ? "active" : ""}`}
        >
          <div className="trading-aside-sec__header">
            <h5 className="trading-aside-sec__title">{__("trading.time")}</h5>
            <Tooltip
              title={__("tooltip.time") + " " + currentTime}
              placement="right-start"
              className="tooltip__icon"
              slotProps={{
                tooltip: {
                  className: "tooltip__popper",
                },
              }}
              onOpen={handleTooltipOpen}
              onClose={handleTooltipClose}
            >
              <img className="trading-aside-sec__help" src={Help} />
            </Tooltip>
          </div>
          <div className="trading-aside-sec__wrap">
            <time className="trading-aside-sec__val">{time}</time>
            <img className="trading-aside-sec__icon" src={TimeIcon} />
          </div>
        </div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="trading-aside-time__btns">
            <Grid container spacing="7px">
              {arrTime.map(({ value, name }) => {
                return (
                  <Grid key={value} item xs={4}>
                    <button
                      onClick={() => changeTime(value)}
                      type="button"
                      className={`trading-aside-time__btn ${
                        time === value ? "active" : ""
                      }`}
                    >
                      {name}
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
export default Time;
