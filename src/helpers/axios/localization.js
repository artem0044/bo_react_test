import privateAxios from "@helpers/axios/private.axios";
import publicAxios from "@helpers/axios/public.axios";

privateAxios.defaults.headers.common["X-localization"] = `en`;
publicAxios.defaults.headers.common["X-localization"] = `en`;

export const configurateLocale = (locale) => {
  privateAxios.defaults.headers.common["X-localization"] = `${locale}`;
  publicAxios.defaults.headers.common["X-localization"] = `${locale}`;
};
