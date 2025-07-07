import React, {useState} from "react";
import {Button} from "@components/library";
import './index.sass';
import Slider from "@mui/material/Slider";
import {useTranslation} from "@helpers/translate";

const marks = [{
  value: 0, label: '0x',
}, {
  value: 25, label: '25x',
}, {
  value: 50, label: '50x',
}, {
  value: 75, label: '75x',
}, {
  value: 100, label: '100x',
},];

const maxLeverage = 100;

export const AdiustLeveragePopup = ({show, setShow, leverage, setLeverage}) => {
  const [newLeverage, setNewLeverage] = useState(leverage);
  const {__} = useTranslation();
  const closePopup = () => {
    setShow(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLeverage(newLeverage);
    setShow(false);
  };

  const decLeverage = () => {
    handleLeverageChange(newLeverage - 1);
  }

  const incLeverage = () => {
    handleLeverageChange(newLeverage + 1);
  }

  const handleLeverageChange = (value) => {
    const newLeverage = Math.min(maxLeverage, Math.max(1, value));
    setNewLeverage(newLeverage);
  }

  return (<div
    className={`popup ${show ? "active" : ""} transferPopupWrap`}
    onClick={closePopup}
  >
    <div onClick={(e) => e.stopPropagation()} className="popup__content">
      <div className="adiustLeveragePopup">
        <div className="adiustLeveragePopup__head">
          <h3 className="adiustLeveragePopup__title">{__("futures.adiust_leverage")}</h3>
          <button
            onClick={closePopup}
            type="button" className="adiustLeveragePopup__close">
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3632 13.6367L12.9087 14.0912C12.6576 14.3423 12.2506 14.3424 11.9995 14.0913L6.77197 8.86375L1.5444 14.0913C1.29341 14.3423 0.88634 14.3423 0.635282 14.0912L0.180758 13.6367C-0.0703005 13.3857 -0.0703013 12.9786 0.180689 12.7276L5.40826 7.50004L0.180716 2.27249C-0.0703357 2.02144 -0.0703221 1.61439 0.180737 1.36333L0.63526 0.908807C0.886319 0.657749 1.29337 0.657735 1.54442 0.908787L6.77197 6.13633L11.9995 0.908774C12.2506 0.657723 12.6576 0.657743 12.9087 0.908802L13.3632 1.36333C13.6143 1.61438 13.6143 2.02143 13.3632 2.27248L8.13567 7.50004L13.3632 12.7276C13.6143 12.9787 13.6142 13.3857 13.3632 13.6367Z"
                fill="#868686"/>
            </svg>
          </button>
        </div>
        <div className="adiustLeveragePopup__content">
          <form onSubmit={onSubmit} className="adiustLeveragePopup__form adiustLeverageForm">
            <div className="adiustLeverageForm__item">
              <p className="adiustLeverageForm__label-text">{__("futures.leverage")}</p>

              <div className="adiustLeverageForm__counter">
                <button onClick={decLeverage} type="button" className="adiustLeverageForm__counter-btn">
                  <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 2.60294H0.5V0.852936H14.5V2.60294Z" fill="white"/>
                  </svg>
                </button>
                <label className="adiustLeverageForm__counter-wrap">
                  <input value={newLeverage} onChange={(e) => handleLeverageChange(e.target.value)} type="number" step={1}
                         min={1} max={maxLeverage} className="adiustLeverageForm__counter-input"/>
                  <span className="adiustLeverageForm__counter-suffix">x</span>
                </label>
                <button onClick={incLeverage} type="button" className="adiustLeverageForm__counter-btn">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.51768 8.74562V14.7279H6.48232V8.74562H0.5V6.71025H6.48232V0.727936H8.51768V6.71025H14.5V8.74562H8.51768Z"
                      fill="white"/>
                  </svg>
                </button>
              </div>
              <Slider
                className="custom-range"
                aria-label="leverage"
                value={newLeverage}
                onChange={(e, val) => handleLeverageChange(val)}
                marks={marks}
                step={1}
                min={0}
                max={maxLeverage}
              />
            </div>
            <p className="adiustLeverageForm__error">{__("futures.leverage_warn")}</p>
            <div className="adiustLeverageForm__wrap-btns">
              <Button
                className="adiustLeverageForm__btn"
                color="orange"
                size="middle"
                type="submit"
              >
                {__("common.confirm")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>)
}