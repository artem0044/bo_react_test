import React, {useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import SettingsMenu from "@components/library/Sidebar/components/themeMenu";
import Mode from "@components/layout/Header/components/Mode";
import {
  HistoryIcon,
  LogoIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
  ThemeIcon,
  TradingIcon,
  WalletIcon,
} from "@components/library";
import {useDispatch, useSelector} from "react-redux";
import {removeUserSession} from "@helpers/axios/private.axios";
import {useTranslation} from "@helpers/translate";
import {AUTH, MAIN_PAGE} from "@constants";

const MobileSidebar = ({open, setOpen}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const {full_name = "", email} = useSelector((state) => state.user.user);
  const {isDemoUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {__} = useTranslation();

  const logout = () => {
    navigate("/");
    removeUserSession();
  };

  const openAuthPopup = () => {
    dispatch({type: AUTH.AUTH_CHANGE_POPUP, payload: true});
  };

  const menuItems = [
    // {to: isDemoUser ? AUTH_PAGE : MAIN_PAGE, icon: <TradingIcon/>, text: "common.trading", authRequired: false},
    {to: MAIN_PAGE, icon: <TradingIcon/>, text: "common.futures", authRequired: true},
    {to: "/wallet", icon: <WalletIcon/>, text: "common.wallet", authRequired: true},
    {to: "/profile", icon: <ProfileIcon/>, text: "common.profile", authRequired: true},
    {to: "/trading-history", icon: <HistoryIcon/>, text: "common.history", authRequired: true},
    {to: "/settings", icon: <SettingsIcon/>, text: "common.settings", authRequired: true},
  ];

  return (
    <aside onClick={() => setOpen(false)} className={`mobile-sidebar ${open ? "active" : ""}`}>
      <div onClick={(e) => e.stopPropagation()} className="mobile-sidebar__wrapper">
        <Link className="mobile-sidebar__logo" to={MAIN_PAGE}>
          <LogoIcon/>
        </Link>
        <header className="mobile-sidebar__header">
          {full_name && <h3 className="mobile-sidebar__name">{full_name}</h3>}
          {email && <p className="mobile-sidebar__email">{email}</p>}
          <ul className="mobile-sidebar__info-list">
            <li className="mobile-sidebar__info-item">
              <Mode/>
            </li>
          </ul>
        </header>

        <nav>
          <ul className="mobile-sidebar__list">
            {menuItems.map(({to, icon, text, authRequired}, index) => (
              isDemoUser && authRequired ? (
                <li key={index} className="mobile-sidebar__item">
                  <button type="button" onClick={openAuthPopup} className="mobile-sidebar__nav-link">
                    <span className="mobile-sidebar__nav-icon">
                      {icon}
                    </span>
                    <p className="mobile-sidebar__nav-text">{__(text)}</p>
                  </button>
                </li>
              ) : (
                <li key={index} className="mobile-sidebar__item">
                  <NavLink onClick={() => setOpen(false)} to={to} className="mobile-sidebar__nav-link">
                    <span className="mobile-sidebar__nav-icon">
                      {icon}
                    </span>
                    <p className="mobile-sidebar__nav-text">{__(text)}</p>
                  </NavLink>
                </li>
              )
            ))}
            <li className="mobile-sidebar__item">
              <button onClick={() => setSettingsOpen(!settingsOpen)} type="button" className="mobile-sidebar__nav-link">
                <ThemeIcon className="mobile-sidebar__nav-icon"/>
                <p className="mobile-sidebar__nav-text">{__("common.theme")}</p>
              </button>
              {settingsOpen && <SettingsMenu/>}
            </li>
            {!isDemoUser && (
              <li className="mobile-sidebar__item">
                <button onClick={logout} type="button" className="mobile-sidebar__nav-link">
                  <LogoutIcon className="mobile-sidebar__nav-icon"/>
                  <p className="mobile-sidebar__nav-text">{__("common.logout")}</p>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MobileSidebar;
