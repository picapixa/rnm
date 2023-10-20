import { useQuery } from "@apollo/client";
import {
  AppBar,
  Box,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack } from "react-icons/md";

import { gql } from "@/__generated__";
import CharacterView from "@/components/domains/characters/character-view";
import AppBarScroll from "@/components/layout/app-bar-scroll";

const GET_CHARACTER_QUERY = gql(/* GraphQL */ `
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      ...CharacterView
    }
  }
`);

const CharacterPage = () => {
  const { query } = useRouter();
  const { id } = query;

  const { data, loading } = useQuery(GET_CHARACTER_QUERY, {
    variables: {
      id: id?.toString() || "",
    },
  });
  const { character } = data || {};

  if (!character) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{character?.name} - Rick & Morty Characters</title>
      </Head>

      <AppBarScroll
        options={{
          threshold: 500,
        }}
        onTriggeredProps={{}}
      >
        <AppBar>
          <Toolbar sx={{ gap: 1 }}>
            <IconButton edge="start" color="inherit" aria-label="back" href="/">
              <MdArrowBack />
            </IconButton>
            {character ? <Typography>{character.name}</Typography> : null}
          </Toolbar>
        </AppBar>
      </AppBarScroll>

      {loading ? (
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <CharacterView character={character} />
      )}
    </>
  );
};

export default CharacterPage;
