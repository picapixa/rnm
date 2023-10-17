import { useQuery } from "@apollo/client";
import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

import { gql } from "@/__generated__";
import CharacterListItem from "@/components/domains/characters/character-list-item";
import InfiniteCharacterList from "@/components/domains/characters/infinite-character-list";

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
        ...CharacterListItem
      }
    }
  }
`);

export default function HomePage() {
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

      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="h1">
            Characters
          </Typography>
        </Toolbar>
      </AppBar>

      <InfiniteCharacterList
        next={loadNextBatch}
        hasMore={!!data?.characters?.info?.next}
        loader={<h4>Loading...</h4>}
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
    </>
  );
}
