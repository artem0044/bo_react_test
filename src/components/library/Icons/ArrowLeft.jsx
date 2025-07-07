import React from "react";

import useStyles from "@helpers/theme/useStyles";

export const ArrowLeft = ({ className = "" }) => {
  const styles = useStyles();

  return (
    <>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.14941 12.5C2.14941 12.0858 2.4852 11.75 2.89941 11.75H20.8994C21.3136 11.75 21.6494 12.0858 21.6494 12.5C21.6494 12.9142 21.3136 13.25 20.8994 13.25H2.89941C2.4852 13.25 2.14941 12.9142 2.14941 12.5Z"
          fill={styles?.main}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.42973 5.96967C9.72262 6.26256 9.72262 6.73744 9.42973 7.03033L3.96007 12.5L9.42973 17.9697C9.72262 18.2626 9.72262 18.7374 9.42973 19.0303C9.13683 19.3232 8.66196 19.3232 8.36907 19.0303L2.36908 13.0303C2.07619 12.7374 2.07619 12.2626 2.36908 11.9697L8.36907 5.96967C8.66196 5.67678 9.13683 5.67678 9.42973 5.96967Z"
          fill={styles?.main}
        />
      </svg>
    </>
  );
};
