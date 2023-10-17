import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import createApolloClient from "@/lib/apollo/client";
import { theme } from "@/lib/mui/theme";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const client = createApolloClient();

  return (
    <div className={inter.className}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </div>
  );
}
