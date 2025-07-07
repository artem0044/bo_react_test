import React from "react";
import { Link } from "react-router-dom";
import { Button, DollarIcon } from "@components/library";
import { useTranslation } from "@helpers/translate";

import "./index.sass";

const Gift = ({ setPopup }) => {
  const { __ } = useTranslation();

  return (
    <div className="gift-popup">
      <div className="gift-popup__pic">
        <DollarIcon />
      </div>
      <h2 className="gift-popup__title">{__("trading.gift")}</h2>
      <p className="gift-popup__text">{__("trading.gift_text")}</p>
      <Button
        type="button"
        className="gift-popup__btn"
        size="middle"
        color="orange"
        onClick={() => setPopup(false)}
      >
        {__("trading.trade_now")}
      </Button>
      <Link to="/wallet/deposit" className="gift-popup__link">
        {__("trading.skip_btn")}
      </Link>
    </div>
  );
};

export default Gift;
