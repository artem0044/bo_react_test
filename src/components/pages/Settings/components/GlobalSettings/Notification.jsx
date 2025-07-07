import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "@helpers/translate";

const Notification = ({ control }) => {
  const { __ } = useTranslation();

  return (
    <div className="g-settings__notification notification">
      <h2 className="g-settings__label">
        {__("settings.email_notifications")}:
      </h2>

      <ul className="notification__list">
        <li className="notification__item">
          <Controller
            name="companyNews"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                className="notification-card"
                control={
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label={__("settings.company_news")}
              />
            )}
          />
        </li>
        <li className="notification__item">
          <Controller
            name="withdrawal"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                className="notification-card"
                control={
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label={__("wallet.withdrawal")}
              />
            )}
          />
        </li>
        <li className="notification__item">
          <Controller
            name="deposit"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                className="notification-card"
                control={
                  <Switch
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label={__("common.deposit")}
              />
            )}
          />
        </li>
      </ul>
    </div>
  );
};

export default Notification;
