import { styled } from "@mui/material";

export const SearchResultItemContainer = styled("li")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(4),
}));
