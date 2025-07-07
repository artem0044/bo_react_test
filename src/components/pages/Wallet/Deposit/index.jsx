import React from "react";
import { TabsList, Tab, Tabs, TabPanel } from "@mui/base";
import { InternalContent } from "@components/library";
import TopBalance from "@components/library/TopBalance";
import Cryptocurrencies from "./CurrentCrypto/components/Cryptocurrencies";
import Fiat from "@components/pages/Wallet/Deposit/components/Fiat";

import "../index.sass";
import { useSelector } from "react-redux";
import InfoPopup from "@components/pages/Wallet/components/InfoPopup";
import { useTranslation } from "@helpers/translate";
import DemoWarning from "@components/pages/Wallet/components/DemoWarning";
import { Helmet } from "react-helmet";
import {WALLET_TYPE} from "../../../../constants";

export const Deposit = () => {
  const {
    theme: { theme },
    wallet: { active_wallet },
  } = useSelector((state) => state);
  const { __ } = useTranslation();

  return (
    <InternalContent
      bgImg={`../images/bg/bg-lamba3${theme === "white" ? "-white" : ""}.png`}
    >
      <Helmet>
        <title>
          {__("seo.deposit_funds")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <TopBalance />
      <InfoPopup />

      {active_wallet.type !== WALLET_TYPE.REAL ? (
        <DemoWarning />
      ) : (
        <Tabs defaultValue={2}>
          <TabsList className="tabs">
            <Tab value={1}>{__("common.fiat")}</Tab>
            <Tab value={2}>{__("wallet.cryptocurrencies")}</Tab>
          </TabsList>
          <TabPanel className="tab-content tab-content--mini" value={1}>
            <Fiat />
          </TabPanel>
          <TabPanel className="tab-content tab-content--mini" value={2}>
            <Cryptocurrencies />
          </TabPanel>
        </Tabs>
      )}
    </InternalContent>
  );
};

export default Deposit;
