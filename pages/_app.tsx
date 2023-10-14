import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import createApolloClient from "@/lib/apollo-client";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const client = createApolloClient();

  return (
    <div className={inter.className}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  );
}
