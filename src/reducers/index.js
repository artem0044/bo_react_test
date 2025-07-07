import { combineReducers } from "redux";

import auth from "./auth";
import locale from "./locale";
import theme from "./theme";
import user from "./user";
import alert from "./alert";
import trading from "./trading";
import bids from "./bids";
import wallet from "./wallet";
import channel from "./channel";
import authModals from "./authModalsReducer";
import futures from "./futures";

const rootReducer = combineReducers({
  auth,
  localization: locale,
  theme,
  user,
  alert,
  trading,
  bids,
  wallet,
  channel,
  authModals,
  futures
});

export default rootReducer;
