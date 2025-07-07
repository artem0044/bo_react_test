import React from "react";
import { Box } from "@mui/material";

import "./index.sass";

export const InternalContent = ({ bgImg, children }) => {
  return (
    <Box
      sx={{ backgroundImage: `url("${bgImg}")` }}
      className="internal-content"
    >
      {children}
    </Box>
  );
};
export default InternalContent;
