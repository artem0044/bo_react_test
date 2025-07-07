import React from "react";
// import HistoryIcon from "@assets/images/icons/hisoty-ico.svg";

import { TradingHistoryIcon } from "@components/library";
import TradingPairs from "@components/layout/Header/components/TradingPairs";
import { BurgerIcon, Button } from "@components/library";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@helpers/translate";
import { Link } from "react-router-dom";
import {
  AUTH,
  TRADING_HISTORY,
  BIDS,
  TRADING_PAGES,
  AUTH_PAGE,
  MAIN_PAGE,
} from "@constants";

const MobileAuthHeader = ({ setSidebar, setShowPairs, showPair }) => {
  const dispatch = useDispatch();
  const { __ } = useTranslation();
  const {
    auth: { isDemoUser },
    bids: { isOpenHistory },
  } = useSelector((state) => state);
  const openSidebar = () => {
    setSidebar(true);
  };

  const openAuthPopup = () => {
    dispatch({ type: AUTH.AUTH_CHANGE_POPUP, payload: true });
  };

  return (
    <div className="mobile-header">
      <button
        onClick={openSidebar}
        className="mobile-header__burger"
        type="button"
      >
        <BurgerIcon />
      </button>
      {TRADING_PAGES.includes(location.pathname) ? (
        <TradingPairs showPairs={showPair} setShowPairs={setShowPairs} />
      ) : (
        <>
          <Button
            className="mobile-header__btn"
            type="link"
            to={isDemoUser ? AUTH_PAGE : MAIN_PAGE}
            size="mini"
            color="border"
          >
            {__("common.trading")}
          </Button>
        </>
      )}
      {isDemoUser ? (
        <Button
          className="mobile-header__btn"
          type="button"
          size="mini"
          color="orange"
          onClick={openAuthPopup}
        >
          {__("common.deposit2")}
        </Button>
      ) : (
        <Button
          className="mobile-header__btn"
          type="link"
          to="/wallet/deposit"
          size="mini"
          color="orange"
        >
          {__("common.deposit2")}
        </Button>
      )}

      {TRADING_PAGES.includes(location.pathname) ? (
        <button
          onClick={() => dispatch({ type: BIDS.TOGGLE_HISTORY })}
          type="button"
          className={`mobile-header__btn-history${
            isOpenHistory ? " active" : ""
          }`}
        >
          <TradingHistoryIcon />
        </button>
      ) : (
        <Link to={TRADING_HISTORY} className="mobile-header__btn-history">
          <TradingHistoryIcon />
        </Link>
      )}
    </div>
  );
};

export default MobileAuthHeader;
