import React, {useState} from "react";
import Sidebar from "@components/library/Sidebar";
import {Outlet, useLocation} from "react-router-dom";
import MobileSidebar from "@components/library/Sidebar/MobileSidebar";
import {Header} from "@components/layout/Header";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Footer} from "@components/layout/Footer";
import UserData from "@helpers/userData";
import {useSelector} from "react-redux";
import {PreviewLoader, TransferPopup} from "@components/library";
import {ConnectionToSockets} from "@components/common/ConnectionToSockets";
import {NO_FOOTER_PAGES} from "@constants";

const LayoutWithAside = () => {
  const theme = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const {loading} = useSelector((state) => state.user);

  return (
    <>
      <UserData/>

      {loading ? (
        <PreviewLoader loading={loading}/>
      ) : (
        <>
          <ConnectionToSockets/>
          <div className={`base-wrap`}>
            <div className="base-wrap__header">
              <Header setSidebar={setSidebarOpen}/>
            </div>

            <div className="base-wrap__content">
              <main className="main-content">
                {isDesktop ? (
                  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
                ) : (
                  <MobileSidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
                )}
                <div className="main-content__wrapper">
                  <Outlet/>
                </div>
              </main>
            </div>

            {!NO_FOOTER_PAGES.includes(location.pathname) && (
              <div className="base-wrap__footer">{<Footer/>}</div>
            )}
          </div>

          <TransferPopup/>
        </>
      )}
    </>
  );
};

export default LayoutWithAside;
