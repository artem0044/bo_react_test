import { TRADING } from "../../constants";
import config from "../../config";

const initState = {
  pair: config.default_pair,
  userPairList: [],
};

const tradingReducer = (state = initState, action) => {
  switch (action.type) {
    case TRADING.CHANGE_PAIR:
      return {
        ...state,
        pair: action.payload,
      };

    case TRADING.ADD_USER_PAIR_LIST:
      return {
        ...state,
        userPairList: [...state.userPairList, action.payload],
      };

    case TRADING.UPDATE_USER_PAIR_LIST:
      return {
        ...state,
        userPairList: action.payload,
      };

    case TRADING.DELETE_FROM_USER_PAIR_LIST:
      return {
        ...state,
        userPairList: state.userPairList.filter(
          (el) => el.slug !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default tradingReducer;
