import React, { useState } from "react";
import { Tab, TabPanel, Tabs, TabsList } from "@mui/base";
import { Button, InternalContent } from "@components/library";
import TopHistory from "./components/TopHistory";
import { useSelector } from "react-redux";
import TradeHistory from "@components/pages/History/components/TradeHistory";
import OpenOrders from "@components/pages/History/components/OpenOrders";
import "./index.sass";
import { useTranslation } from "@helpers/translate";
import { Helmet } from "react-helmet";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "@helpers/axios/private.axios";

export const TransactionHistory = () => {
  const { theme } = useSelector((state) => state.theme);
  const mTheme = useTheme();
  const { __ } = useTranslation();
  const isDesktop = useMediaQuery(mTheme.breakpoints.up("md"));
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const exportHistory = async (format) => {
    try {
      const tab = value === 1 ? "closed" : "open";
      const resp = await axios.get(`/bid/export/${tab}/${format}`, {
        responseType: "blob",
      });
      const blob = new Blob([resp.data], { type: "text/plain" });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.style.display = "none";
      a.download = `trading_history.${tab}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <InternalContent
      bgImg={`../images/bg/bg-lamba4${theme === "white" ? "-white" : ""}.png`}
    >
      <Helmet>
        <title>
          {__("seo.trading_history")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <TopHistory />
      <Tabs value={value} onChange={handleChange}>
        {!isDesktop && (
          <TabPanel value={1} className={"tabs-t-history__btns"}>
            <Button
              className="tabs-t-history__btn"
              color="border"
              size="mini-w"
              type="button"
              onClick={() => exportHistory("csv")}
            >
              Export CSV
            </Button>
            <Button
              className="tabs-t-history__btn"
              color="orange"
              size="mini-w"
              type="button"
              onClick={() => exportHistory("xlsx")}
            >
              Export XLSX
            </Button>
          </TabPanel>
        )}

        <TabsList className="tabs">
          <Tab value={1}>{__("history.trade_history")}</Tab>
          <Tab value={2}>{__("history.open_orders")}</Tab>

          {isDesktop && (
            <div className="tabs-t-history__btns">
              <Button
                className="tabs-t-history__btn"
                color="border"
                size="mini-w"
                type="button"
                onClick={() => exportHistory("csv")}
              >
                Export CSV
              </Button>
              <Button
                className="tabs-t-history__btn"
                color="orange"
                size="mini-w"
                type="button"
                onClick={() => exportHistory("xlsx")}
              >
                Export XLSX
              </Button>
            </div>
          )}
        </TabsList>
        <TabPanel className="tab-content" value={1}>
          <TradeHistory />
        </TabPanel>
        <TabPanel className="tab-content" value={2}>
          <OpenOrders />
        </TabPanel>
      </Tabs>
    </InternalContent>
  );
};

export default TransactionHistory;
