import './AuthMainPopup.sass';

import React, { useMemo } from "react";

import Popup from "@components/library/UI/Popup";
import { useTranslation } from "@helpers/translate";
import { toggleLoginModal, toggleSignUpModal } from '@actions/authModalsActions';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from "@components/library";

const AuthMainPopup = ({
  active,
  setActive,
  handleSignUpToggle,
  handleLoginToggle,
  isAuthRoute,
}) => {
  const { __ } = useTranslation();

  return (
    <Popup
      active={active}
      setActive={setActive}
      showCloseButton={false}
      className="auth-main-popup"
    >
      <Button
        type={!isAuthRoute ? "button" : "link"}
        className="auth-main-popup__btn"
        color="grey-light"
        size="mini"
        {...(!isAuthRoute
          ? { onClick: () => handleLoginToggle(true) }
          : { to: "/auth/login" })}
      >
        {__("login.button.title")}
      </Button>
      <Button
        type={!isAuthRoute ? "button" : "link"}
        className="auth-main-popup__signup auth-main-popup__btn"
        color="orange"
        size="mini"
        {...(!isAuthRoute
          ? { onClick: () => handleSignUpToggle(true) }
          : { to: "/auth/signup" })}
      >
        {__("auth.sign_up")}
      </Button>
    </Popup>
  );
};

export default AuthMainPopup;
