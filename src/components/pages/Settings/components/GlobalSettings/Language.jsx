import React from "react";
import { Button } from "@components/library";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@helpers/translate";
import { changeLocale } from "@actions/localization";
import config from "../../../../../config";

const Language = () => {
  const { locale, loading } = useSelector((state) => state.localization);
  const dispatch = useDispatch();
  const { __ } = useTranslation();

  const changeLang = async (locale) => {
    dispatch(changeLocale({ locale }));
  };

  return (
    <div className="g-settings__lang change-lang">
      <h2 className="g-settings__label">{__("settings.language")}:</h2>

      <div className="change-lang__btns">
        {config.supported_locales.map((el) => (
          <Button
            className="change-lang__btn"
            color={`${locale === el ? "orange" : "grey"}`}
            size="mini"
            onClick={() => changeLang(el)}
            disabled={loading}
          >
            {__(`settings.lang.${el}`)}
          </Button>
        ))}

        {/*<Button*/}
        {/*  className="change-lang__btn"*/}
        {/*  color={`${locale === "ru" ? "orange" : "grey"}`}*/}
        {/*  size="mini"*/}
        {/*  onClick={() => changeLang("ru")}*/}
        {/*  disabled={loading}*/}
        {/*>*/}
        {/*  Russian*/}
        {/*</Button>*/}
        {/*<Button*/}
        {/*  className="change-lang__btn"*/}
        {/*  color={`${locale === "en" ? "orange" : "grey"}`}*/}
        {/*  size="mini"*/}
        {/*  onClick={() => changeLang("en")}*/}
        {/*  disabled={loading}*/}
        {/*>*/}
        {/*  {__("settings.lang.en")}*/}
        {/*</Button>*/}
      </div>
    </div>
  );
};

export default Language;
