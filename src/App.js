import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { AuthWrapper } from "@components/common/AuthWrapper";

import store from "./redux/store";
import "normalize.css";
import "./styles/globals.sass";
import { LocalizationWrapper } from "@components/common/LocalizationWrapper";

/*
    Файл для глобальних конфігурацій, врапперів і т.д
*/

export const App = () => {
  return (
    <Provider store={store}>
      <LocalizationWrapper>
        <BrowserRouter>
          <AuthWrapper />
        </BrowserRouter>
      </LocalizationWrapper>
    </Provider>
  );
};
