import { useQuery } from "@apollo/client";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
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

  const { data } = useQuery(GET_CHARACTER_QUERY, {
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
            <Typography>{character?.name}</Typography>
          </Toolbar>
        </AppBar>
      </AppBarScroll>

      <CharacterView character={character} />
    </>
  );
};

export default CharacterPage;
