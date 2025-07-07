import React from "react";
import useStyles from "@helpers/theme/useStyles";

export const ArrowRight = ({ className = "" }) => {
  const styles = useStyles();

  return (
    <>
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.8505 12C21.8505 12.4142 21.5148 12.75 21.1005 12.75L3.10055 12.75C2.68634 12.75 2.35055 12.4142 2.35055 12C2.35055 11.5858 2.68634 11.25 3.10055 11.25L21.1005 11.25C21.5148 11.25 21.8505 11.5858 21.8505 12Z"
          fill={styles?.main}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5703 18.5303C14.2774 18.2374 14.2774 17.7626 14.5703 17.4697L20.0399 12L14.5703 6.53033C14.2774 6.23744 14.2774 5.76256 14.5703 5.46967C14.8632 5.17678 15.338 5.17678 15.6309 5.46967L21.6309 11.4697C21.9238 11.7626 21.9238 12.2374 21.6309 12.5303L15.6309 18.5303C15.338 18.8232 14.8632 18.8232 14.5703 18.5303Z"
          fill={styles?.main}
        />
      </svg>
    </>
  );
};
