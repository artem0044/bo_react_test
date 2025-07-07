import React, { useState } from "react";
import { updateUser } from "@actions/user";
import { useDispatch } from "react-redux";
import { Button } from "@components/library";
import { useTranslation } from "@helpers/translate";

const EmailAuthentication = ({ setShowWarning }) => {
  const dispatch = useDispatch();
  const { __ } = useTranslation();
  const [loading, setLoading] = useState(false);

  const changeOnEmail = (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      app_2fa_type: "",
      app_2fa_code: "",
    };
    dispatch(updateUser({ data }))
      .then(() => {
        setShowWarning(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={changeOnEmail}>
      <Button
        type="submit"
        className="g-authentication__btn"
        color="orange"
        size="middle"
        isLoading={loading}
      >
        {__("settings.enable_2fa")}
      </Button>
    </form>
  );
};

export default EmailAuthentication;
