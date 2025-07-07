import { Header } from "../Header/";
import { Footer } from "../Footer/";

import "./layout.sass";
import SignUp from "@components/pages/Main/components/SignUp";
import Login from "@components/pages/Main/components/Login";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLoginModal,
  toggleSignUpModal,
} from "@actions/authModalsActions";
import { Link, useLocation } from "react-router-dom";
import RecoverPassword from "@components/pages/Auth/RecoverPassword";
import { LogoIcon } from "@components/library";
import GreyCross from "@assets/images/icons/grey-cross.svg";
import { useTranslation } from "@helpers/translate";

export const Layout = ({ children }) => {
  const { __ } = useTranslation();
  const { activeForm } = useSelector((state) => state.authModals);
  const isOpen = Boolean(activeForm);
  const { isAuth, isDemoUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleSignUpToggle = (isOpen) => {
    dispatch(toggleSignUpModal(isOpen));
  };

  const handleLoginToggle = (isOpen) => {
    dispatch(toggleLoginModal(isOpen));
  };

  useEffect(() => {
    handleSignUpToggle(false);
    handleLoginToggle(false);
  }, [pathname]);

  return (
    <div className={`base-wrap`}>
      <div className="base-wrap__header">
        <Header />
      </div>

      <div className="base-wrap__content">{children}</div>

      <div className="base-wrap__footer">{<Footer />}</div>

      {isOpen && (!isAuth || isDemoUser) && (
        <div className="custom-panel">
          <div
            className="custom-panel__overlay"
            onClick={() => {
              handleSignUpToggle(false);
              handleLoginToggle(false);
            }}
          />
          <div className="custom-panel__content">
            <div className="custom-panel__header">
              <Link className="header__logo" to="/">
                <LogoIcon isLanding />
              </Link>
              <button
                className="custom-panel__close-btn"
                onClick={() => {
                  handleSignUpToggle(false);
                  handleLoginToggle(false);
                }}
              >
                <img src={GreyCross} alt="" />
              </button>
            </div>
            <div className="auth-container">
              {(activeForm === "signup" || activeForm === "login") && (
                <div className="toggle-container">
                  <p
                    onClick={() => handleLoginToggle(true)}
                    className={`toggle-container__option ${
                      activeForm === "login"
                        ? "toggle-container__option--active"
                        : ""
                    }`}
                  >
                    {__("auth.log_in")}
                  </p>
                  <p
                    onClick={() => handleSignUpToggle(true)}
                    className={`toggle-container__option ${
                      activeForm === "signup"
                        ? "toggle-container__option--active"
                        : ""
                    }`}
                  >
                    {__("auth.sign_up")}
                  </p>
                </div>
              )}
              {
                {
                  signup: <SignUp />,
                  login: <Login />,
                  recover: <RecoverPassword />,
                }[activeForm]
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
