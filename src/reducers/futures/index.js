import {FUTURES} from "../../constants";
import config from "../../config";

const initState = {
  pair: config.default_futures_pair,
  price: null,
  tickersLoading: false,
  orderBookLoading: false,
  markPrice: null,
  tickerData: null,
  orderBook: null,
  notifications: [],
  orders: {}
};

const tradingReducer = (state = initState, action) => {
  switch (action.type) {
  case FUTURES.CHANGE_PAIR:
    return {
      ...state,
      pair: action.payload,
      price: null
    };
  case FUTURES.UPDATE_PRICE:
    return {
      ...state,
      price: action.payload,
    };
  case FUTURES.CHANGE_MARK_PRICE:
    return {
      ...state,
      markPrice: action.payload,
    };
  case FUTURES.CHANGE_TICKER_DATA:
    return {
      ...state,
      tickerData: action.payload,
    };
  case FUTURES.UPDATE_ORDER_BOOK:
    return {
      ...state,
      orderBook: action.payload,
    };

  case FUTURES.FUTURE_TICKERS_LOADING:
    return {
      ...state,
      tickersLoading: action.payload,
    };
  case FUTURES.FUTURE_ORDER_BOOK_LOADING:
    return {
      ...state,
      orderBookLoading: action.payload,
    };

  case FUTURES.SHOW_NOTIFICATION:
    console.log(state)
    return {
      ...state,
      notifications: state?.notifications?.length ? [...state.notifications, action.payload] : [action.payload],
    };

  case FUTURES.HIDE_NOTIFICATION:
    return {
      ...state,
      notifications: state.notifications.filter(
        (el) => el.id !== action.payload
      ),
    };
  default:
    return state;
  }
};

export default tradingReducer;
