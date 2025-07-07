import React from "react";
import { Button } from "@components/library";
import { PROFILE_PAGE } from "@constants";
import { useTranslation } from "@helpers/translate";

export const UnverifiedUser = () => {
  const { __ } = useTranslation();

  return (
    <>
      <div className="tab-warning">
        <header className="tab-warning__header">
          <h1 className="tab-warning__title">{__("common.warning")}</h1>
          <p className="tab-warning__text">{__("wallet.warningUnverified")}</p>
        </header>

        <Button
          type="link"
          to={PROFILE_PAGE}
          className="tab-warning__btn"
          color="orange"
          size="middle"
        >
          {__("profile.start_verification")}
        </Button>
      </div>
    </>
  );
};

export default UnverifiedUser;
