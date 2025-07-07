import {Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import axios from "@helpers/axios/private.axios";
import {useTranslation} from "@helpers/translate";
import {useSelector} from "react-redux";

export const OrderHistory = ({hideOtherSymbols, data, setData}) => {
  const [loading, setLoading] = useState(false);
  const {__} = useTranslation();
  const {pair} = useSelector((state) => state.futures);
  const {
    wallet: { active_wallet },
  } = useSelector((state) => state);
  
  const getHistoryOrders = async () => {
    try {
      setLoading(true);

      const resp = await axios.get(`/futures/orders/history`);
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
      <Table stickyHeader sx={{minWidth: 708}}>
        <TableHead>
          <TableRow>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.time")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.symbol")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.type")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.side")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.price")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.executed")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.amount")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text" align="right">
              {__("futures.status")}
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
                <TableCell className="futuresOrdersTable__time">{order.created_at}</TableCell>
                <TableCell className="futuresOrdersTable__value">{order.symbol} <span
                  className="futuresOrdersTable__tag">{__("futures.perp")}</span></TableCell>
                <TableCell className="futuresOrdersTable__value">{order.type}</TableCell>
                <TableCell
                  className={`futuresOrdersTable__value ${order.side === "Sell" ? "futuresOrdersTable__value--red" : "futuresOrdersTable__value--green"}`}
                >
                  {order.side}
                </TableCell>
                <TableCell className="futuresOrdersTable__value">{order.price}</TableCell>
                <TableCell className="futuresOrdersTable__value">{order.fill_price}</TableCell>
                <TableCell className="futuresOrdersTable__value">{order.amount} USDT</TableCell>
                <TableCell className="futuresOrdersTable__value" align="right">
                  <button type="button"
                          className={`futuresOrdersTable__button${order.status === "Cancelled" ? ' futuresOrdersTable__button--gray' : ''}`}>{order.status}</button>
                </TableCell>
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