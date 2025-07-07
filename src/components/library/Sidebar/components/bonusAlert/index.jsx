import React, { useState } from "react";

import "./bonusAlert.sass";
import { CloseIcon, GiftIcon } from "@components/library";

const BonusAlert = ({ className }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {open && (
        <div className={`bonusAlert ${className ? className : ""}`}>
          <div className="bonusAlert__wrapper">
            <picture className="bonusAlert__pic">
              <GiftIcon />
            </picture>
            <div>
              <h5 className="bonusAlert__title">Get 50% bonus</h5>
              <p className="bonusAlert__text">On your first deposit</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="bonusAlert__close"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BonusAlert;
