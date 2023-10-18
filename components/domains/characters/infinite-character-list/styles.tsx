import { Grid, styled } from "@mui/material";

export const CharacterListItemContainer = styled(Grid)(() => ({
  position: "relative",

  "&:hover .character-info": {
    cursor: "pointer",
    opacity: 1,
  },
}));

export const CharacterListItemInfo = styled(Grid)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  background:
    "linear-gradient(0deg, rgba(33,32,42,1) 0%, rgba(103,103,105,0.5) 66%, rgba(255,255,255,0) 100%);",
  color: theme.palette.common.white,
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",
}));
