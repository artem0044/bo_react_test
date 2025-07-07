import React, {useEffect, memo} from "react";
import {Grid, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {FUTURES} from "@constants";
import {TickIcon,} from "@components/library";
import "./index.sass";
import {notificationEvent} from "@actions/futures";
import {useTranslation} from "@helpers/translate";

export const FuturesNotification =  memo(() => {
  const {notifications} = useSelector((state) => state.futures);
  const dispatch = useDispatch();
  const {__} = useTranslation();
  
  const handleClose = (event, reason, id) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({type: FUTURES.HIDE_NOTIFICATION, payload: id});
  };

  useEffect(() => {
    const unsubscribe = dispatch(notificationEvent());

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="future-notification-wrap">
        {notifications?.map((notification) => {
          const {id, type, symbol, quantity, entry_price, price, notificationType, text} = notification;
          return (
            <Snackbar
              key={id}
              anchorOrigin={{vertical: "top", horizontal: "right"}}
              open={true}
              autoHideDuration={3000}
              onClose={(event, reason) => handleClose(event, reason, id)}
              className="snackbar"
              onClick={() => handleClose("", "", id)}
            >
              <div className="future-notification">
                {notificationType === 'orderOpened' ?
                  <>
                    <div className="future-notification__head">
                      <div className="future-notification__icon">
                        <TickIcon/>
                      </div>

                      <h3 className="future-notification__title">
                        {__("futures.order_opened")}
                      </h3>
                      <p className="future-notification__text">{__("futures.order_success")}</p>
                    </div>
                    <Grid container spacing="10px">
                      <Grid item xs={6}>
                        <h3 className="future-notification__b-title">
                          {__("futures.type")}:
                        </h3>
                        <p className="future-notification__b-text">
                          {type === "limit" ? "Limit" : "Market"}
                        </p>
                      </Grid>
                      <Grid item xs={6}>
                        <h3 className="future-notification__b-title">
                          {__("futures.pair")}:
                        </h3>
                        <p className="future-notification__b-text">
                          {symbol}
                        </p>
                      </Grid>
                      <Grid item xs={6}>
                        <h3 className="future-notification__b-title">
                          {__("futures.size")}:
                        </h3>
                        <p className="future-notification__b-text">
                          {quantity.toFixed(2)} BTC
                        </p>
                      </Grid>
                      <Grid item xs={6}>
                        <h3 className="future-notification__b-title">
                          {__("futures.price")}:
                        </h3>
                        <p className="future-notification__b-text">
                          {type === "limit" ? price : entry_price} USD
                        </p>
                      </Grid>
                    </Grid>
                  </>
                  : <>
                    <div className="future-notification__icon">
                      <TickIcon/>
                    </div>
                    <h3 className="future-notification__title">
                      {text}
                    </h3>
                  </>
                }
              </div>
            </Snackbar>
          );
        })}
      </div>
    </>
  );
});
