import React from "react";
import useStyles from "@helpers/theme/useStyles";

export const CheckSuccessIcon = () => {
  const style = useStyles();

  return (
    <>
      <svg
        width="71"
        height="71"
        viewBox="0 0 71 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="35.4999"
          cy="35.4994"
          r="26.6361"
          stroke={style.main}
          stroke-width="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.9756 36.5036L31.389 42.917L31.3475 42.8756L45.8168 28.4062"
          stroke={style.main}
          stroke-width="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
