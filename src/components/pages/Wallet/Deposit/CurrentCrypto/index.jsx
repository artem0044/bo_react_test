import React from "react";
import { InternalContent } from "@components/library";
import TopBalance from "@components/library/TopBalance";
import { Tab, TabPanel, Tabs, TabsList } from "@mui/base";
import Fiat from "@components/pages/Wallet/Deposit/components/Fiat";
import Cryptocurrencies from "./components/Cryptocurrencies";

import "./index.sass";
import { useSelector } from "react-redux";

export const CurrentCrypto = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <InternalContent
      bgImg={`../images/bg/bg-lamba3${theme === "white" ? "-white" : ""}.png`}
    >
      <TopBalance />

      <Tabs defaultValue={1}>
        <TabsList className="tabs">
          <Tab value={1}>Fiat</Tab>
          <Tab value={2}>Cryptocurrencies</Tab>
        </TabsList>
        <TabPanel className="tab-content tab-content--mini" value={1}>
          <Fiat />
        </TabPanel>
        <TabPanel className="tab-content tab-content--mini" value={2}>
          <Cryptocurrencies />
        </TabPanel>
      </Tabs>
    </InternalContent>
  );
};

export default CurrentCrypto;
