import React from "react";
import { InternalContent } from "@components/library";
import TopBalance from "@components/library/TopBalance";
import { TabsList, Tab, Tabs, TabPanel } from "@mui/base";
import Fiat from "@components/pages/Wallet/Withdrawal/Fiat";
import Cryptocurrencies from "@components/pages/Wallet/Withdrawal/Cryptocurrencies";
import { useSelector } from "react-redux";
import ConfirmWithdrawal from "../components/ConfirmWithdrawal";
import Succesful from "../components/InfoPopup";
import { useTranslation } from "@helpers/translate";
import DemoWarning from "../components/DemoWarning";
import "../index.sass";
import UnverifiedUser from "@components/pages/Wallet/components/UnverifiedUser";
import { Transition } from "react-transition-group";
import { Helmet } from "react-helmet";
import {WALLET_TYPE} from "../../../../constants";

export const Withdrawal = () => {
  const { __ } = useTranslation();
  const {
    theme: { theme },
    wallet: { active_wallet, showWithdrawal },
    user: {
      user: { is_user_verified },
    },
  } = useSelector((state) => state);

  return (
    <InternalContent
      bgImg={`../images/bg/bg-lamba3${theme === "white" ? "-white" : ""}.png`}
    >
      <Helmet>
        <title>
          {__("seo.withdraw_funds")} {__("seo.divider")} {__("seo.title")}
        </title>
      </Helmet>
      <TopBalance />
      <Transition in={showWithdrawal} timeout={500} mountOnEnter unmountOnExit>
        <ConfirmWithdrawal />
      </Transition>
      <Succesful />

      {active_wallet.type !== WALLET_TYPE.REAL ? (
        <DemoWarning />
      ) : is_user_verified ? (
        <UnverifiedUser />
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

export default Withdrawal;
