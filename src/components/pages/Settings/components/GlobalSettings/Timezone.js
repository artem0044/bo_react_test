import React, { useState } from "react";
import {Autocomplete, MenuItem, Popper, TextField} from "@mui/material";
import { useTranslation } from "@helpers/translate";
import moment from "moment-timezone";
import { getUserTimezone } from "@helpers/timezone";
import "moment/locale/ru";

export const Timezone = () => {
  const { __ } = useTranslation();
  const [selectedTimezone, setSelectedTimezone] = useState(getUserTimezone());
  const timezones = moment.tz.names();
  
  const getTimezoneOffset = (timezone) => {
    const offset = moment.tz(timezone).utcOffset() / 60;
    const sign = offset >= 0 ? "+" : "-";
    return `GMT${sign}${Math.abs(offset)}`;
  };

  const handleChange = (event, newValue) => {
    if (newValue) {
      setSelectedTimezone(newValue);
      moment.tz.setDefault(newValue);
      localStorage.setItem("userTimezone", newValue);
    }
  };

  const CustomPopper = (props) => (
    <Popper
      {...props}
      className={`${props.className} bo-select-content`}
    />
  );
  
  return (
    <div className="g-settings__lang">
      <h2 className="g-settings__label">{__("settings.time_zone")}:</h2>

      <Autocomplete
        options={timezones}
        value={selectedTimezone}
        onChange={handleChange}
        getOptionLabel={(option) => `${option} (${getTimezoneOffset(option)})`}
        renderOption={(props, option) => (
          <MenuItem {...props}>
            {option} ({getTimezoneOffset(option)})
          </MenuItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
          />
        )}
        fullWidth
        disableClearable
        isOptionEqualToValue={(option, value) => option === value}
        className="bo-select"
        PopperComponent={CustomPopper}
      />
    </div>
  );
};

export default Timezone;
