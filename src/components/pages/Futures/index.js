import React, {useEffect, useState} from "react";
import {useTranslation} from "@helpers/translate";
import {Helmet} from "react-helmet";
import {Quotes} from "@components/pages/Futures/components/Quotes";
import {OrderBook} from "@components/pages/Futures/components/OrderBook";
import {useDispatch, useSelector} from "react-redux";
import {getTickerData, subscribeToFutureSockets} from "@actions/futures/futureData";
import {Orders} from "@components/pages/Futures/components/Orders";
// import {changeWallet} from "@actions";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {Controls} from "@components/pages/Futures/components/Controls";
import FuturesWidget from "@components/pages/Futures/components/FuturesWidget";
import {FuturesNotification} from "@components/pages/Futures/components/FuturesNotification";
// import {WALLET_TYPE} from "../../../constants";
import "./Futures.sass";

export const Futures = () => {
  const {__} = useTranslation();
  const dispatch = useDispatch();
  const {pair, tickerData} = useSelector((state) => state.futures);
  const [activeTab, setActiveTab] = useState("chart");
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    let cleanUpWebSocket = () => {
    };

    const fetchAndSubscribe = async () => {
      dispatch(getTickerData());
      cleanUpWebSocket = await dispatch(subscribeToFutureSockets());
    };

    fetchAndSubscribe();

    return () => {
      cleanUpWebSocket();
    };
  }, [pair.slug]);

  // const changeOnFutureWallet = async () => {
  //   if (active_wallet.type === WALLET_TYPE.REAL) {
  //     const wallet = wallets.find((item) => item.type === WALLET_TYPE.REAL_FUTURES);
  //     await dispatch(changeWallet(wallet));
  //   }
  //
  //   if (active_wallet.type === WALLET_TYPE.DEMO) {
  //     const wallet = wallets.find((item) => item.type === WALLET_TYPE.DEMO_FUTURES);
  //     await dispatch(changeWallet(wallet));
  //   }
  // }
  //
  // useEffect(() => {
  //   changeOnFutureWallet();
  // }, [active_wallet.type]);


  const tabs = [{id: "chart", label: __("futures.chart")}, {id: "order_book", label: __("futures.order_book")}];

  return (<div className="futures">
    <Helmet>
      <title>
        {tickerData && pair ? (`${tickerData.lastPrice} | ${pair.slug}`) : "Loading..."}
        {__("seo.divider")} {__("seo.title")}
      </title>
    </Helmet>

    <FuturesNotification/>
    <Quotes/>

    {!isDesktop &&
      <ul className="mainTabs__tabs">
        {tabs.map((tab) => (<li key={tab.id} className="mainTabs__tab-item">
          <button
            type="button"
            className={`mainTabs__tab ${activeTab === tab.id ? "mainTabs__tab--active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        </li>))}
      </ul>}
    <div className="futures__content">
      <div className={`futures__chart future-tab${activeTab === 'chart' ? ' future-tab--active' : ''}`}>
        <FuturesWidget/>
      </div>
      <div className={`futures__order future-tab${activeTab === 'order_book' ? ' future-tab--active' : ''}`}>
        <OrderBook/>
      </div>
      <div className="futures__controls">
        <Controls/>
      </div>
      <div className="futures__orders">
        <Orders/>
      </div>
      {/*<div className={`futures__trades future-tab${activeTab === 'trades' ? ' future-tab--active' : ''}`}>*/}
      {/*  <div className="futuresTrades">*/}
      {/*    <div className="futuresTrades__head">*/}
      {/*      <p className="futuresTrades__head-title">Trades</p>*/}
      {/*    </div>*/}

      {/*    <div className="futuresTrades__table">*/}
      {/*      <div className="futuresTrades__table-head">*/}
      {/*        <div className="futuresTrades__table-tr">*/}
      {/*          <div className="futuresTrades__table-td"><p className="futuresTrades__text">Price (USD)</p></div>*/}
      {/*          <div className="futuresTrades__table-td"><p className="futuresTrades__text">Amount (BTC)</p></div>*/}
      {/*          <div className="futuresTrades__table-td"><p className="futuresTrades__text">Time</p></div>*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      <div className="futuresTrades__table-body">*/}
      {/*        <div className="futuresTrades__table-tr">*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value futuresTrades__table-value--red">92,009.00</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">0.2</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">13:37:04</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="futuresTrades__table-tr">*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value futuresTrades__table-value--red">92,009.00</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">0.2</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">13:37:04</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="futuresTrades__table-tr">*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value futuresTrades__table-value--green">92,009.00</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">0.2</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">13:37:04</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="futuresTrades__table-tr">*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value futuresTrades__table-value--red">92,009.00</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">0.2</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">13:37:04</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="futuresTrades__table-tr">*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value futuresTrades__table-value--red">92,009.00</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">0.2</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">13:37:04</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="futuresTrades__table-tr">*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value futuresTrades__table-value--red">92,009.00</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">0.2</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">13:37:04</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="futuresTrades__table-tr">*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value futuresTrades__table-value--red">92,009.00</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">0.2</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">13:37:04</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="futuresTrades__table-tr">*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value futuresTrades__table-value--red">92,009.00</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">0.2</span>*/}
      {/*          </div>*/}
      {/*          <div className="futuresTrades__table-td">*/}
      {/*            <span className="futuresTrades__table-value">13:37:04</span>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  </div>);
};

export default Futures;
