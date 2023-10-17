import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { CssBaseline } from "@mui/material";
import { Html, Head, Main, NextScript } from "next/document";

if (process.env.NODE_ENV !== "production") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <CssBaseline />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
