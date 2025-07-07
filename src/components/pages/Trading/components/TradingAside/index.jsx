import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Time from "@components/pages/Trading/components/TradingAside/components/time";
import TimeMobile from "@components/pages/Trading/components/TradingAside/components/time/timeMobile";
import Amount from "@components/pages/Trading/components/TradingAside/components/amount";
import AmountMobile from "@components/pages/Trading/components/TradingAside/components/amount/amountMobile";
import { LineArrowDown, LineArrowUp } from "@components/library";
import { Grid } from "@mui/material";
import { useTranslation } from "@helpers/translate";

import Arrows from "@assets/images/icons/ic_maximize.svg";

import "./index.sass";
import Payout from "@components/pages/Trading/components/TradingAside/components/payout";
import { useDispatch, useSelector } from "react-redux";
import { PostBid } from "@actions/bids";
import { BIDS } from "../../../../../constants";

const tradingAside = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [locked, setLocked] = useState(false);
  const { __ } = useTranslation();

  const {
    trading: { pair },
    bids: { time, amount },
  } = useSelector((state) => state);

  const clickDirection = (type) => {
    const data = {
      type,
      pair_name: pair.name,
      expatriation: time,
      contribution: amount,
    };

    dispatch(PostBid(data));
  };

  return (
    <aside id="tradingSidebar" className="trading-aside">
      <div className="trading-aside__wrap">
        <div className="trading-aside__scroll">
          {isDesktop && (
            <button
              onClick={() => dispatch({ type: BIDS.TOGGLE_HISTORY })}
              type="button"
              className="trading-aside__open-history"
            >
              <img className="trading-aside__open-arrows" src={Arrows} />
              {__("trading.trading_history")}
            </button>
          )}

          {isDesktop ? (
            <>
              <Amount />
              <Time />
            </>
          ) : (
            <section className="trading-aside__section">
              <Grid container spacing="10px">
                <Grid item xs={6}>
                  <TimeMobile />
                </Grid>
                <Grid item xs={6}>
                  <AmountMobile />
                </Grid>
              </Grid>
            </section>
          )}

          <Payout setLocked={setLocked} />

          <section className="trading-aside__section trading-aside__section--sticky">
            <div className="control">
              <Grid container spacing="10px">
                <Grid item md={12} xs={6}>
                  <button
                    onClick={() => clickDirection("up")}
                    type="button"
                    className="control__up control__btn"
                    disabled={locked}
                  >
                    {__("trading.up")}
                    <div className="control__btn-icon">
                      <LineArrowUp />
                    </div>
                  </button>
                </Grid>
                <Grid item md={12} xs={6}>
                  <button
                    onClick={() => clickDirection("down")}
                    type="button"
                    className="control__down control__btn"
                    disabled={locked}
                  >
                    {__("trading.down")}
                    <div className="control__btn-icon">
                      <LineArrowDown />
                    </div>
                  </button>
                </Grid>
              </Grid>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
};

export default tradingAside;
