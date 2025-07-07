import {Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import axios from "@helpers/axios/private.axios";
import {useTranslation} from "@helpers/translate";
import {useSelector} from "react-redux";

export const Positions = ({hideOtherSymbols, data, setData}) => {
  const [loading, setLoading] = useState(false);
  const {__} = useTranslation();
  const {pair, price} = useSelector((state) => state.futures);
  const {
    wallet: {active_wallet},
  } = useSelector((state) => state);
  const [markPrices, setMarkPrices] = useState({});

  const getPositions = async () => {
    try {
      setLoading(true);

      const resp = await axios.get(`/futures/positions/open`);
      setData(resp.data.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const closePosition = async (positionId) => {
    try {
      console.log('markPrices',markPrices);
      const resp = await axios.post(`/futures/positions/close/${positionId}`, {
        price
      });

      setData(data => data.filter(item => item.id !== positionId));
      console.log(resp.data)
    } catch (e) {
      console.error(e);
    }
  }

  const closePositions = async () => {
    try {
      await axios.post(`/futures/positions/close`, {
        ids: data.map((item) => item.id),
        price
      });
      setData([]);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getPositions();
  }, [active_wallet]);

  useEffect(() => {
    if (!data.length) return;

    const uniqueSymbols = [...new Set(data.map(p => p.symbol.toLowerCase()))];
    const streams = uniqueSymbols.map(symbol => `${symbol}@markPrice@1s`).join('/');
    const ws = new WebSocket(`wss://fstream.binance.com/stream?streams=${streams}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data?.ping) {
        ws.send(JSON.stringify({pong: data.ping}));
        return;
      }

      const {data: msg} = data;
      if (msg?.e === 'markPriceUpdate') {
        setMarkPrices(prev => ({
          ...prev,
          [msg.s]: parseFloat(msg.p)
        }));
      }
    };

    return () => {
      ws.close();
      setMarkPrices({});
    };
  }, [data]);

  const calculatePnl = (data) => {
    const markPrice = markPrices[data.symbol];
    if (!markPrice) return 0;
    let pnl;

    const quantity = Number(data.quantity);
    const entry_price = Number(data.entry_price.replace(/,/g, ''));
    
    if (data.side.toLowerCase() === 'long') {
      pnl = (markPrice - entry_price) * quantity * 1;
    } else {
      pnl = (markPrice - entry_price) * quantity * -1;
    }

    console.log(quantity, entry_price, markPrice, pnl.toFixed(2))
    
    return pnl.toFixed(2);
  };

  const filteredData = useMemo(() => {
    return hideOtherSymbols ? data.filter((order) => order.symbol === pair.slug) : data;
  }, [data, pair, hideOtherSymbols]);

  return (<TableContainer sx={{maxHeight: 240, overflow: 'auto'}} className="futuresOrdersTable">
      <Table stickyHeader sx={{minWidth: 800}}>
        <TableHead>
          <TableRow>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.symbol")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.side")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.size")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.entry_price")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.liq_price")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.margin")}</TableCell>
            <TableCell className="futuresOrdersTable__head-text">{__("futures.pnl_roi")}</TableCell>
            <TableCell align="right">
              <button onClick={() => closePositions()} type="button" className="futuresOrdersTable__head-btn">
                {__("futures.close_all_positions")}
              </button>
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
              {filteredData.map((order, index) => {
                const pnl = Object.keys(markPrices)?.length ? calculatePnl(order) : order.pnl;

                return (<TableRow
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  key={index}>
                  <TableCell className="futuresOrdersTable__value">
              <span
                className="futuresOrdersTable__v-indicator futuresOrdersTable__v-indicator--green">{order.symbol}</span>
                    <span
                      className="futuresOrdersTable__tag">{__("futures.perp")}</span>
                    <span
                      className="futuresOrdersTable__tag">{order.leverage}x</span>
                  </TableCell>
                  <TableCell
                    className={`futuresOrdersTable__value ${order.side.toLowerCase() === "short" ? "futuresOrdersTable__value--red" : "futuresOrdersTable__value--green"}`}
                  >
                    {order.side}
                  </TableCell>
                  <TableCell
                    className={`futuresOrdersTable__value ${order.side.toLowerCase() === "short" ? "futuresOrdersTable__value--red" : "futuresOrdersTable__value--green"}`}
                  >
                    {order.size}
                  </TableCell>
                  <TableCell className="futuresOrdersTable__value">{Number(order.entry_price).toFixed(2)}</TableCell>
                  <TableCell className="futuresOrdersTable__value">{order.liq_price}</TableCell>
                  <TableCell
                    className="futuresOrdersTable__value futuresOrdersTable__value--green">{order.margin}</TableCell>
                  <TableCell
                    className={`futuresOrdersTable__value futuresOrdersTable__value--${pnl > 0 ? 'green' : 'red'}`}>{pnl} USDT</TableCell>
                  <TableCell align="right">
                    <button onClick={() => closePosition(order.id)} type="button"
                            className="futuresOrdersTable__button">{__("futures.close")}
                    </button>
                  </TableCell>
                </TableRow>)
              })}
            </>
          ) : (
            <p className="futuresOrdersTable__notFound">{__("common.not_found")}</p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}