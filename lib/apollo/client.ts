import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            characters: {
              keyArgs: false,
              merge(existing, incoming) {
                if (!existing) {
                  return incoming;
                }
                return {
                  ...incoming,
                  results: [...existing.results, ...incoming.results],
                };
              },
            },
          },
        },
      },
    }),
  });
};

export default createApolloClient;
