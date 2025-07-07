import {WALLET, WALLET_TYPE} from "../../constants";

const initState = {
  showWithdrawal: false,
  withdrawalData: { transaction: { id: null } },
  showPopup: false,
  loading: true,
  active_wallet: {
    type: "demo",
  },
  wallets: [],
  realWallet: {},
  popupInfo: {},
  showTransferPopup: false,
  transferPopupInfo: {
    from: WALLET_TYPE.REAL,
    to: WALLET_TYPE.REAL_FUTURES,
  },
};

const walletReducer = (state = initState, action) => {
  switch (action.type) {
    case WALLET.SHOW_WITHDRAWAL:
      console.log(action.payload);
      return {
        ...state,
        showWithdrawal: true,
        withdrawalData: action.payload,
      };

    case WALLET.HIDE_WITHDRAWAL:
      return {
        ...state,
        showWithdrawal: false,
      };

    case WALLET.SHOW_POPUP:
      return {
        ...state,
        showPopup: true,
        popupInfo: action.payload,
      };

    case WALLET.HIDE_POPUP:
      return {
        ...state,
        showPopup: false,
      };

    case WALLET.CHANGE_WALLET:
      return {
        ...state,
        active_wallet: action.payload,
      };

    case WALLET.UPDATE_WALLETS:
      return {
        ...state,
        wallets: action.payload.wallets,
        realWallet: action.payload.realWallet,
        loading: false,
      };

    case WALLET.WALLET_LOADING:
      return {
        ...state,
        loading: true,
      };

  case WALLET.SHOW_TRANSFER_POPUP:
    return {
      ...state,
      showTransferPopup: true,
      transferPopupInfo: {
        from: action.payload.from,
        to: action.payload.to,
      }
    };

  case WALLET.HIDE_TRANSFER_POPUP:
    return {
      ...state,
      showTransferPopup: false,
    };

    default:
      return state;
  }
};

export default walletReducer;
