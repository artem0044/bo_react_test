import React, { useState, useEffect } from "react";
import { Trading } from "@components/pages";
import Popup from "@components/library/UI/Popup";
import Welcome from "@components/pages/Trading/components/Welcome";
import { useLocation } from "react-router-dom";
import AuthPopup from "./AuthPopup/index";
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "@constants";
import { Helmet } from "react-helmet";
import { useTranslation } from "@helpers/translate";

export const TryDemo = () => {
  const location = useLocation();
  const [welcomeActive, setWelcomeActive] = useState(false);
  const { isAuthPopupOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { __ } = useTranslation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setWelcomeActive(Boolean(queryParams.get("try-demo")));
  }, []);

  const setAuthPopup = (value) => {
    dispatch({ type: AUTH.AUTH_CHANGE_POPUP, payload: value });
  };

  return (
    <>
      <Helmet>
        <title>
          {__("seo.main_title")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <Trading />
      <Popup active={welcomeActive} setActive={setWelcomeActive}>
        <Welcome setPopup={setWelcomeActive} />
      </Popup>
      <Popup active={isAuthPopupOpen} setActive={setAuthPopup}>
        <AuthPopup setPopup={setAuthPopup} />
      </Popup>
    </>
  );
};

export default TryDemo;
