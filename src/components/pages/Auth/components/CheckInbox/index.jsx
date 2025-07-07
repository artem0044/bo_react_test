import React from "react";
import { useTranslation } from "@helpers/translate";

import "./checkInbox.sass";

const Check = ({ email = "" }) => {
  const { __ } = useTranslation();

  return (
    <div className="check">
      <svg
        className="check__icon"
        width="71"
        height="71"
        viewBox="0 0 71 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.91663 25.1459C5.91663 14.7917 11.8333 10.3542 20.7083 10.3542H50.2916C59.1666 10.3542 65.0833 14.7917 65.0833 25.1459V45.8542C65.0833 56.2084 59.1666 60.6459 50.2916 60.6459H20.7083"
          stroke="#F9B036"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50.2917 26.625L41.0321 34.0208C37.985 36.4467 32.9854 36.4467 29.9384 34.0208L20.7084 26.625"
          stroke="#F9B036"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.91663 48.8125H23.6666"
          stroke="#F9B036"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.91663 36.9792H14.7916"
          stroke="#F9B036"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h2 className="check__title">{__("auth.check_in_box1")}</h2>
      <p className="check__text">
        {__("auth.check_in_box2_1")} {email} {__("auth.check_in_box2_2")}
      </p>
    </div>
  );
};

export default Check;
