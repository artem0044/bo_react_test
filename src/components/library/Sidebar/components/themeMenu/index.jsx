import React from "react";
import { Grid } from "@mui/material";
import YellowTheme from "@assets/images/icons/yellow-theme.svg";
import WhiteTheme from "@assets/images/icons/white-theme.svg";
import { useDispatch, useSelector } from "react-redux";
import { THEME } from "../../../../../constants";

const SettingsMenu = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const changeTheme = (theme) => {
    dispatch({ type: THEME.CHANGE_THEME, payload: theme });
  };

  return (
    <div className="change-theme">
      <Grid container spacing="6px">
        <Grid item xs={6}>
          <button
            onClick={() => changeTheme("orange")}
            type="button"
            className={`change-theme__btn ${
              theme === "orange" ? "active" : ""
            }`}
          >
            <picture className="change-theme__btn-icon">
              <img src={YellowTheme} />
            </picture>

            <p className="change-theme__text">Orange</p>
          </button>
        </Grid>
        <Grid item xs={6}>
          <button
            onClick={() => changeTheme("white")}
            type="button"
            className={`change-theme__btn ${theme === "white" ? "active" : ""}`}
          >
            <picture className="change-theme__btn-icon">
              <img src={WhiteTheme} />
            </picture>

            <p className="change-theme__text">White</p>
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingsMenu;
