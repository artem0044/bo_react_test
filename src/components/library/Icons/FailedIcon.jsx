import React from "react";
import useStyles from "@helpers/theme/useStyles";

export const FailedIcon = () => {
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
        <path
          d="M35.6361 62.2722C50.3468 62.2722 62.2722 50.3468 62.2722 35.6361C62.2722 20.9254 50.3468 9 35.6361 9C20.9254 9 9 20.9254 9 35.6361C9 50.3468 20.9254 62.2722 35.6361 62.2722Z"
          stroke={style.main}
          stroke-width="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 27L28 43"
          stroke={style.main}
          stroke-width="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 27L44 43"
          stroke={style.main}
          stroke-width="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
