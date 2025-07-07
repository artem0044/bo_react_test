import React from "react";
import { Button } from "@components/library";
import Updated from "@assets/images/icons/shield-tick.svg";
import { useTranslation } from "@helpers/translate";

export const UpdatedPassword = () => {
  const { __ } = useTranslation();

  return (
    <div className="completed">
      <picture className="completed__icon">
        <img src={Updated} alt="shield tick" />
      </picture>

      <h1 className="completed__title">{__("auth.updated_pass")}</h1>

      <p className="completed__text">
        {__("auth.updated_pass_t1")} <br />
        {__("auth.updated_pass_t2")}
      </p>

      <Button
        className="completed__btn"
        to="/auth/login"
        size="middle"
        type="link"
        color="orange"
      >
        {__("auth.log_in")}
      </Button>
    </div>
  );
};

export default UpdatedPassword;
