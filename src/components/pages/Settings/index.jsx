import React, { useState, useEffect } from "react";
import { InternalContent } from "@components/library";
import GlobalSettings from "./components/GlobalSettings";
import ChangePassword from "./components/ChangePassword";
import ChangePhone from "./components/ChangePhone";
import { Tab, Tabs, TabScrollButton } from "@mui/material";
import Authentication from "@components/pages/Settings/components/Authentication";
import { useSelector } from "react-redux";
import { useTranslation } from "@helpers/translate";
import "./index.sass";

export const Settings = () => {
  const [value, setValue] = useState(1);
  const { theme } = useSelector((state) => state.theme);
  const { __ } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam) {
      setValue(parseInt(tabParam));
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("tab", value);
    window.history.pushState({}, "", `?${urlParams.toString()}`);
  }, [value]);

  return (
    <InternalContent
      bgImg={`../images/bg/bg-lamba3${theme === "white" ? "-white" : ""}.png`}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile
        defaultValue={1}
        className="tabs"
        scrollButtons={false}
        TabScrollButtonComponent={TabScrollButton}
      >
        <Tab label={__("common.settings")} value={1} />
        <Tab label={__("settings.change_number")} value={2} />
        <Tab label={__("settings.change_password")} value={3} />
        <Tab label={__("settings.2fa")} value={4} />
      </Tabs>

      {value === 1 && (
        <div className="tab-content tab-content--scroll">
          <GlobalSettings />
        </div>
      )}

      {value === 2 && (
        <div className="tab-content tab-content--scroll">
          <ChangePhone />
        </div>
      )}

      {value === 3 && (
        <div className="tab-content tab-content--scroll">
          <ChangePassword />
        </div>
      )}

      {value === 4 && (
        <div className="tab-content tab-content--scroll">
          <Authentication />
        </div>
      )}
    </InternalContent>
  );
};

export default Settings;
