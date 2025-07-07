import React from "react";
import { Snackbar, Alert } from "@mui/material";
import SuccessIcon from "@components/library/UI/Alert/icons/success";
import ErrorIcon from "@components/library/UI/Alert/icons/error";

import "./index.sass";
import { useDispatch, useSelector } from "react-redux";
import { ALERT } from "../../../../constants";

export const MyAlert = () => {
  const { type, hidden, message } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: ALERT.ALERT_HIDE });
  };

  const getIcon = (severity) => {
    switch (severity) {
      case "success":
        return <SuccessIcon />;
      case "info":
        break;
      case "warning":
        break;
      case "error":
        return <ErrorIcon />;
      default:
        return null;
    }
  };

  if( !type ){
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={!hidden}
      autoHideDuration={3000}
      onClose={handleClose}
      className="snackbar"
      sx={{
        "&.MuiSnackbar-root": {
          top: { lg: "80px", xs: "24px" },
          right: { lg: "33", xs: "16px" },
          left: { lg: "auto", xs: "16px" },
        },
      }}
    >
      <Alert
        icon={getIcon(type)}
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
