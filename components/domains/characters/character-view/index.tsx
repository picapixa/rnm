import { Box, Typography } from "@mui/material";
import React from "react";

import { FragmentType, gql, useFragment } from "@/__generated__";
import Description from "@/components/primitives/description";

import CharacterHeader from "./header";
import { CharacterViewContainer } from "./styles";

export const CHARACTER_VIEW_FRAGMENT = gql(/* GraphQL */ `
  fragment CharacterView on Character {
    id
    gender
    ...CharacterHeader
    origin {
      name
      type
      dimension
    }
    location {
      name
      type
      dimension
    }
    episode {
      name
      air_date
      episode
    }
  }
`);

type CharacterViewProps = {
  character: FragmentType<typeof CHARACTER_VIEW_FRAGMENT>;
};

const CharacterView = (props: CharacterViewProps) => {
  const character = useFragment(CHARACTER_VIEW_FRAGMENT, props.character);

  return (
    <CharacterViewContainer>
      <CharacterHeader character={character} />
      <Description term="Gender">{character.gender}</Description>
      <Description term="Origin">{character.origin?.name}</Description>
      <Description term="Location">{character.location?.name}</Description>
      {character.episode?.length > 0 && (
        <Description term="Episodes">
          {character.episode?.map(
            (episode, index) =>
              episode && (
                <Box
                  key={index}
                  sx={{ flexDirection: "column", marginBottom: 2 }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {episode.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Air Date: {episode.air_date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Episode: {episode.episode}
                  </Typography>
                </Box>
              ),
          )}
        </Description>
      )}
    </CharacterViewContainer>
  );
};

export default CharacterView;
