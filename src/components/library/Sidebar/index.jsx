import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Theme from "@components/library/Sidebar/components/themeMenu/theme";
import {
  HistoryIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
  ThemeIcon,
  TradingIcon,
  WalletIcon,
} from "@components/library";

import {removeUserSession} from "@helpers/axios/private.axios";
import {useTranslation} from "@helpers/translate";
import {useDispatch, useSelector} from "react-redux";
import {AUTH, AUTH_PAGE, MAIN_PAGE} from "@constants";

import "./sidebar.sass";

const Sidebar = ({open}) => {
  const {isDemoUser} = useSelector((state) => state.auth);
  const [themeOpen, setThemeOpen] = useState(false);
  const {__} = useTranslation();
  const dispatch = useDispatch();

  const logout = () => removeUserSession();
  const openAuthPopup = () => dispatch({type: AUTH.AUTH_CHANGE_POPUP, payload: true});

  const menuItems = [//   {
    //   to: isDemoUser ? AUTH_PAGE : MAIN_PAGE,
    //   icon: <TradingIcon/>,
    //   label: "common.trading",
    //   auth: "both"
    // },
    {
      to: isDemoUser ? AUTH_PAGE : MAIN_PAGE, icon: <TradingIcon/>, label: "common.futures", auth: "both"
    }, {to: "/wallet", icon: <WalletIcon/>, label: "common.wallet", auth: "user"}, {
      to: "/profile", icon: <ProfileIcon/>, label: "common.profile", auth: "user"
    }, {to: "/trading-history", icon: <HistoryIcon/>, label: "common.history", auth: "user"}, {
      to: "/settings", icon: <SettingsIcon/>, label: "common.settings", auth: "user"
    },];

  return (<aside id="navSidebar" className={`sidebar ${open ? "active" : ""}`}>
    <div className="sidebar__wrapper">
      <nav>
        <ul className="sidebar__list">
          {menuItems.map((item, index) => isDemoUser && item.auth === "user" ? (
            <li key={index} className="sidebar__item">
              <button onClick={openAuthPopup} type="button" className="sidebar__nav-link">
                    <span className="sidebar__nav-icon">
                      {item.icon}
                    </span>
                <p className="sidebar__nav-text">{__(item.label)}</p>
              </button>
            </li>) : (<li key={index} className="sidebar__item">
            <NavLink to={item.to} className="sidebar__nav-link">
                    <span className="sidebar__nav-icon">
                      {item.icon}
                    </span>
              <p className="sidebar__nav-text">{__(item.label)}</p>
            </NavLink>
          </li>))}
          <li className="sidebar__item">
            <button onClick={() => setThemeOpen(true)} type="button"
                    className={`sidebar__nav sidebar__nav-link ${themeOpen ? "active" : ""}`}>
                <span className="sidebar__nav-icon">
                  <ThemeIcon/>
                </span>
              <p className="sidebar__nav-text">{__("common.theme")}</p>
            </button>
            <Theme open={themeOpen} setOpen={setThemeOpen}/>
          </li>
          {!isDemoUser && (<li style={{marginTop: "auto"}} className="sidebar__item">
            <button onClick={logout} className="sidebar__nav-link">
                  <span className="sidebar__nav-icon">
                  <LogoutIcon/>
                  </span>
              <p className="sidebar__nav-text">{__("common.logout")}</p>
            </button>
          </li>)}
        </ul>
      </nav>
    </div>
  </aside>);
};

export default Sidebar;
