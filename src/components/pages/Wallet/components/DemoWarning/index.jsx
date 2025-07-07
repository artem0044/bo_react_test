import React from "react";
import { Button } from "@components/library";
import { useDispatch, useSelector } from "react-redux";
import { changeWallet } from "@actions";
import { useTranslation } from "@helpers/translate";

export const DemoWarning = () => {
  const { __ } = useTranslation();
  const {
    wallet: { wallets },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeWalletAction = () => {
    const wallet = wallets.find((item) => item.type === "real");
    dispatch(changeWallet(wallet));
  };

  return (
    <>
      <div className="tab-warning">
        <header className="tab-warning__header">
          <h1 className="tab-warning__title">{__("common.warning")}</h1>
          <p className="tab-warning__text">{__("wallet.warningDemo")}</p>
        </header>

        <Button
          type="button"
          className="tab-warning__btn"
          color="orange"
          size="middle"
          onClick={changeWalletAction}
        >
          {__("common.confirm")}
        </Button>
      </div>
    </>
  );
};

export default DemoWarning;
