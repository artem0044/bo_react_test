import {FUTURES} from "../../constants";
import axios from "@helpers/axios/public.axios";
import store from "../../redux/store";

export const subscribeToFutureSockets = () => (dispatch) => {
  const currentPair = store.getState().futures.pair.slug.toLowerCase();
  const ws = new WebSocket(`wss://fstream.binance.com/stream?streams=${currentPair}@ticker/${currentPair}@markPrice/${currentPair}@depth10@500ms`);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.ping) {
      ws.send(JSON.stringify({pong: data.ping}));
      return;
    }

    if (data) {
      if (data.ping) {
        ws.send(JSON.stringify({pong: data.ping}));
        return;
      }

      if (data.stream === `${currentPair}@markPrice`) {
        dispatch({type: FUTURES.CHANGE_MARK_PRICE, payload: data.data.p});
        return;
      }
      if (data.stream === `${currentPair}@ticker`) {
        const {c, P, h, l, v, q} = data.data;
        const state = store.getState();
        dispatch({
          type: FUTURES.CHANGE_TICKER_DATA, payload: {
            ...state?.futures?.tickerData,
            lastPrice: c,
            priceChangePercent: P,
            highPrice: h,
            lowPrice: l,
            volume: v,
            quoteVolume: q
          }
        });

        dispatch({
          type: FUTURES.UPDATE_PRICE, payload: c,
        });
      }

      // console.log(data.stream, `${currentPair}@depth10@500ms`)
      
      if (data.stream === `${currentPair}@depth10@500ms`) {
        const {a, b} = data.data;

        dispatch({
          type: FUTURES.UPDATE_ORDER_BOOK, payload: {
            asks: a.slice(0, 9),
            bids: b.slice(0, 9),
          },
        });
      }
    }
  };

  return () => {
    console.log('futures close')
    if (ws) {
      ws.close();
    }
  };
};

export const getOrderBookData = () => async (dispatch) => {
  try {
    const currentPair = store.getState().futures.pair.slug.toLowerCase();

    dispatch({type: FUTURES.FUTURE_ORDER_BOOK_LOADING, payload: true});

    const response = await axios.get(`https://fapi.binance.com/fapi/v1/depth?symbol=${currentPair}&limit=10`);
    dispatch({
      type: FUTURES.UPDATE_ORDER_BOOK, payload: response.data,
    });
    dispatch({type: FUTURES.FUTURE_ORDER_BOOK_LOADING, payload: false});
  } catch (error) {
    console.error("Error fetching order book:", error);
  }
};

export const getTickerData = () => async (dispatch) => {
  console.log('getTickerData')
  try {
    const currentPair = store.getState().futures.pair.slug.toLowerCase();

    dispatch({type: FUTURES.FUTURE_TICKERS_LOADING, payload: true});

    const [tickerRes, markPriceRes] = await Promise.all([axios.get(`https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=${currentPair}`), axios.get(`https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${currentPair}`)]);

    const tickerData = tickerRes.data;
    const markPriceData = markPriceRes.data;

    dispatch({
      type: FUTURES.CHANGE_TICKER_DATA, payload: {
        lastPrice: tickerData.lastPrice,
        priceChangePercent: tickerData.priceChangePercent,
        highPrice: tickerData.highPrice,
        lowPrice: tickerData.lowPrice,
        volume: tickerData.volume,
        quoteVolume: tickerData.quoteVolume,
      },
    });

    dispatch({
      type: FUTURES.CHANGE_MARK_PRICE, payload: markPriceData.markPrice,
    });

    dispatch({
      type: FUTURES.UPDATE_PRICE, payload: tickerData.lastPrice,
    });

    dispatch({type: FUTURES.FUTURE_TICKERS_LOADING, payload: false});
  } catch (error) {
    console.error("Error fetching ticker data:", error);
  }
};
