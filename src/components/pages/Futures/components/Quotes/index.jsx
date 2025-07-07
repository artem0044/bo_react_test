import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import './index.sass';
import {FuturesPairs} from "@components/pages/Futures/components/Quotes/FuturesPairs";
import {formatNumberWithCommas} from "@helpers/formatNumber";
import {useTranslation} from "@helpers/translate";

export const Quotes = () => {
  const [prevPrice, setPrevPrice] = useState(null);
  const {tickersLoading, markPrice, tickerData} = useSelector(state => state.futures);
  const [priceDirection, setPriceDirection] = useState(null);
  const {__} = useTranslation();
  
  useEffect(() => {
    if (tickerData) {
      if (prevPrice !== null) {
        if (parseFloat(tickerData.lastPrice) > parseFloat(prevPrice)) {
          setPriceDirection('up');
        } else if (parseFloat(tickerData.lastPrice) < parseFloat(prevPrice)) {
          setPriceDirection('down');
        }
      }
      setPrevPrice(tickerData.lastPrice);
    }
  }, [tickerData?.lastPrice]);

  return (<div className="futures-quote">
    <FuturesPairs/>
    {!tickersLoading && tickerData && (<ul className="futures-quote__list">
      <li className="futures-quote__item">
        <p
          className={`futures-quote__value futures-quote__value--big ${priceDirection === "up" ? 'futures-quote__value--green' : 'futures-quote__value--red'}`}
        >
          {formatNumberWithCommas(tickerData.lastPrice)}
        </p>
        <p className="futures-quote__text">= {formatNumberWithCommas(tickerData.lastPrice)} USDT</p>
      </li>
      <li className="futures-quote__item">
        <p className="futures-quote__text">{__("futures.change_24h")}</p>
        <p
          className={`futures-quote__value ${tickerData.priceChangePercent >= 0 ? 'futures-quote__value--green' : 'futures-quote__value--red'}`}>
          {formatNumberWithCommas(tickerData.priceChangePercent)}%
        </p>
      </li>
      <li className="futures-quote__item">
        <p className="futures-quote__text">{__("futures.mark_price")}</p>
        <p className="futures-quote__value">
          {formatNumberWithCommas(markPrice)}
        </p>
      </li>
      <li className="futures-quote__item">
        <p className="futures-quote__text">{__("futures.high_24h")}</p>
        <p className="futures-quote__value">{formatNumberWithCommas(tickerData.highPrice)}</p>
      </li>
      <li className="futures-quote__item">
        <p className="futures-quote__text">{__("futures.low_24h")}</p>
        <p className="futures-quote__value">{formatNumberWithCommas(tickerData.lowPrice)}</p>
      </li>
      <li className="futures-quote__item">
        <p className="futures-quote__text">{__("futures.quantity_24h")}</p>
        <p className="futures-quote__value">{formatNumberWithCommas(tickerData.quoteVolume)}</p>
      </li>
      <li className="futures-quote__item">
        <p className="futures-quote__text">{__("futures.total_24h")}</p>
        <p className="futures-quote__value">{formatNumberWithCommas(tickerData.volume)}</p>
      </li>
    </ul>)}
  </div>);
}
