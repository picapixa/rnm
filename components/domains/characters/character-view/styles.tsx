import { Box, BoxProps, Container, Tooltip, styled } from "@mui/material";
import Image from "next/image";

export const CharacterViewContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(7),
  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(0),

  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(8),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },

  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
}));

export const CharacterHeaderContainer = styled(Box)<BoxProps>(({ theme }) => ({
  position: "relative",
  width: "100%",

  [theme.breakpoints.up("md")]: {
    display: "flex",
    marginBottom: theme.spacing(4),
  },
}));

export const CharacterHeaderImage = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "auto",

  [theme.breakpoints.up("md")]: {
    width: 128,
    height: 128,
    borderRadius: "50%",
  },
}));

export const CharacterHeaderInformation = styled(Box)<BoxProps>(
  ({ theme }) => ({
    color: theme.palette.common.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "absolute",
    padding: theme.spacing(2),
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: `linear-gradient(0deg, ${theme.palette.primary.main} 0%, rgba(9,9,121,0.33) 35%, rgba(0,212,255,0) 100%)`,

    [theme.breakpoints.up("md")]: {
      background: "unset",
      color: theme.palette.text.primary,
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
      position: "unset",
    },
  }),
);

export const CharacterHeaderTooltip = styled(Tooltip)(({ theme }) => ({
  color: "white",

  [theme.breakpoints.up("md")]: {
    color: theme.palette.text.primary,
  },
}));
