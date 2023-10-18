import { Box, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

type DescriptionProps = PropsWithChildren & {
  term: React.ReactNode;
};

const Description = ({ children, term }: DescriptionProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "start", padding: 2 }}>
      <Typography variant="caption" sx={{ flexBasis: "33%", flexGrow: 1 }}>
        {term}
      </Typography>
      <Typography variant="body1" sx={{ flexBasis: "67%", flexGrow: 1 }}>
        {children}
      </Typography>
    </Box>
  );
};

export default Description;
