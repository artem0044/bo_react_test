import "./button.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useStyles from "@helpers/theme/useStyles";

export const Button = ({
  children,
  onClick,
  disabled = false,
  size = "middle",
  color = "orange",
  type = "button",
  className = "",
  to = "/",
  isLoading = false,
}) => {
  const style = useStyles();

  return (
    <>
      {type === "link" ? (
        <NavLink
          to={to}
          className={`btn btn--${size} btn--${color} ${className}`}
        >
          {children}
        </NavLink>
      ) : (
        <button
          onClick={onClick}
          disabled={disabled || isLoading}
          className={`btn btn--${size} btn--${color} ${className}`}
          type={type}
        >
          {isLoading && (
            <CircularProgress
              size={24}
              thickness={3.6}
              sx={{
                color: style.main,
                mr: "12px",
              }}
            />
          )}
          {children}
        </button>
      )}
    </>
  );
};
