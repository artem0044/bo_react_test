import React from "react";
import User from "@assets/images/icons/user.svg";
import Mode from "@components/layout/Header/components/Mode";
import MobileAuthHeader from "@components/layout/Header/components/MobileAuthHeader";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "@helpers/translate";
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "@constants";
import { Link } from "react-router-dom";
import { Button } from "@components/library";

const Authorized = ({ setSidebar, showPair, setShowPairs }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { __ } = useTranslation();
  const { isDemoUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!isDesktop)
    return (
      <MobileAuthHeader
        setSidebar={setSidebar}
        showPair={showPair}
        setShowPairs={setShowPairs}
      />
    );

  const openAuthPopup = () => {
    dispatch({ type: AUTH.AUTH_CHANGE_POPUP, payload: true });
  };

  return (
    <div className="header__right">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          {isDemoUser ? (
            <button
              onClick={openAuthPopup}
              type="button"
              className="header__mini-btn"
            >
              <img src={User} alt="lang" />
            </button>
          ) : (
            <Link to="/profile" className="header__mini-btn">
              <img src={User} alt="lang" />
            </Link>
          )}
        </li>
        <li className="header__nav-item">
          {isDemoUser ? (
            <Button
              type="button"
              onClick={openAuthPopup}
              className="header__deposit"
              color="orange"
              size="mini"
            >
              {__("common.deposit")}
            </Button>
          ) : (
            <Button
              type="link"
              className="header__deposit"
              to="/wallet/deposit"
              color="orange"
              size="mini"
            >
              {__("common.deposit")}
            </Button>
          )}
        </li>
        <li className="header__nav-item">
          <Mode />
        </li>
      </ul>
    </div>
  );
};

export default Authorized;
