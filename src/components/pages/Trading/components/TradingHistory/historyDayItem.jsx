import React, {useEffect, useMemo, useState} from "react";
import Collapse from "@mui/material/Collapse";
import {Grid} from "@mui/material";
import Down from "@assets/images/icons/arrow-down.svg";
import {ArrowDownHistory, ArrowUpHistory} from "@components/library";
import moment from "moment-timezone";
import {useTranslation} from "@helpers/translate";
import {convertToUserTimezone} from "@helpers/timezone";

const HistoryDayItem = ({data, isOpened, showCountdown = false}) => {
  const [open2, setOpen2] = useState(isOpened);
  const {__} = useTranslation();
  const {
    type,
    pair_name,
    closing_at,
    contribution,
    payout,
    created_at,
    opening_price,
    status,
    total_amount,
    closing_price
  } = data;
  console.log(data, "data");

  const getDiffTime = () => {
    const currentTime = moment.utc();
    const closingTime = moment.utc(closing_at);
    const diffInMilliseconds = closingTime.diff(currentTime);

    if (diffInMilliseconds <= 0) {
      return "00:00";
    }

    const duration = moment.duration(diffInMilliseconds);
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const formattedHours = hours > 0 ? hours + ":" : "";
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };

  const [countdown, setCountdown] = useState(getDiffTime());

  const openTime = useMemo(() => {
    console.log(created_at);
    return convertToUserTimezone(created_at, "HH:mm:ss");
  }, [created_at]);

  const closeTime = useMemo(() => {
    return convertToUserTimezone(closing_at, "HH:mm:ss");
  }, [closing_at]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getDiffTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [closing_at]);

  return (
    <div className="historyDayItem">
      <button
        onClick={() => setOpen2(!open2)}
        type="button"
        className="historyDayItem__btn"
      >
        <div className="historyDayItem__icon">
          {type === "up" ? <ArrowUpHistory/> : <ArrowDownHistory/>}
        </div>
        <div className="historyDayItem__info historyDayItem__info--1">
          <p className="historyDayItem__text">{pair_name}</p>
          <p className="historyDayItem__text historyDayItem__text--nowrap">
            ${contribution} ({payout}%)
          </p>
        </div>
        <div className="historyDayItem__info historyDayItem__info--3">
          {showCountdown && !!countdown && <p className="historyDayItem__text">{countdown}</p>}
          {!showCountdown && <h5 className="historyDayItem__title historyDayItem__title--left">
            {__("trading.result")}
          </h5>}
          <p
            className={`historyDayItem__text ${
              status === 2
                ? "historyDayItem__text--green"
                : status === 0
                  ? "historyDayItem__text--red"
                  : ""
            }`}
          >
            ${status === 2 ? total_amount : '0'}
          </p>
        </div>
        <div className="historyDayItem__arrow">
          <img
            className={`${open2 ? "historyDayItem__arrow-active" : ""}`}
            src={Down}
            alt="#"
          />
        </div>
      </button>
      <Collapse
        className="historyDayItem__content"
        in={open2}
        timeout="auto"
        unmountOnExit
      >
        <Grid container columnSpacing="1rem" rowSpacing="20px">
          <Grid item xs={6}>
            <h5 className="historyDayItem__title">
              {__("trading.open_time")}:
            </h5>
            <time className="historyDayItem__text">{openTime}</time>
          </Grid>
          <Grid item xs={6}>
            <h5 className="historyDayItem__title">
              {__("trading.closing_at")}:
            </h5>
            <time className="historyDayItem__text">{closeTime}</time>
          </Grid>
          <Grid item xs={6}>
            <ul className="historyDayItem__list">
              <li className="historyDayItem__item">
                <h5 className="historyDayItem__title">
                  {__("trading.forecast")}
                </h5>
                <time className="historyDayItem__text">
                  {type === "up" ? __("trading.up") : __("trading.down")}
                </time>
              </li>
              <li className="historyDayItem__item">
                <h5 className="historyDayItem__title">
                  {__("trading.payout")}:
                </h5>
                <time className="historyDayItem__text">{payout}%</time>
              </li>
              <li className="historyDayItem__item">
                <h5 className="historyDayItem__title">
                  {__("trading.result")}:
                </h5>
                <time
                  className={`historyDayItem__text ${
                    status === 2
                      ? "historyDayItem__text--green"
                      : status === 0
                        ? "historyDayItem__text--red"
                        : ""
                  }`}
                >
                  ${status === 2 ? total_amount : '0'}
                </time>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6}>
            <ul className="historyDayItem__list">
              <li className="historyDayItem__item">
                <h5 className="historyDayItem__title">
                  {__("trading.open_price")}:
                </h5>
                <time className="historyDayItem__text">{opening_price}</time>
              </li>
              {closing_price !== "0.00000" &&
                <li className="historyDayItem__item">
                  <h5 className="historyDayItem__title">{__("trading.current_price")}:</h5>
                  <time className="historyDayItem__text">{closing_price}</time>
                </li>
              }
              {/*<li className="historyDayItem__item">*/}
              {/*  <h5 className="historyDayItem__title">{__("trading.difference")}:</h5>*/}
              {/*  <time className="historyDayItem__text">-1 Point</time>*/}
              {/*</li>*/}
            </ul>
          </Grid>
        </Grid>
      </Collapse>
    </div>
  );
};

export default React.memo(HistoryDayItem);
