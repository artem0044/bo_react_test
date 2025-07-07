import React from "react";
import { Grid, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BIDS } from "../../../constants";
import {
  ArrowDownHistory,
  ArrowUpHistory,
  TickIcon,
  ErrorIcon,
} from "@components/library";

import "./index.sass";
import { useTranslation } from "@helpers/translate";

export const BidNotification = () => {
  const { notifications } = useSelector((state) => state.bids);
  const dispatch = useDispatch();
  const { __ } = useTranslation();

  const handleClose = (event, reason, id) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: BIDS.HIDE_NOTIFICATION, payload: id });
  };

  return (
    <div className="bid-notification-wrap">
      {notifications?.map((notification) => {
        const { pair_name, type, contribution, status = 1, id } = notification;

        return (
          <Snackbar
            key={id}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={true}
            autoHideDuration={3000}
            onClose={(event, reason) => handleClose(event, reason, id)}
            className="snackbar"
            onClick={() => handleClose("", "", id)}
          >
            <div className="bid-notification">
              {notification.text ? (
                <h3 className="bid-notification__title">
                  {notification.text}
                  {status ? <TickIcon /> : <ErrorIcon />}
                </h3>
              ) : (
                <>
                  <h3 className="bid-notification__title">
                    {status ? <TickIcon /> : <ErrorIcon />}
                  </h3>
                  <p className="bid-notification__pair">
                    {pair_name}
                    {type === "up" ? <ArrowUpHistory /> : <ArrowDownHistory />}
                  </p>
                  <Grid container columnSpacing="1rem">
                    <Grid item xs={6}>
                      <h3 className="bid-notification__b-title">
                        {__("trading.bid_forecast")}
                      </h3>
                      <p className="bid-notification__b-text">
                        {type === "up" ? __("trading.up") : __("trading.down")}
                      </p>
                    </Grid>
                    <Grid item xs={6}>
                      <h3 className="bid-notification__b-title">
                        {__("trading.bid_amount")}
                      </h3>
                      <p className="bid-notification__b-text">
                        ${contribution}
                      </p>
                    </Grid>
                  </Grid>
                </>
              )}
            </div>
          </Snackbar>
        );
      })}
    </div>
  );
};
