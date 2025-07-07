import {Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import axios from "@helpers/axios/private.axios";
import {useTranslation} from "@helpers/translate";
import {useSelector} from "react-redux";

export const PositionHistory = ({hideOtherSymbols, data, setData}) => {
  const [loading, setLoading] = useState(false);
  const {__} = useTranslation();
  const {pair} = useSelector((state) => state.futures);
  const {
    wallet: {active_wallet},
  } = useSelector((state) => state);

  const getHistoryOrders = async () => {
    try {
      setLoading(true);

      const resp = await axios.get(`/futures/positions/history`);
      setData(resp.data.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getHistoryOrders();
  }, [active_wallet]);

  const filteredData = useMemo(() => {
    return hideOtherSymbols ? data.filter((order) => order.symbol === pair.slug) : data;
  }, [data, pair, hideOtherSymbols]);

  return (
    <TableContainer sx={{maxHeight: 240, overflow: 'auto'}} className="futuresOrdersTable">
      <Table stickyHeader sx={{minWidth: 920}}>
        <TableHead>
          <TableRow>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.symbol")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.closing_pnl")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.size")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.entry_price")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.close_price")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.opened")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text" align="right">
              {__("futures.closed")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            Array.from({length: 3}).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={8}>
                  <Skeleton
                    className="main-skeleton"
                    variant="rounded"
                    height={20}
                    width="100%"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : filteredData.length ? (
            <>
              {filteredData.map((order, index) => (<TableRow
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                key={index}>
                <TableCell className="futuresOrdersTable__time">
                  <div className="futuresOrdersTable__symbol">
                    <img src={order.cover} className="futuresOrdersTable__symbol-icon"/>
                    <div className="futuresOrdersTable__symbol-content">
                      <div className="futuresOrdersTable__symbol-content-top">
                        <span className="futuresOrdersTable__symbol-name">{order.symbol}</span>
                        <span className="futuresOrdersTable__symbol-status">{order.status}</span>
                      </div>
                      <span className="futuresOrdersTable__tag">Perp</span>
                      <span
                        className={`futuresOrdersTable__tag ${order.side === "Sell" ? "futuresOrdersTable__tag--red" : "futuresOrdersTable__tag--green"}`}>{order.side}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className={`futuresOrdersTable__value ${order.pnl < 0 ? "futuresOrdersTable__value--red" : "futuresOrdersTable__value--green"}`}>
                  {order.pnl} USDT
                </TableCell>
                <TableCell
                  className={`futuresOrdersTable__value ${order.side.toLowerCase() === "short" ? "futuresOrdersTable__value--red" : "futuresOrdersTable__value--green"}`}>
                  {order.leverage * order.margin}
                </TableCell>
                <TableCell
                  className={`futuresOrdersTable__value`}>
                  {Number(order.entry_price).toFixed(2)} USDT
                </TableCell>
                <TableCell className="futuresOrdersTable__value">{order.closed_price} USDT</TableCell>
                <TableCell className="futuresOrdersTable__value">{order.created_at}</TableCell>
                <TableCell className="futuresOrdersTable__value" align="right">{order.closed_at}</TableCell>
              </TableRow>))}
            </>
          ) : (
            <p className="futuresOrdersTable__notFound">{__("common.not_found")}</p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}