import { Box, CircularProgress } from "@mui/material";
import React from "react";

const InfinityLoadingIndicator = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        width: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default InfinityLoadingIndicator;
