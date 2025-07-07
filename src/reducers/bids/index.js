import { BIDS } from "../../constants";

const initState = {
  amount: 100,
  time: "00:01:00",

  notifications: [],

  closedHistory: {},
  openedHistory: [],
  isOpenHistory: false,
  loadingHistory: false,
  historyType: "active",
  loadingMore: {
    total: 1,
    isLoading: false,
  },
};

const bidsReducer = (state = initState, action) => {
  switch (action.type) {
    case BIDS.UPDATE_FIELD:
      return {
        ...state,
        ...action.payload,
      };

    case BIDS.SHOW_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case BIDS.HIDE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (el) => el.id !== action.payload
        ),
      };

    case BIDS.ADD_TO_OPENED_HISTORY:
      return {
        ...state,
        openedHistory: [action.payload, ...state.openedHistory],
      };

    case BIDS.REMOVE_FROM_OPENED_HISTORY:
      return {
        ...state,
        openedHistory: state.openedHistory.filter(
          (bid) => bid.id !== action.payload
        ),
      };

    case BIDS.ADD_TO_CLOSED_HISTORY:
      return {
        ...state,
        closedHistory: {
          ...state.closedHistory,
          [action.payload.date]: [
            action.payload.bid,
            ...(state.closedHistory[action.payload.date] || []),
          ],
        },
      };

    case BIDS.REMOVE_CLOSED_HISTORY:
      return {
        ...state,
        closedHistory: {},
      };

    case BIDS.LOADING_CLOSED_HISTORY:
      return {
        ...state,
        loadingMore: {
          ...state.loadingMore,
          isLoading: true,
        },
      };

    case BIDS.CHANGE_CLOSED_HISTORY:
      return {
        ...state,
        closedHistory: { ...state.closedHistory, ...action.payload.data },
        loadingMore: {
          isLoading: false,
          total: action.payload.total,
        },
      };

    case BIDS.CHANGE_OPENED_HISTORY:
      return {
        ...state,
        openedHistory: action.payload,
      };

    case BIDS.HISTORY_REQUEST:
      return {
        ...state,
        loadingHistory: true,
      };

    case BIDS.HISTORY_LOADED:
      return {
        ...state,
        loadingHistory: false,
      };

    case BIDS.CHANGE_HISTORY_TYPE:
      return {
        ...state,
        historyType: action.payload,
      };

    case BIDS.TOGGLE_HISTORY:
      return {
        ...state,
        isOpenHistory: !state.isOpenHistory,
      };

    default:
      return state;
  }
};

export default bidsReducer;
