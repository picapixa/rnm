import { useQuery } from "@apollo/client";
import { Box, Grid, Link, Skeleton } from "@mui/material";
import times from "lodash/times";
import Head from "next/head";

import { gql } from "@/__generated__";
import InfiniteCharacterList from "@/components/domains/characters/infinite-character-list";
import CharacterListItem from "@/components/domains/characters/infinite-character-list/item";
import InfiniteScrollLoader from "@/components/infinite-scroll-loader";
import AppBarWithSearch from "@/components/navigation/app-bar-with-search";

const SKELETON_PLACEHOLDER_COUNT = 20;

export const GET_CHARACTERS_QUERY = gql(/* GraphQL */ `
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
        ...CharacterListItem
      }
    }
  }
`);

export default function HomePage() {
  const { data, loading, fetchMore } = useQuery(GET_CHARACTERS_QUERY, {
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

      <AppBarWithSearch />

      <Box marginTop={{ xs: 7, sm: 8 }}>
        {loading ? (
          <Grid container display="flex" flexWrap="wrap">
            {times(SKELETON_PLACEHOLDER_COUNT, (i) => (
              <Grid
                item
                key={i}
                display="flex"
                flexGrow={1}
                flexBasis={{ xs: "33%", md: "20%", lg: "16.67%" }}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    flexGrow: 1,
                    aspectRatio: 1,
                    height: "auto",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <InfiniteCharacterList
            next={loadNextBatch}
            hasMore={!!data?.characters?.info?.next}
            loader={<InfiniteScrollLoader />}
            dataLength={data?.characters?.results?.length || 0}
          >
            {data?.characters?.results?.map(
              (character) =>
                character && (
                  <Link
                    href={`/characters/${character?.id}`}
                    key={character?.id}
                    display="flex"
                    flexGrow={1}
                    flexBasis={{ xs: "33%", md: "20%", lg: "16.67%" }}
                  >
                    <CharacterListItem character={character} />
                  </Link>
                ),
            )}
          </InfiniteCharacterList>
        )}
      </Box>
    </>
  );
}
