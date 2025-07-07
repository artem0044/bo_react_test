import React, {useEffect, useMemo} from "react";
import {formatNumber} from "@helpers/formatNumber"
import './index.sass';
import {useDispatch, useSelector} from "react-redux";
import {getOrderBookData} from "@actions/futures";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {useTranslation} from "@helpers/translate";

export const OrderBook = () => {
  const {price, orderBookLoading, orderBook, tickersLoading} = useSelector(state => state.futures);
  const dispatch = useDispatch();
  const {pair} = useSelector((state) => state.futures);
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isTablet = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {__} = useTranslation();
  
  useEffect(() => {
    dispatch(getOrderBookData(pair.slug));
  }, [pair.slug]);

  const decimals = useMemo(() => {
    return  Math.max(0, Math.log10(pair.pricescale))
  }, [pair.pricescale]);
  
  return (<div className="orderBook">
    <p className="orderBook__head">{__("futures.order_book")}</p>

    {!orderBookLoading && (<>
      <div className="orderBook__table">
        <div className="orderBook__table-head">
          <div className="orderBook__table-tr">
            <div className="orderBook__table-td">
              <p className="orderBook__text">{__("futures.price")} (USDT)</p>
            </div>
            <div className="orderBook__table-td">
              <p className="orderBook__text">{__("futures.size")}</p>
            </div>
            <div className="orderBook__table-td">
              <p className="orderBook__text">{__("futures.total")}</p>
            </div>
          </div>
        </div>
        <div className="orderBook__table-body">
          {orderBook?.asks?.slice(0, (isXl || isMobile) ? 9 : isTablet ? 7 : 3).reverse()?.map(([price, qty], index) => (<div className="orderBook__table-tr" key={index}>
            <div className="orderBook__table-td">
                  <span
                    className="orderBook__table-value orderBook__table-value--red">{parseFloat(price).toFixed(decimals)}</span>
            </div>
            <div className="orderBook__table-td">
              <span className="orderBook__table-value">{formatNumber(parseFloat(qty))}</span>
            </div>
            <div className="orderBook__table-td">
              <span className="orderBook__table-value">{formatNumber(parseFloat(price) * parseFloat(qty))}</span>
            </div>
          </div>))}
        </div>
      </div>
      <div className="orderBook__middle">
        <span className="orderBook__middle-value">{!tickersLoading && parseFloat(price).toFixed(decimals)}</span>
      </div>
      <div className="orderBook__table">
        <div className="orderBook__table-head">
          <div className="orderBook__table-tr">
            <div className="orderBook__table-td">
              <p className="orderBook__text">{__("futures.price")} (USDT)</p>
            </div>
            <div className="orderBook__table-td">
              <p className="orderBook__text">{__("futures.size")}</p>
            </div>
            <div className="orderBook__table-td">
              <p className="orderBook__text">{__("futures.total")}</p>
            </div>
          </div>
        </div>
        <div className="orderBook__table-body">
          {orderBook?.bids?.slice(0, (isXl || isMobile) ? 8 : isTablet ? 7 : 3)?.map(([price, qty], index) => (<div className="orderBook__table-tr" key={index}>
            <div className="orderBook__table-td">
                  <span
                    className="orderBook__table-value orderBook__table-value--green">{parseFloat(price).toFixed(decimals)}</span>
            </div>
            <div className="orderBook__table-td">
              <span className="orderBook__table-value">{formatNumber(parseFloat(qty))}</span>
            </div>
            <div className="orderBook__table-td">
              <span className="orderBook__table-value">{formatNumber((parseFloat(price) * parseFloat(qty)))}</span>
            </div>
          </div>))}
        </div>
      </div>
    </>)}
  </div>)
}