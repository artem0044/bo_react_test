import React, { useEffect, useMemo, useState } from "react";
import Global from "@assets/images/icons/global.svg";
import BurgerButton from "@assets/images/burger-button.png";
import SelectedIcon from "@assets/images/icons/orange-select.svg";
import GB from "@assets/images/icons/gb.svg";
import RU from "@assets/images/icons/ru.svg";
import ES from "@assets/images/icons/es.svg";
import { Menu, MenuItem } from "@mui/material";
import Fade from "@mui/material/Fade";

import "../header.sass";
import { Button } from "@components/library";
import { useDispatch } from "react-redux";
import { LOCALE } from "@constants";
import { useTranslation } from "@helpers/translate";
import config from "../../../../config";
import {
  toggleLoginModal,
  toggleSignUpModal,
} from "@actions/authModalsActions";
import { useLocation } from "react-router-dom";
import AuthMainPopup from "@components/library/popups/AuthMainPopup/AuthMainPopup";
import { useSelector } from "react-redux";

const Unauthorized = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const currentLocale = useSelector((state) => state.localization.locale);
  const open = Boolean(anchorEl);
  const { __ } = useTranslation();
  const location = useLocation();
  const currentPath = location.pathname;
  const isAuthRoute = useMemo(
    () => currentPath.startsWith("/auth/"),
    [currentPath]
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setAnchorEl(null);
    const { myValue } = event.currentTarget.dataset;
    dispatch({ type: LOCALE.CHANGE_LOCALE, payload: myValue });
  };

  const handleSignUpToggle = (isOpen) => {
    dispatch(toggleSignUpModal(isOpen));
  };

  const handleLoginToggle = (isOpen) => {
    dispatch(toggleLoginModal(isOpen));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 428 && isAuthPopupOpen) {
        setAuthPopupOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isAuthPopupOpen]);

  return (
    <div className="header__right">
      <nav>
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <div>
              <button
                onClick={handleClick}
                type="button"
                className="header__mini-btn"
              >
                <img src={Global} alt="lang" />
              </button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                className="mini-select"
              >
                {config.supported_locales.includes("en") && (
                  <MenuItem data-my-value="en" onClick={handleChange}>
                    <div className="header__change-btn">
                      <p
                        className={`header__change-btn-text ${
                          currentLocale === "en"
                            ? "header__change-btn-text--selected"
                            : ""
                        }`}
                      >
                        English
                      </p>
                      {currentLocale === "en" && (
                        <img src={SelectedIcon} alt="" />
                      )}
                    </div>
                  </MenuItem>
                )}
                {config.supported_locales.includes("uk") && (
                  <MenuItem data-my-value="uk" onClick={handleChange}>
                    <div className="header__change-btn">
                      <p
                        className={`header__change-btn-text ${
                          currentLocale === "uk"
                            ? "header__change-btn-text--selected"
                            : ""
                        }`}
                      >
                        Русский
                      </p>
                      {currentLocale === "uk" && (
                        <img src={SelectedIcon} alt="" />
                      )}
                    </div>
                  </MenuItem>
                )}
                {config.supported_locales.includes("ru") && (
                  <MenuItem data-my-value="ru" onClick={handleChange}>
                    <div className="header__change-btn">
                      <p
                        className={`header__change-btn-text ${
                          currentLocale === "ru"
                            ? "header__change-btn-text--selected"
                            : ""
                        }`}
                      >
                        Русский
                      </p>
                      {currentLocale === "ru" && (
                        <img src={SelectedIcon} alt="" />
                      )}
                    </div>
                  </MenuItem>
                )}
                {config.supported_locales.includes("es") && (
                  <MenuItem data-my-value="es" onClick={handleChange}>
                    <div className="header__change-btn">
                      <p
                        className={`header__change-btn-text ${
                          currentLocale === "es"
                            ? "header__change-btn-text--selected"
                            : ""
                        }`}
                      >
                        Español
                      </p>
                      {currentLocale === "es" && (
                        <img src={SelectedIcon} alt="" />
                      )}
                    </div>
                  </MenuItem>
                )}
              </Menu>
            </div>
          </li>
          <li className="header__nav-item">
            <Button
              type={!isAuthRoute ? "button" : "link"}
              className="header__login header__btn"
              color="grey-light"
              size="mini"
              {...(!isAuthRoute
                ? { onClick: () => handleLoginToggle(true) }
                : { to: "/auth/login" })}
            >
              {__("login.button.title")}
            </Button>
          </li>
          <li className="header__nav-item">
            <Button
              type={!isAuthRoute ? "button" : "link"}
              className="header__signUp header__btn"
              color="orange"
              size="mini"
              {...(!isAuthRoute
                ? { onClick: () => handleSignUpToggle(true) }
                : { to: "/auth/signup" })}
            >
              {__("auth.sign_up")}
            </Button>
          </li>
          <li className="header__nav-item">
            <img
              src={BurgerButton}
              className="header__burger-btn"
              onClick={() => setAuthPopupOpen(true)}
            />
          </li>
        </ul>
      </nav>
      <AuthMainPopup
        active={isAuthPopupOpen}
        setActive={setAuthPopupOpen}
        handleSignUpToggle={handleSignUpToggle}
        handleLoginToggle={handleLoginToggle}
        isAuthRoute={isAuthRoute}
      />
    </div>
  );
};

export default Unauthorized;
