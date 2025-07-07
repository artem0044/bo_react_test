import React from "react";
import SelectPairs from "@components/layout/Header/components/SelectPairs";
import { useSelector } from "react-redux";

const TradingPairs = ({showPairs, setShowPairs}) => {
  const { pair } = useSelector((state) => state.trading);

  return (
    <div className={`tradingPairs ${showPairs ? "active" : ""}`}>
      <button
        onClick={() => setShowPairs(true)}
        type="button"
        className="tradingPairs__selected-wrapper"
      >
        <div className="tradingPairs__selected">
          <img className="tradingPairs__selected-icon" src={pair.cover} />
          <h4 className="tradingPairs__selected-info">{pair.name}</h4>
        </div>
        <div className="tradingPairs__arrow">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.05332 11.0467L8.20665 11.0467H11.9467C12.5867 11.0467 12.9067 10.2734 12.4533 9.82003L8.99998 6.36669C8.44665 5.81336 7.54665 5.81336 6.99332 6.36669L5.67999 7.68003L3.53998 9.82003C3.09332 10.2734 3.41332 11.0467 4.05332 11.0467Z"
              fill="#707070"
            />
          </svg>
        </div>
      </button>
      {showPairs && (
        <>
          <SelectPairs setShow={setShowPairs} />
        </>
      )}
    </div>
  );
};

export default TradingPairs;
