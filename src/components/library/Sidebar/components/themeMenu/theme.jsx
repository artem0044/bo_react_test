import React from "react";
import {Grid} from "@mui/material";
import YellowTheme from "@assets/images/icons/yellow-theme.svg";
import WhiteTheme from "@assets/images/icons/white-theme.svg";
import {useDispatch, useSelector} from "react-redux";
import {THEME} from "../../../../../constants";
import {useTranslation} from "@helpers/translate";

const Theme = ({open, setOpen}) => {
  const {theme} = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const {__} = useTranslation();

  const changeTheme = (theme) => {
    dispatch({type: THEME.CHANGE_THEME, payload: theme});
  };

  return (
    <div className={`desc-change-theme ${open ? "active" : ""}`}>
      <div
        onClick={() => setOpen(false)}
        className="desc-change-theme__bg"
      ></div>
      <div className="desc-change-theme__content">
        <h3 className="desc-change-theme__title">{__("common.theme_type")}</h3>
        <Grid container spacing="6px">
          <Grid item xs={6}>
            <button
              type="button"
              className={`desc-change-theme__btn ${
                theme === "orange" ? "active" : ""
              }`}
              onClick={() => changeTheme("orange")}
            >
              <picture className="desc-change-theme__btn-icon">
                <img src={YellowTheme}/>
              </picture>

              <p className="desc-change-theme__text">{__("common.dark")}</p>
            </button>
          </Grid>
          <Grid item xs={6}>
            <button
              type="button"
              className={`desc-change-theme__btn ${
                theme === "white" ? "active" : ""
              }`}
              onClick={() => changeTheme("white")}
            >
              <picture className="desc-change-theme__btn-icon">
                <img src={WhiteTheme}/>
              </picture>
              <p className="desc-change-theme__text">{__("common.light")}</p>
            </button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Theme;
