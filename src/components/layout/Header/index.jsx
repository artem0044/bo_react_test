import React, {useMemo, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Unauthorized from "@components/layout/Header/components/Unauthorized";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Authorized from "@components/layout/Header/components/Authorized";
import TradingPairs from "@components/layout/Header/components/TradingPairs";
import {MAIN_PAGE, TRADING_PAGES} from "@constants";
import {useSelector} from "react-redux";
import {LogoIcon} from "@components/library";
import {ListOfPairs} from "@components/layout/Header/components/ListOfPairs";
import {BrowserView} from "react-device-detect";

import "./header.sass";

export const Header = ({setSidebar}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isTablet = useMediaQuery(theme.breakpoints.up("lg"));
  const location = useLocation();
  const {isAuth, isDemoUser} = useSelector((state) => state.auth);
  const [showPairs, setShowPairs] = useState(false);
  
  const currentPath = location.pathname;

  const isAuthRoute = useMemo(() => currentPath.startsWith("/auth/"), [currentPath]);
  const isMainPage = useMemo(() => currentPath === MAIN_PAGE, [currentPath]);
  const isTradingPage = useMemo(() => TRADING_PAGES.includes(currentPath), [currentPath]);

  const isLandingView = (!isAuth || isDemoUser) && (isMainPage || isAuthRoute);

  return (
    <header
      className={`header${isLandingView ? ' header--fixed' : ''}`}>
      <div className="header__wrapper">
        {isDesktop ||
        ((!isAuth || (isAuth && isDemoUser && isDesktop)) && !isDesktop) ? (
          <div className="header__left">
            <>
              <Link className="header__logo" to="/">
                <LogoIcon isLanding={isLandingView}/>
              </Link>

              {isAuth && isDemoUser && (isMainPage || isAuthRoute) ? (
                <></>
              ) : isAuth && isTradingPage ? (
                <>
                  <TradingPairs showPairs={showPairs} setShowPairs={setShowPairs} />

                  {isTablet && (
                    <BrowserView>
                      <ListOfPairs setShowPairs={setShowPairs}/>
                    </BrowserView>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          </div>
        ) : (
          <></>
        )}
        {isAuth && isDemoUser && (isMainPage || isAuthRoute) ? (
          <Unauthorized/>
        ) : isAuth ? (
          <Authorized setSidebar={setSidebar} showPair={showPairs} setShowPairs={setShowPairs}/>
        ) : (
          <Unauthorized/>
        )}
      </div>
    </header>
  );
};
