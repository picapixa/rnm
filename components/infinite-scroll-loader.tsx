import { Box, CircularProgress } from "@mui/material";
import React from "react";

const InfiniteScrollLoader = () => {
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

export default InfiniteScrollLoader;
