import Cookies from "js-cookie";

export const saveParamToCookie = (paramName) => {
  const paramValue = new URLSearchParams(window.location.search).get(paramName);

  if (paramValue) {
    Cookies.set(paramName, paramValue, { expires: 1 });
    return true;
  }

  return false;
};

export default saveParamToCookie;
