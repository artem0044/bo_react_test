import React, { useState, useEffect } from "react";
import TradingAside from "@components/pages/Trading/components/TradingAside";
import TradingHistory from "@components/pages/Trading/components/TradingHistory";
import MyTradingViewWidget from "@components/pages/Trading/components/TradingViewWidget/TradingViewWidget";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import { useTranslation } from "@helpers/translate";
import {changeWallet} from "@actions";
import Popup from "@components/library/UI/Popup";
import Gift from "@components/pages/Trading/components/Gift";

import "./Trading.sass";
import { Helmet } from "react-helmet";
import {WALLET_TYPE} from "../../../constants";

export const Trading = () => {
  const [giftActive, setGiftActive] = useState(false);
  const { id } = useSelector((state) => state.user.user);
  const { __ } = useTranslation();
  const dispatch = useDispatch();
  const {
    wallet: {active_wallet, wallets},
  } = useSelector((state) => state);
  
  useEffect(() => {
    const isRegistered = Cookies.get("registered");

    if (isRegistered && isRegistered === id) {
      setGiftActive(true);
      Cookies.remove("registered");
    }
  }, []);

  const changeOnTradingWallet = async () => {
    if (active_wallet.type === WALLET_TYPE.REAL_FUTURES) {
      const wallet = wallets.find((item) => item.type === WALLET_TYPE.REAL);
      await dispatch(changeWallet(wallet));
    }

    if (active_wallet.type === WALLET_TYPE.DEMO_FUTURES) {
      const wallet = wallets.find((item) => item.type === WALLET_TYPE.DEMO);
      await dispatch(changeWallet(wallet));
    }
  }

  useEffect(() => {
    changeOnTradingWallet();
  }, [active_wallet.type]);
  
  return (
    <div className="trading">
      <Helmet>
        <title>
          {__("seo.main_title")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>

      <MyTradingViewWidget />
      <TradingHistory />
      <TradingAside />

      <Popup active={giftActive} setActive={setGiftActive}>
        <Gift setPopup={setGiftActive} />
      </Popup>
    </div>
  );
};

export default Trading;
