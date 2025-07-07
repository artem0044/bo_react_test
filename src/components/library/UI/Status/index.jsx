import React from "react";
import Unverified from "@assets/images/icons/check.svg";
import Verified from "@assets/images/icons/success.svg";
import Pending from "@assets/images/icons/pending.svg";

import "./index.sass";
import { useTranslation } from "@helpers/translate";

export const Status = ({ status }) => {
  const { __ } = useTranslation();

  const statusMap = {
    success: "verified",
    pending: "pending",
    unverified: "unverified",
    2: "verified",
    1: "pending",
    0: "unverified",
  };

  const textMap = {
    success: __("common.verified"),
    pending: __("common.pending"),
    unverified: __("common.unverified"),
    2: __("common.verified"),
    1: __("common.pending"),
    0: __("common.unverified"),
  };

  const iconMap = {
    success: Verified,
    pending: Pending,
    unverified: Unverified,
    0: Unverified,
    2: Verified,
    1: Pending,
  };

  return (
    <div className={`status ${statusMap[status] || statusMap.default}`}>
      <img
        className="status__icon"
        src={`${iconMap[status] || statusMap.default}`}
      />
      <p className="status__text">{textMap[status]}</p>
    </div>
  );
};

export default Status;
