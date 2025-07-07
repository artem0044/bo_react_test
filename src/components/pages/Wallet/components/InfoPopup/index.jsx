import React from "react";
import { Transition } from "react-transition-group";
import { FailedIcon, CheckSuccessIcon } from "@components/library";
import { Button } from "@components/library";
import { WALLET } from "../../../../../constants";
import { useDispatch, useSelector } from "react-redux";

import "./index.sass";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@helpers/translate";
import { FormattedNumber } from "react-intl";

const InfoPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { __ } = useTranslation();
  const { showPopup, popupInfo } = useSelector((state) => state.wallet);

  return (
    <Transition in={showPopup} timeout={500} mountOnEnter unmountOnExit>
      <div
        className={`popup confirmWithdrawal-popup ${showPopup ? "active" : ""}`}
        onClick={() => dispatch({ type: WALLET.HIDE_POPUP })}
      >
        <div onClick={(e) => e.stopPropagation()} className="popup__content">
          <div className="successfulWithdrawal">
            <div className="successfulWithdrawal__pic">
              {popupInfo.status === 2 ? <CheckSuccessIcon /> : <FailedIcon />}
            </div>
            <h2 className="successfulWithdrawal__title">
              {popupInfo.status === 2
                ? __("common.successful")
                : __("common.failed")}
            </h2>
            <p className="successfulWithdrawal__text">
              {popupInfo.status === 2 ? (
                <>
                  {`${__("wallet.deposit_popup1")} `}
                  <FormattedNumber
                    value={popupInfo.amount}
                    style="currency"
                    currency="USD"
                  />
                  {` ${__("wallet.deposit_popup2")}`}
                </>
              ) : (
                <>
                  {`${__("wallet.deposit_popup1")} `}
                  <FormattedNumber
                    value={popupInfo.amount}
                    style="currency"
                    currency="USD"
                  />
                  {` ${__("wallet.deposit_popup3")}`}
                </>
              )}
            </p>
            <Button
              className="successfulWithdrawal__btn"
              size="middle"
              type="button"
              color="orange"
              onClick={() => {
                navigate("/wallet");
                dispatch({ type: WALLET.HIDE_POPUP });
              }}
            >
              {__("wallet.back")}
            </Button>
          </div>
          <button
            onClick={() => dispatch({ type: WALLET.HIDE_POPUP })}
            type="button"
            className="popup__close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L20.5303 19.4697C20.8232 19.7626 20.8232 20.2374 20.5303 20.5303C20.2374 20.8232 19.7626 20.8232 19.4697 20.5303L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.5303 3.46967C20.8232 3.76256 20.8232 4.23744 20.5303 4.53033L4.53033 20.5303C4.23744 20.8232 3.76256 20.8232 3.46967 20.5303C3.17678 20.2374 3.17678 19.7626 3.46967 19.4697L19.4697 3.46967C19.7626 3.17678 20.2374 3.17678 20.5303 3.46967Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  );
};
export default InfoPopup;
