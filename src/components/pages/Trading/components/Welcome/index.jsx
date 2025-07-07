import React from "react";
import { ArrowRight } from "@components/library";
import { AUTH_PAGE } from "@constants";
import { useTranslation } from "@helpers/translate";
import { Link } from "react-router-dom";

import "./index.sass";

const Welcome = ({ setPopup }) => {
  const { __ } = useTranslation();
  const chooseAccount = () => {
    setPopup(false);
  };

  return (
    <div className="welcome">
      <h2 className="welcome__title">{__("trading.welcome")}</h2>

      <ul className="welcome__list">
        <li className="welcome__item">
          <button
            onClick={() => chooseAccount()}
            type="button"
            className="welcome-btn"
          >
            <h3 className="welcome-btn__title">{__("common.demo")}</h3>
            <p className="welcome-btn__text">{__("main.why.i-3_text")}</p>
            <div type="button" className="welcome-btn__btn-arrow">
              {__("trading.demo_trading")}
              <ArrowRight />
            </div>
          </button>
        </li>
        <li className="welcome__item">
          <Link to={AUTH_PAGE} className="welcome-btn">
            <h3 className="welcome-btn__title">{__("common.deposit")}</h3>
            <p className="welcome-btn__text">{__("trading.welcome_deposit")}</p>
            <div type="button" className="welcome-btn__btn-arrow">
              {__("trading.welcome_deposit_now")}
              <ArrowRight />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Welcome;
