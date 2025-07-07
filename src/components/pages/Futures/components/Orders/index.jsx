import React, {useEffect, useState} from "react";
import {Positions} from "@components/pages/Futures/components/Orders/Positions";
import {OpenOrders} from "@components/pages/Futures/components/Orders/OpenOrders";
import {OrderHistory} from "@components/pages/Futures/components/Orders/OrderHistory";
import {PositionHistory} from "@components/pages/Futures/components/Orders/PositionHistory";
import {useSelector} from "react-redux";
import {useTranslation} from "@helpers/translate";

export const Orders = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("futuresActiveTab") || "openOrders";
  });
  const [hideOtherSymbols, setHideOtherSymbols] = useState(false);
  const {user} = useSelector((state) => state.channel)
  const [positionsData, setPositionsData] = useState([]);
  const [openOrdersData, setOpenOrdersData] = useState([]);
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [positionHistoryData, setPositionHistoryData] = useState([]);
  const {__} = useTranslation();
  
  const tabs = [{id: "positions", label: __("futures.positions")}, {id: "openOrders", label: __("futures.open_orders")}, {
    id: "orderHistory", label: __("futures.order_history")
  }, {id: "positionHistory", label: __("futures.position_history")}];
  
  useEffect(() => {
    if (!user) return;
    const futuresEventListener = (e) => {
      const {action, tab, data} = e;

      const updateState = (setter) => {
        if (action === "add") {
          setter(prev => [data, ...prev]);
        }

        if (action === "remove") {
          setter(prev => prev.filter(item => item.id !== data.id));
        }
      };

      switch (tab) {
      case "positions":
        updateState(setPositionsData);
        break;
      case "openOrders":
        updateState(setOpenOrdersData);
        break;
      case "orderHistory":
        updateState(setOrderHistoryData);
        break;
      case "positionHistory":
        updateState(setPositionHistoryData);
        break;
      default:
        break;
      }
    }

    user.listen("FuturesEvent", futuresEventListener);
    return () => {
      user.stopListening("FuturesEvent", futuresEventListener);
    };
  }, [user]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    localStorage.setItem("futuresActiveTab", tabId);
  };

  return (<div className="futuresOrders">
    <div className="futuresOrders__head">
      <div className="futuresOrders__head-left">
        <ul className="futuresOrders__tabs">
          {tabs.map((tab) => (<li key={tab.id} className="futuresOrders__tab-item">
            <button
              type="button"
              className={`futuresOrders__tab ${activeTab === tab.id ? "futuresOrders__tab--active" : ""}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          </li>))}
        </ul>
      </div>
      <div className="futuresOrders__head-right">
        <input
          className="bo-checkbox2"
          id="cp"
          value={hideOtherSymbols}
          onChange={() => setHideOtherSymbols(prev => !prev)}
          type="checkbox"
        />
        <label htmlFor="cp" className="bo-checkbox2-label">
          <p>
            {__("futures.hide_other_symbols")}
          </p>
        </label>
      </div>
    </div>
    {activeTab === "positions" &&
      <Positions hideOtherSymbols={hideOtherSymbols} data={positionsData} setData={setPositionsData}/>}
    {activeTab === "openOrders" &&
      <OpenOrders hideOtherSymbols={hideOtherSymbols} data={openOrdersData} setData={setOpenOrdersData}/>}
    {activeTab === "orderHistory" &&
      <OrderHistory hideOtherSymbols={hideOtherSymbols} data={orderHistoryData} setData={setOrderHistoryData}/>}
    {activeTab === "positionHistory" && <PositionHistory hideOtherSymbols={hideOtherSymbols} data={positionHistoryData}
                                                         setData={setPositionHistoryData}/>}
  </div>)
}