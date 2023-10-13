import { useQuery } from "@apollo/client";
import { Container, ImageList, ImageListItem } from "@mui/material";
import { Inter } from "next/font/google";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

import { gql } from "@/__generated__/gql";

const inter = Inter({ subsets: ["latin"] });

const GET_CHARACTERS_QUERY = gql(/* GraphQL */ `
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`);

export default function Home() {
  const { data, fetchMore } = useQuery(GET_CHARACTERS_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      page: 1,
    },
  });
  const { characters } = data || {};

  const loadNextBatch = async () => {
    await fetchMore({
      variables: {
        page: characters?.info?.next || 1,
      },
    });
  };

  return (
    <>
      <Head>
        <title>The Rick and Morty Characters Database</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className={inter.className}>
        {data?.characters?.results && data?.characters.results?.length > 0 ? (
          <ImageList variant="masonry" cols={3}>
            <InfiniteScroll
              next={loadNextBatch}
              hasMore={!!data.characters?.info?.next}
              loader={<h4>Loading...</h4>}
              dataLength={data?.characters.results.length || 0}
            >
              {data.characters.results.map((character) => (
                <ImageListItem key={character?.id}>
                  <picture>
                    <img
                      src={character?.image || ""}
                      alt={character?.name || ""}
                      loading="lazy"
                    />
                  </picture>
                </ImageListItem>
              ))}
            </InfiniteScroll>
          </ImageList>
        ) : null}
      </Container>
    </>
  );
}
