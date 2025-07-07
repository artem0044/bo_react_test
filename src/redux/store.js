import { createStore, compose, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import reducers from "../reducers";
import { saveState, loadState } from "@helpers";
import { GLOBALS } from "@constants";
import { configurateToken } from "@helpers/axios/private.axios";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const middlewares = applyMiddleware(thunk);

const prevState = loadState(GLOBALS.local_state_name);

const getState = (oldState) => {
  if (!oldState) {
    return createStore(reducers, composeEnhancers(middlewares));
  }
  return createStore(reducers, oldState, composeEnhancers(middlewares));
};

const store = getState(prevState);

store.subscribe(() => {
  const data = store.getState();
  if (data.auth.token !== null) {
    configurateToken(data.auth.token);
  }

  saveState(GLOBALS.local_state_name, {
    auth: {
      token: data.auth.token,
      user: data.auth.user,
      isAuth: data.auth.isAuth,
      isDemoUser: data.auth.isDemoUser,
    },
    localization: {
      locale: data.localization.locale,
    },
    theme: {
      theme: data.theme.theme,
    },
    user: {
      loading: true,
    },
    trading: {
      pair: data.trading.pair,
      userPairList: data.trading.userPairList,
    },
    futures: {
      pair: data.futures.pair,
    },
  });
});

export default store;
