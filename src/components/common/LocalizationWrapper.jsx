import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IntlProvider } from "react-intl";
import { ruRU as ruRUDatePicker } from "@mui/x-date-pickers/locales";

import { enUS, ruRU } from "@mui/material/locale";
import localizationMessage from "../../translations";
import { configurateLocale } from "@helpers/axios/localization";

const MUILocalization = {
  en: enUS,
  ru: ruRU,
};

export const LocalizationWrapper = ({ children }) => {
  const { locale } = useSelector((state) => state.localization);

  const theme = createTheme(
    {
      breakpoints: {
        values: {
          xs: 0,
          sm: 428,
          b680: 680,
          md: 768,
          lg: 958,
          xl: 1280,
          b1440: 1440,
        },
      },
    },
    MUILocalization[locale],
    ruRUDatePicker
  );

  useEffect(() => {
    if (locale) {
      configurateLocale(locale);
    }
  }, [locale]);

  return (
    <IntlProvider
      key={locale}
      locale={locale}
      messages={localizationMessage[locale]}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </IntlProvider>
  );
};
