import { Grid } from "@mui/material";
import React from "react";

import { FragmentType, gql, useFragment } from "@/__generated__";

export const CHARACTER_LIST_ITEM_FRAGMENT = gql(/* GraphQL */ `
  fragment CharacterListItem on Character {
    name
    image
  }
`);

type CharacterListItemProps = {
  character: FragmentType<typeof CHARACTER_LIST_ITEM_FRAGMENT>;
};

const CharacterListItem = (props: CharacterListItemProps) => {
  const character = useFragment(CHARACTER_LIST_ITEM_FRAGMENT, props.character);

  return (
    <Grid item>
      <picture style={{ display: "flex", flex: 1 }}>
        <img
          style={{ flex: 1 }}
          src={character.image || ""}
          alt={character.name || ""}
          width="100%"
          height="auto"
          loading="lazy"
        />
      </picture>
    </Grid>
  );
};

export default CharacterListItem;
