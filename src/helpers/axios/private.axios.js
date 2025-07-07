import axios from "axios";
import config from "../../config";
import { MAIN_PAGE, GLOBALS } from "@constants";
import { saveState } from "@helpers/storage/storeLocalData";

const privateInstance = axios.create({
  baseURL: config.api_url,
});

export const configurateToken = (token) => {
  privateInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeUserSession = (navigateTo = MAIN_PAGE) => {
  window.location.href = navigateTo;

  const boState = window.localStorage[GLOBALS.local_state_name];
  saveState(GLOBALS.local_state_name, { ...JSON.parse(boState), auth: {} });
};

privateInstance.interceptors.response.use(
  function (response) {
    // refreshToken(response);
    return response;
  },
  function (error) {
    if (error.response === undefined) {
      removeUserSession();
    } else if (error.response.status === 401) {
      removeUserSession();
    }
    return Promise.reject(error);
  }
);

export default privateInstance;
