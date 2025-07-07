import Common from "./common";
import Trading from "./trading";
import Wallet from "./wallet";
import Tooltip from "./tooltip";
import Profile from "./profile";
import Error from "./error";
import History from "./history";
import Settings from "./settings";
import Auth from "./auth";
import Main from "./main";
import Seo from "./seo";
import Futures from "./futures";
import config from "../config";

/*
  Для того, щоб додати новий блок перекладу - створюєте новий файл на модуль,
  а далі підключаєте його у TranslationsArray нижче.
*/

const TranslationsArray = [
  Common,
  Trading,
  Wallet,
  Tooltip,
  Profile,
  Error,
  Settings,
  History,
  Auth,
  Main,
  Seo,
  Futures
];

const finalTranslations = {};

const supportedLangs = config.supported_locales;

supportedLangs.map((locale) => {
  finalTranslations[locale] = {};
});

TranslationsArray.map((translationBlock) => {
  supportedLangs.forEach((lang) => {
    finalTranslations[lang] = {
      ...finalTranslations[lang],
      ...translationBlock[lang],
    };
  });
});

export default finalTranslations;
