import { IconButton, Typography } from "@mui/material";
import React from "react";
import { LiaQuestionCircle, LiaSkullCrossbonesSolid } from "react-icons/lia";

import { FragmentType, gql, useFragment } from "@/__generated__";

import {
  CharacterHeaderContainer,
  CharacterHeaderImage,
  CharacterHeaderInformation,
  CharacterHeaderTooltip,
} from "./styles";

export const CHARACTER_HEADER_FRAGMENT = gql(/* GraphQL */ `
  fragment CharacterHeader on Character {
    name
    image
    status
    species
    type
  }
`);

type CharacterHeaderProps = {
  character: FragmentType<typeof CHARACTER_HEADER_FRAGMENT>;
};

const CharacterHeader = (props: CharacterHeaderProps) => {
  const character = useFragment(CHARACTER_HEADER_FRAGMENT, props.character);

  return (
    <CharacterHeaderContainer>
      {character.image && (
        <CharacterHeaderImage
          src={character.image || ""}
          alt={character.name || ""}
          width={300}
          height={300}
        />
      )}
      <CharacterHeaderInformation>
        <Typography variant="overline">
          {character.species} {character.type && `\u2022 ${character.type}`}
        </Typography>
        <Typography variant="h3" fontWeight={600}>
          {character.name}
          {character.status === "Dead" && (
            <CharacterHeaderTooltip title="Dead">
              <IconButton>
                <LiaSkullCrossbonesSolid size={36} />
              </IconButton>
            </CharacterHeaderTooltip>
          )}
          {character.status === "unknown" && (
            <CharacterHeaderTooltip title="Unknown status">
              <IconButton>
                <LiaQuestionCircle size={36} />
              </IconButton>
            </CharacterHeaderTooltip>
          )}
        </Typography>
      </CharacterHeaderInformation>
    </CharacterHeaderContainer>
  );
};

export default CharacterHeader;
