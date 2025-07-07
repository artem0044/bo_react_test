import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import {
  AffiliateLink,
  Auth,
  CreatePassword,
  Deposit,
  Futures,
  History,
  InfoPage,
  Login,
  Main,
  MyProfile,
  RecoverPassword,
  Settings,
  SignUpHash,
  SingUp,
  TransactionHistory,
  TryDemo,
  UpdatedPassword,
  Withdrawal,
} from "@components/pages";

import {NotFound} from "@components/pages/NotFound";
import ScrollToTop from "@components/common/ScrollToTop";
import MyAlert from "../library/UI/Alert";
import LayoutWithAside from "@components/layout/Layout/LayoutWithAside";
import {MAIN_PAGE, NAVIGATE_TO_EMAIL, PROFILE_PAGE, TRY_DEMO,} from "@constants";
import {saveParamToCookie} from "@helpers";
import {Layout} from "@components/layout/Layout";
import {AUTH_PAGE} from "../../constants";
import config from "../../config";
import {FUTURES_PAGE} from "../../constants/routes";

export const AuthWrapper = () => {
  const {isAuth, isDemoUser} = useSelector((state) => state.auth);
  const test = useSelector((state) => state.auth);
  const {theme: colorTheme} = useSelector((state) => state.theme);
  const [currentThemeClass, setCurrentThemeClass] = useState(colorTheme);

  useEffect(() => {
    console.log(isAuth, isDemoUser, test, colorTheme, config.default_theme);

    if (isAuth || colorTheme === config.default_theme) {
      document.body.classList?.remove(currentThemeClass);
      document.body.classList.add(colorTheme);
      setCurrentThemeClass(colorTheme);
    } else {
      document.body.classList?.remove(currentThemeClass);
    }
  }, [colorTheme, isAuth]);

  useEffect(() => {
    const a = saveParamToCookie("a");
    console.log(a);
  }, []);

  return (
    <>
      <ScrollToTop/>
      <MyAlert/>

      <Routes>
        {isAuth && !isDemoUser ? (
          <>
            <Route path="/" element={<LayoutWithAside/>}>
              <Route index element={<Futures/>}/>
              <Route path={FUTURES_PAGE} element={<Navigate to={MAIN_PAGE}/>}/>
              <Route path="/auth/*" element={<Navigate to={MAIN_PAGE}/>}/>
              <Route path="/wallet">
                <Route index element={<History/>}/>
                <Route path="deposit" element={<Deposit/>}/>
                {/*<Route path="deposit/:id" element={<CurrentCrypto />} />*/}
                <Route path="withdrawal" element={<Withdrawal/>}/>
              </Route>
              <Route path={PROFILE_PAGE} element={<MyProfile/>}/>
              <Route path="trading-history" element={<TransactionHistory/>}/>
              <Route path="settings" element={<Settings/>}/>
              <Route path="/page/:page" element={<InfoPage/>}/>
            </Route>

            <Route
              path={TRY_DEMO}
              element={<Navigate to={MAIN_PAGE}/>}
            ></Route>
          </>
        ) : (
          <>
            {NAVIGATE_TO_EMAIL.map((route) => (
              <Route path={route} element={<Navigate to={AUTH_PAGE}/>}/>
            ))}

            <Route index element={<Main/>}/>
            <Route
              path="page/:page"
              element={
                <Layout>
                  <InfoPage/>
                </Layout>
              }
            />

            <Route path="/auth" element={<Auth/>}>
              <Route index element={<Login/>}/>
              <Route path="signup" element={<SingUp/>}/>
              <Route path="recover-password" element={<RecoverPassword/>}/>
              <Route
                path="create-password/:email/:code"
                element={<CreatePassword/>}
              />
              <Route path="updated-password" element={<UpdatedPassword/>}/>

              <Route path="*" element={<Login/>}/>
            </Route>

            <Route path={TRY_DEMO} element={<LayoutWithAside/>}>
              <Route index element={<TryDemo/>}/>
            </Route>
          </>
        )}

        <Route path="auth/verify/:hash" element={<SignUpHash/>}/>
        <Route path="p/:hash" element={<AffiliateLink/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
};
