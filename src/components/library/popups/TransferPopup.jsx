import {useForm} from "react-hook-form";
import './index.sass';
import React, {useState} from "react";
import {Button, RefreshIcon} from "@components/library";
import {useDispatch, useSelector} from "react-redux";
import {WALLET, WALLET_TYPE} from "../../../constants";
import {useTranslation} from "@helpers/translate";
import {transfer} from "@actions/wallet/transfer";
import {Transition} from "react-transition-group";

export const TransferPopup = () => {
  const {showTransferPopup, transferPopupInfo: {from, to}, realWallet, wallets} = useSelector(state => state.wallet);
  const dispatch = useDispatch();
  const {
    handleSubmit, register, formState: {isValid, errors}, reset
  } = useForm({mode: 'onTouched'});
  const [loading, setLoading] = useState(false);
  const {__} = useTranslation();

  const closePopup = () => {
    dispatch({type: WALLET.HIDE_TRANSFER_POPUP});
    console.log(from, to);
  }

  const flipWallets = () => {
    dispatch({type: WALLET.SHOW_TRANSFER_POPUP, payload: {from: to, to: from}});
  }

  const onSubmit = async (formData) => {
    const {amount} = formData;
    setLoading(true);
    await dispatch(transfer({amount, from, to}));
    setLoading(false);
    reset()
  }

  const walletNames = {
    [WALLET_TYPE.REAL]: __("common.real"), [WALLET_TYPE.REAL_FUTURES]: __("common.real_futures")
  };

  console.log('errors', errors, wallets)

  const getCurrentWallet = (wallet_type) => {
    return wallets.find(wallet => wallet.type === wallet_type)
  }

  return (<Transition in={showTransferPopup} timeout={500} mountOnEnter unmountOnExit>
    <div
      className={`popup ${showTransferPopup ? "active" : ""} transferPopupWrap`}
      onClick={closePopup}
    >
      <div onClick={(e) => e.stopPropagation()} className="popup__content">
        <div className="transderPopup">
          <div className="transderPopup__head">
            <h3 className="transderPopup__title">{__("wallet.transfer")}</h3>
            <button
              onClick={closePopup}
              type="button" className="transderPopup__close">
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.3632 13.6367L12.9087 14.0912C12.6576 14.3423 12.2506 14.3424 11.9995 14.0913L6.77197 8.86375L1.5444 14.0913C1.29341 14.3423 0.88634 14.3423 0.635282 14.0912L0.180758 13.6367C-0.0703005 13.3857 -0.0703013 12.9786 0.180689 12.7276L5.40826 7.50004L0.180716 2.27249C-0.0703357 2.02144 -0.0703221 1.61439 0.180737 1.36333L0.63526 0.908807C0.886319 0.657749 1.29337 0.657735 1.54442 0.908787L6.77197 6.13633L11.9995 0.908774C12.2506 0.657723 12.6576 0.657743 12.9087 0.908802L13.3632 1.36333C13.6143 1.61438 13.6143 2.02143 13.3632 2.27248L8.13567 7.50004L13.3632 12.7276C13.6143 12.9787 13.6142 13.3857 13.3632 13.6367Z"
                  fill="#868686"/>
              </svg>
            </button>
          </div>
          <div className="transderPopup__content">
            <form onSubmit={handleSubmit(onSubmit)} className="transderPopup__form transferForm">
              <div className="transferForm__item">
                <div className="transferInput">
                  <p className="transferInput__label-text">{__("wallet.from")}</p>
                  <p className="transferInput__wallet-name">{walletNames[from]}
                    <span>{getCurrentWallet(from)?.balance + "$" || ''}</span></p>
                </div>
              </div>
              <button className="transferForm__flip" type="button" onClick={flipWallets}>
                <RefreshIcon/>
              </button>
              <div className="transferForm__item">
                <div className="transferInput">
                  <p className="transferInput__label-text">{__("wallet.to")}</p>
                  <p className="transferInput__wallet-name">{walletNames[to]}
                    <span>{getCurrentWallet(to)?.balance || ''}$</span></p>
                </div>
              </div>
              <div className="transferForm__bottom">
                <label className='transferForm__label'>
                  <p className="transferForm__lavel-text">{__("trading.amount")}</p>

                  <div className="transferForm__imount-input-wrap">
                    <input placeholder="1 000" type="number" className="transferForm__amount-input"
                           {...register("amount", {
                             required: true,
                             valueAsNumber: true,
                             min: {value: 0.1, message: __("error.min")},
                             max: {value: realWallet?.balance, message: __("error.max")}
                           })}
                    />
                    <span className="transferForm__imount-currency">USDT</span>
                  </div>

                  {errors.amount && <p className="transferForm__error">{errors.amount.message}</p>}
                </label>

                <div className="transferForm__balance">
                  <p className="transferForm__balance-text">{__('wallet.available_balance')}</p>
                  <span className="transferForm__balance-num">{realWallet?.balance}</span>
                </div>
              </div>

              <div className="confirmWithdrawal__wrap-btns">
                <Button
                  onClick={closePopup}
                  className="confirmWithdrawal__btn"
                  color="grey-border"
                  size="middle"
                >
                  {__("common.cancel")}
                </Button>
                <Button
                  className="confirmWithdrawal__btn"
                  color="orange"
                  size="middle"
                  disabled={!isValid}
                  isLoading={loading}
                  type="submit"
                >
                  {__("common.confirm")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>)
}