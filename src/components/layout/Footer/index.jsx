import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import config from "../../../config";

import "./footer.sass";
import { useTranslation } from "@helpers/translate";
import Logo from "@assets/images/footer-logo.png";
import BgFooter from "@assets/images/bg/bg-footer.png";
import React, { useMemo } from "react";
import { MAIN_PAGE } from "../../../constants";

export const Footer = () => {
  const { __ } = useTranslation();
  const location = useLocation();

  const currentPath = location.pathname;

  const isAuthRoute = useMemo(
    () => currentPath.startsWith("/auth/"),
    [currentPath]
  );
  const isMainPage = useMemo(() => currentPath === MAIN_PAGE, [currentPath]);

  return (
    <div className={`${isAuthRoute || isMainPage ? "footer--main" : ""}`}>
      {/* {isAuthRoute ||
        (isMainPage && (
          <img src={Logo} alt="background" className="footer__bg-image" />
        ))} */}
      <footer
      className={`footer${
        isAuthRoute || isMainPage ? " footer--main" : ""
      }`}
      >
        <img src={BgFooter} className="footer__bg-image" />
        <div className="wrapper">
          <div className="footer__top">
            <Link to={"/"} className="footer__logo">
              <img src={Logo} alt="logo" />
            </Link>
            <div className="footer__text-wrap">
              <p className="footer__text">
                {__("seo.title")} © {moment().year()}. {__("main.footer.t1")}
              </p>
              <p className="footer__text">
                {__("main.footer.t2")}:{" "}
                <a href={`mailto:${config.infoEmail}`}>{config.infoEmail}</a>
              </p>
              <p className="footer__text">
                {__("main.footer.t3")}:{" "}
                <a href={`mailto:${config.supportEmail}`}>
                  {config.supportEmail}
                </a>
              </p>
            </div>
          </div>
          <nav className="footer__nav">
            <ul className="footer__list">
              <li className="footer__item">
                <Link to="/page/privacy-policy" className="footer__link">
                  {__("main.privacy_policy")}
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/page/terms-and-conditions" className="footer__link">
                  {__("main.terms_of_use")}
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/page/aml-policy" className="footer__link">
                  {__("main.aml_policy")}
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/page/cookie-policy" className="footer__link">
                  {__("main.cookie_policy")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};
