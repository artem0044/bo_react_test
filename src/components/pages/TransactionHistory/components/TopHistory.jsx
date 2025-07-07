import React from "react";
import { Button } from "@components/library";
import { useTranslation } from "@helpers/translate";

const TopHistory = () => {
  const { __ } = useTranslation();

  return (
    <div className="top-history">
      <div className="top-history__wrapper">
        <div className="top-history__left">
          <h1 className="top-history__title">
            {__("trading.trading_history")}
          </h1>
        </div>
        <div className="top-history__right">
          <Button
            className="top-history__trade-btn"
            color="orange"
            size="mini-w"
            to="/"
            type="link"
          >
            {__("common.trade")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopHistory;
