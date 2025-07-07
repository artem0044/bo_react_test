import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "@helpers/axios/private.axios";
import { useTranslation } from "@helpers/translate";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Payout = ({ setLocked }) => {
  const { __ } = useTranslation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const {
    bids: { amount },
    trading: { pair },
    wallet: { active_wallet },
  } = useSelector((state) => state);

  const [payoutData, setPayoutData] = useState({
    payout: 0,
    profit: 0,
    total: 0,
  });

  const getPayout = async () => {
    try {
      const resp = await axios.post("/bid/validate", {
        symbol: pair.name,
        amount,
      });

      const { payout, profit, total } = resp.data.data;
      setPayoutData({ payout, profit, total });
      setLocked(false);
    } catch (error) {
      console.error("Error fetching payout:", error);
      setLocked(true);
    }
  };

  useEffect(() => {
    getPayout();
  }, [amount, pair, active_wallet]);

  const { payout, profit, total } = payoutData;

  if (!isDesktop) return <></>;

  return (
    <section className="trading-aside__section">
      <div className="payout">
        <h5 className="payout__title">{__("trading.payout")}</h5>
        <p className="payout__value">+{payout}%</p>
        <p className="payout__text">${total}</p>
        <h5 className="payout__title">{__("trading.profit")}</h5>
        <p className="payout__text">+${profit}</p>
      </div>
    </section>
  );
};

export default Payout;
