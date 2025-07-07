import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, ArrowLeft } from "@components/library";

import "./index.sass";
import { useSelector } from "react-redux";
import { useTranslation } from "@helpers/translate";

const TopBalance = () => {
  const location = useLocation();
  const { realWallet } = useSelector((state) => state.wallet);
  const { __ } = useTranslation();

  return (
    <div className="top-balance">
      <div className="top-balance__wrapper">
        <div className="top-balance__left">
          {location.pathname !== "/wallet" && (
            <Link to={"/wallet"} className="top-balance__link">
              <ArrowLeft className="top-balance__link-icon" />
              {__("wallet.back")}
            </Link>
          )}
          <h1 className="top-balance__title">
            {__("wallet.available_balance")}
          </h1>
        </div>
        <div className="top-balance__right">
          <p className="top-balance__balance">{realWallet.balance}$</p>
          <Button
            className="top-balance__trade-btn"
            color="orange"
            size="mini-w"
            to="/"
            type="link"
          >
            {__("wallet.trade")}
          </Button>
        </div>
      </div>
      <div className="top-balance__list-btn">
        <Button
          to="/wallet/deposit"
          className="top-balance__btn"
          color="border"
          size="mini-w"
          type="link"
        >
          {__("wallet.deposit")}
        </Button>
        <Button
          to="/wallet/withdrawal"
          className={`top-balance__btn`}
          color="border"
          size="mini-w"
          type="link"
        >
          {__("wallet.withdrawal")}
        </Button>
        <Button
          to="/wallet"
          className={`top-balance__btn ${
            location.pathname === "/wallet" ? "" : "disabled"
          }`}
          color="border"
          size="mini-w"
          type="link"
        >
          {__("wallet.transaction_history")}
        </Button>
      </div>
    </div>
  );
};

export default TopBalance;
