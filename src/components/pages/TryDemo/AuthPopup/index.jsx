import React from "react";
import "./index.sass";
import { Button } from "@components/library";
import { useTranslation } from "@helpers/translate";
import { Grid } from "@mui/material";
import { AUTH_PAGE, AUTH_SIGN_UP } from "@constants";

export const AuthPopup = ({ setPopup }) => {
  const { __ } = useTranslation();

  return (
    <div className="auth-popup">
      <h2 className="auth-popup__title">{__("trading.for_register")}</h2>
      <div className="auth-popup__btns">
        <Grid spacing="1rem" container>
          <Grid item b680={6} xs={12}>
            <Button
              to={AUTH_SIGN_UP}
              className="auth-popup__btn"
              color="orange"
              size="mini"
              type="link"
            >
              {__("auth.sign_up")}
            </Button>
          </Grid>
          <Grid item b680={6} xs={12}>
            <Button
              to={AUTH_PAGE}
              className="auth-popup__btn"
              color="border"
              size="mini"
              type="link"
            >
              {__("login.button.title")}
            </Button>
          </Grid>
        </Grid>
      </div>

      <button
        onClick={() => setPopup(false)}
        className="auth-popup__continue"
        type="button"
      >
        {__("trading.continue_demo")}
      </button>
    </div>
  );
};

export default AuthPopup;
