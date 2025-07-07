import HistoryOfDay from "./historyOfDay";
import React, { useEffect, useState } from "react";
import { Transition, CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";

import HistoryDayItem from "@components/pages/Trading/components/TradingHistory/historyDayItem";
import { Skeleton, Stack } from "@mui/material";

import "./index.sass";
import { getOpenedHistory, getClosedHistory, bidEvent } from "@actions";
import { BIDS } from "@constants";
import { useTranslation } from "@helpers/translate";
import { Button } from "@components/library";

const TradingHistory = () => {
  const [count, setCount] = useState(1);
  const {
    bids: {
      loadingHistory,
      closedHistory,
      openedHistory,
      historyType,
      isOpenHistory,
      loadingMore,
    },
    wallet: { active_wallet, loading },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { __ } = useTranslation();

  const changeHistoryType = (type) => {
    dispatch({ type: BIDS.CHANGE_HISTORY_TYPE, payload: type });
  };

  useEffect(() => {
    const unsubscribe = dispatch(bidEvent());

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      dispatch(getOpenedHistory());
      dispatch({ type: BIDS.REMOVE_CLOSED_HISTORY });
      dispatch(getClosedHistory({ count: 1 }));
      setCount(1);
    }
  }, [active_wallet]);

  const loadMore = () => {
    setCount(count + 1);
    dispatch(getClosedHistory({ count: count + 1 }));
  };

  return (
    <Transition in={isOpenHistory} timeout={500} mountOnEnter unmountOnExit>
      {(state) => (
        <div className={`tradingHistory ${state}`}>
          <div className="tradingHistory__scroll">
            <div className="tradingHistory__wrapper">
              <header className="tradingHistory__header">
                <button
                  type="button"
                  onClick={() => changeHistoryType("active")}
                  className={`tradingHistory__sort-btn ${
                    historyType === "active" ? "active" : ""
                  }`}
                >
                  {__("trading.opened")}
                </button>
                <button
                  type="button"
                  onClick={() => changeHistoryType("closed")}
                  className={`tradingHistory__sort-btn ${
                    historyType === "closed" ? "active" : ""
                  }`}
                >
                  {__("trading.closed")}
                </button>
              </header>

              <ul className={`tradingHistory__list`}>
                {loadingHistory ? (
                  <CSSTransition>
                    <Stack spacing="14px">
                      <Skeleton
                        sx={{ bgcolor: "#292929" }}
                        variant="rounded"
                        width="100%"
                        height={80}
                      />
                      <Skeleton
                        sx={{ bgcolor: "#292929" }}
                        variant="rounded"
                        width="100%"
                        height={80}
                      />
                      <Skeleton
                        sx={{ bgcolor: "#292929" }}
                        variant="rounded"
                        width="100%"
                        height={80}
                      />
                    </Stack>
                  </CSSTransition>
                ) : historyType === "active" ? (
                  openedHistory.length ? (
                    openedHistory.map((el, index) => {
                      return (
                        <HistoryDayItem
                          key={el.id}
                          data={el}
                          direction="up"
                          isOpened={index === 0}
                          showCountdown={true}
                        />
                      );
                    })
                  ) : (
                    <p className="tradingHistory__empty">
                      {__("trading.open_bids")}
                    </p>
                  )
                ) : Object.keys(closedHistory).length ? (
                  <>
                    {[...Object.keys(closedHistory)]?.map((el, index) => {
                      return (
                        <li key={el} className="tradingHistory__item">
                          <HistoryOfDay
                            time={el}
                            data={closedHistory[el]}
                            isOpened={index === 0}
                          />
                        </li>
                      );
                    })}
                    {(loadingMore.total > count ||
                      (loadingMore.total >= count &&
                        loadingMore.isLoading)) && (
                      <li className="tradingHistory__item">
                        <Button
                          className="tradingHistory__more"
                          color="orange"
                          size="mini"
                          type="button"
                          onClick={loadMore}
                          isLoading={loadingMore.isLoading}
                        >
                          More
                        </Button>
                      </li>
                    )}
                  </>
                ) : (
                  <p className="tradingHistory__empty">
                    {__("trading.close_bids")}
                  </p>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default TradingHistory;
