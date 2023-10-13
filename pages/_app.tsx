import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import createApolloClient from "@/lib/apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
