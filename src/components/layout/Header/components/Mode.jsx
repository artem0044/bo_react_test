import React, {useEffect, useState} from "react";
import {Menu, MenuItem} from "@mui/material";
import {Button, DemoIcon, FuturesIcon, RealIcon} from "@components/library";
import {AnimatedCounter} from "react-animated-counter";
import {changeWallet, getWallets, updateWalletEvent} from "@actions";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "@helpers/translate";
import {FUTURES_PAGE, MAIN_PAGE, WALLET, WALLET_DEPOSIT, WALLET_TYPE, WALLET_WITHDRAWAL} from "../../../../constants";
import Collapse from "@mui/material/Collapse";
import {Link, useLocation} from "react-router-dom";

const Mode = () => {
  const dispatch = useDispatch();
  const {active_wallet, wallets, loading} = useSelector((state) => state.wallet);
  const {__} = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const {pathname} = useLocation();
  // const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectChange = async (data) => {
    // if (active_wallet.type === data.type) return;
    console.log('handleSelectChange')
    try {
      const wallet = wallets.find((item) => item.type === data.type);
      await dispatch(changeWallet(wallet));
      // if ((wallet.type === WALLET_TYPE.REAL_FUTURES || wallet.type === WALLET_TYPE.DEMO_FUTURES) && pathname === MAIN_PAGE) {
      //   navigate(FUTURES_PAGE);
      // }
      // if ((wallet.type === WALLET_TYPE.REAL || wallet.type === WALLET_TYPE.DEMO) && pathname === FUTURES_PAGE) {
      //   navigate(MAIN_PAGE);
      // }
    } catch (e) {
      console.log(e);
    }
  };

  const openTransferPopup = (from, to) => {
    handleClose();
    dispatch({type: WALLET.SHOW_TRANSFER_POPUP, payload: {from, to}});
  }

  useEffect(() => {
    dispatch(getWallets());
    dispatch(updateWalletEvent());
  }, []);


  useEffect(() => {
    /* eslint-disable */
    const checkCurrentRouteAndWalletType = async () => {
      if ((active_wallet.type === WALLET_TYPE.REAL_FUTURES || active_wallet.type === WALLET_TYPE.DEMO_FUTURES) && pathname === MAIN_PAGE) {
        const wallet = wallets.find((item) => item.type === WALLET_TYPE.REAL_FUTURES);
        await dispatch(changeWallet(wallet));
      }
      if ((active_wallet.type === WALLET_TYPE.REAL || active_wallet.type === WALLET_TYPE.DEMO) && pathname === FUTURES_PAGE) {
        const wallet = wallets.find((item) => item.type === WALLET_TYPE.REAL);
        await dispatch(changeWallet(wallet));
      }
    }
    /* eslint-enable */
    // checkCurrentRouteAndWalletType();
  }, [pathname])

  const getWalletName = (type) => {
    switch (type) {
    case WALLET_TYPE.DEMO:
      return __("common.demo");
    case WALLET_TYPE.REAL:
      return __("common.real");
    case WALLET_TYPE.DEMO_FUTURES:
      return __("common.demo_futures");
    case WALLET_TYPE.REAL_FUTURES:
      return __("common.real_futures");
    default:
      return '';
    }
  }

  const getWalletIcon = (type) => {
    switch (type) {
    case WALLET_TYPE.DEMO:
      return DemoIcon();
    case WALLET_TYPE.REAL:
      return RealIcon();
    case WALLET_TYPE.DEMO_FUTURES:
      return DemoIcon();
    case WALLET_TYPE.REAL_FUTURES:
      return FuturesIcon();
    default:
      return '';
    }
  }

  if (loading) return (<></>)

  return (<div className={`mode-select${anchorEl ? ' mode-select--opened' : ''}`}>
    <button type="buttom" className="mode-select__btn" onClick={handleOpen}>
      <div className="mode-item">
          <span className="mode-item__icon">
            {getWalletIcon(active_wallet.type)}
          </span>
        <div className="mode-item__content">
          <p className="mode-item__name">
            {getWalletName(active_wallet.type)}
          </p>
          <h5 className="mode-item__value">
            <AnimatedCounter
              value={active_wallet.balance}
              fontSize="14px"
              color="#ffffff"
            />
            <span className="mode-item__value-currency">USDT</span>
          </h5>
        </div>
      </div>
      <svg className="mode-select__btn-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0.5H1H0L5 5.5L10 0.5Z" fill="#868686"/>
      </svg>
    </button>
    <Menu
      className="mode-select-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom', horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top', horizontal: 'center',
      }}
    >
      {wallets.map((wallet) => {
        // if ((active_wallet.type == WALLET_TYPE.REAL || active_wallet.type == WALLET_TYPE.DEMO) && wallet.type === WALLET_TYPE.DEMO_FUTURES) {
        //   return <></>
        // }
        // if ((active_wallet.type == WALLET_TYPE.REAL_FUTURES || active_wallet.type == WALLET_TYPE.DEMO_FUTURES) && wallet.type === WALLET_TYPE.DEMO) {
        //   return <></>
        // }
        return (<MenuItem
          selected={active_wallet.type === wallet.type}
          onClick={() => handleSelectChange(wallet)}
          key={wallet.id}
          value={wallet.type}>
          <div className="mode-item-wrapper">
            <div className="mode-item">
              <span className="mode-item__icon">
                {getWalletIcon(wallet.type)}
              </span>
              <div className="mode-item__content">
                <p className="mode-item__name">
                  {getWalletName(wallet.type)}
                </p>
                <h5 className="mode-item__value">
                  <AnimatedCounter
                    value={wallet.balance}
                    fontSize="16px"
                    color="#ffffff"
                  />
                  <span className="mode-item__value-currency">USDT</span>
                </h5>
              </div>
            </div>
            {wallet.type === WALLET_TYPE.REAL && (<Collapse in={active_wallet.type === wallet.type}>
              <div className="mode-item-content">
                <Button
                  to={WALLET_DEPOSIT}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type={'link'}
                  className="mode-item-content__btn"
                  color="orange"
                  size='mini'>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 7.53333L8 1L14.5 7.53333M1.5 15L8 8.46667L14.5 15" stroke="white" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {__('wallet.top_up')}
                </Button>
                <Link
                  to={WALLET_WITHDRAWAL}
                  type="button" className="mode-item-content__deposit">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.33333 6.41667H4.58333C3.57081 6.41667 2.75 7.23748 2.75 8.25001V16.5C2.75 17.5125 3.57081 18.3333 4.58333 18.3333H17.4167C18.4292 18.3333 19.25 17.5125 19.25 16.5V8.25001C19.25 7.23748 18.4292 6.41667 17.4167 6.41667H14.6667M13.75 10.0833L11 12.8333M11 12.8333L8.25 10.0833M11 12.8333L11 3.66667"
                      stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <button onClick={(e) => {
                  e.stopPropagation();
                  openTransferPopup(WALLET_TYPE.REAL, WALLET_TYPE.REAL_FUTURES)
                }} type="button" className="mode-item-content__transfer">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.75 4.55556L14.5 4.55556M14.5 4.55556L11.25 1M14.5 4.55556L11.25 8.11111M11.25 13.4444L1.5 13.4444M1.5 13.4444L4.75 17M1.5 13.4444L4.75 9.88889"
                      stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </Collapse>)}
            {wallet.type === WALLET_TYPE.REAL_FUTURES && (<Collapse in={active_wallet.type === wallet.type}>
              <div className="mode-item-content">
                <Button onClick={(e) => {
                  e.stopPropagation();
                  openTransferPopup(WALLET_TYPE.REAL_FUTURES, WALLET_TYPE.REAL)
                }} type={'button'} className="mode-item-content__btn" color="orange" size='mini'>
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.75 4.55556L14.5 4.55556M14.5 4.55556L11.25 1M14.5 4.55556L11.25 8.11111M11.25 13.4444L1.5 13.4444M1.5 13.4444L4.75 17M1.5 13.4444L4.75 9.88889"
                      stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {__("wallet.transfer")}
                </Button>
              </div>
            </Collapse>)}
          </div>
        </MenuItem>);
      })}
    </Menu>
  </div>);
};

export default Mode;
