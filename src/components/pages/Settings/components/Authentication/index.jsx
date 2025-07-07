import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel, Grid } from "@mui/material";
import Tick from "@assets/images/icons/shield-tick.png";
import GoogleAuthentication from "./GoogleAuthentication";
import SmsAuthentication from "./SmsAuthentication";
import { useSelector } from "react-redux";
import { Button } from "@components/library";
import { useTranslation } from "@helpers/translate";
import "./index.sass";
import EmailAuthentication from "@components/pages/Settings/components/Authentication/EmailAuthentication";
import { Helmet } from "react-helmet";

const Authentication = () => {
  const { app_2fa_type = "email" } = useSelector((state) => state.user.user);
  const [selectedOption, setSelectedOption] = useState(app_2fa_type || "email");
  const [showWarning, setShowWarning] = useState(true);
  const { __ } = useTranslation();

  const getAuthenticationText = () => {
    switch (app_2fa_type) {
      case "app":
        return __("settings.google_auth");

      case "email":
        return __("settings.email_auth");

      case "sms":
        return __("settings.sms_auth");

      default:
        return __("settings.email_auth");
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {__("seo.two_factor_auth")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>

      {showWarning ? (
        <>
          <div className="authentication settings">
            <header className="settings__header">
              <h1 className="settings__title">{__("settings.2fa")}</h1>
              <p className="settings__text">{__("settings.2fa_text")}</p>
              <p className="settings__text">
                {__("settings.currently_using")} {__("settings.2fa_text2")}{" "}
                <b>{getAuthenticationText()}</b>
              </p>
              <p className="settings__text">{__("settings.2fa_text3")}</p>
            </header>

            <Button
              type="button"
              className="authentication__btn"
              color="orange"
              size="middle"
              onClick={() => setShowWarning(false)}
            >
              {__("settings.change")}
            </Button>
          </div>
        </>
      ) : (
        <div className="authentication settings">
          <header className="settings__header">
            <h1 className="settings__title">{__("settings.2fa")}</h1>
            <p className="settings__text">{__("settings.2fa_text")}</p>
          </header>

          <div className="authentication__list choose-authentication">
            <RadioGroup
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label={__("settings.email_auth")}
                className="bo-radio"
              />
              {/*<FormControlLabel*/}
              {/*  value="sms"*/}
              {/*  control={<Radio />}*/}
              {/*  label={__("settings.sms_auth")}*/}
              {/*  className="bo-radio"*/}
              {/*/>*/}
              <FormControlLabel
                value="app"
                control={<Radio />}
                label={__("settings.google_auth")}
                className="bo-radio"
              />
            </RadioGroup>
          </div>

          <div className="authentication__howItWorks howItWorks">
            <h3 className="howItWorks__title"></h3>

            <Grid container spacing="1rem">
              <Grid item b680={6} xs={12}>
                <div className="howItWorks-card">
                  <picture className="howItWorks-card__icon">
                    <img src={Tick} alt="" />
                  </picture>
                  <div className="howItWorks-card__info">
                    <h4 className="howItWorks-card__title">
                      {__("settings.extra_protection")}
                    </h4>
                    <p className="howItWorks-card__text">
                      {__("settings.extra_protection_text")}
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item b680={6} xs={12}>
                <div className="howItWorks-card">
                  <picture className="howItWorks-card__icon">
                    <img src={Tick} alt="" />
                  </picture>
                  <div className="howItWorks-card__info">
                    <h4 className="howItWorks-card__title">
                      {__("settings.through_sms")}
                    </h4>
                    <p className="howItWorks-card__text">
                      {__("settings.through_sms_text")}
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          {selectedOption === "sms" && (
            <SmsAuthentication setShowWarning={setShowWarning} />
          )}
          {selectedOption === "app" && (
            <GoogleAuthentication setShowWarning={setShowWarning} />
          )}
          {selectedOption === "email" && (
            <EmailAuthentication setShowWarning={setShowWarning} />
          )}
        </div>
      )}
    </>
  );
};

export default Authentication;
