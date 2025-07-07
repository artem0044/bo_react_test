import React, { useState } from "react";
import { Button, InternalContent } from "@components/library";
import TopBalance from "@components/library/TopBalance";
import { Tab, TabPanel, Tabs, TabsList } from "@mui/base";
import Fiat from "./components/Fiat";
import { MenuItem, Select } from "@mui/material";
import Crypto from "./components/Crypto";
import { useSelector } from "react-redux";

import "./index.sass";
import { useTranslation } from "@helpers/translate";
import { Helmet } from "react-helmet";
// import config from "../../../config";
import axios from "@helpers/axios/private.axios";

export const History = () => {
  const { theme } = useSelector((state) => state.theme);
  const [openSelect, setOpenSelect] = useState(false);
  const [operation, setOperation] = useState("all");
  const { __ } = useTranslation();
  const handleChange = (event) => {
    setOperation(event.target.value);
  };

  const exportHistory = async (format) => {
    try {
      const resp = await axios.get(`/transaction/history/export/${format}`, {
        responseType: "blob",
      });
      const blob = new Blob([resp.data], { type: "text/plain" });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.style.display = "none";
      a.download = `transactions.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <InternalContent
      bgImg={`../images/bg/bg-lamba${theme === "white" ? "-white" : ""}.png`}
    >
      <Helmet>
        <title>
          {__("seo.transaction_history")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>

      <TopBalance />

      <Tabs defaultValue={2}>
        <TabsList className="tabs tabs-t-history">
          <Select
            className={`t-history-select bo-select-mini ${
              openSelect ? "open" : ""
            }`}
            value={operation}
            onChange={handleChange}
            variant="standard"
            onOpen={() => setOpenSelect(true)}
            onClose={() => setOpenSelect(false)}
            MenuProps={{
              className: "bo-select-mini-content",
            }}
            IconComponent={(props) => {
              return (
                <svg
                  {...props}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9467 5.45312H7.79341H4.05341C3.41341 5.45312 3.09341 6.22646 3.54674 6.67979L7.00008 10.1331C7.55341 10.6865 8.45341 10.6865 9.00674 10.1331L10.3201 8.81979L12.4601 6.67979C12.9067 6.22646 12.5867 5.45312 11.9467 5.45312Z"
                    fill="#707070"
                  />
                </svg>
              );
            }}
          >
            <MenuItem value={"all"}>{__("common.all")}</MenuItem>
            <MenuItem value={"withdrawal"}>{__("wallet.withdrawal")}</MenuItem>
            <MenuItem value={"deposit"}>{__("wallet.deposit")}</MenuItem>
          </Select>
          <Tab value={1}>{__("common.fiat")}</Tab>
          <Tab value={2}>{__("common.crypto")}</Tab>

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
        </TabsList>
        <TabPanel className="tab-content tab-content--mini" value={1}>
          <Fiat operation={operation} />
        </TabPanel>
        <TabPanel className="tab-content tab-content--mini" value={2}>
          <Crypto operation={operation} />
        </TabPanel>
      </Tabs>
    </InternalContent>
  );
};

export default History;
