import { useLazyQuery, gql } from "@apollo/client";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Autocomplete,
  TextField,
  ListItemAvatar,
  Avatar,
  Link,
} from "@mui/material";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useEffect } from "react";
import { MdClose, MdOutlineSearch } from "react-icons/md";
import { create } from "zustand";

import { GetFilteredCharactersQuery, Maybe } from "@/__generated__/graphql";

import { SearchResultItemContainer } from "./styles";

type AppBarWithSearchState = {
  showSearchBox: boolean;
  searchValue: string;
  setShowSearchBox: () => void;
  setSearchValue: (value: string) => void;
};

const useAppBarWithSearchState = create<AppBarWithSearchState>((set) => ({
  showSearchBox: false,
  searchValue: "",
  setShowSearchBox: () =>
    set((state) => ({ showSearchBox: !state.showSearchBox })),
  setSearchValue: (value: string) => set(() => ({ searchValue: value })),
}));

const GET_FILTERED_CHARACTERS = gql`
  query GetFilteredCharacters($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        image
      }
    }
  }
`;

type SearchResult = {
  id?: Maybe<string>;
  name?: Maybe<string>;
  image?: Maybe<string>;
};

const AppBarWithSearch = () => {
  const router = useRouter();
  const { showSearchBox, setShowSearchBox, searchValue, setSearchValue } =
    useAppBarWithSearchState();

  const [getFilteredCharacters, { data }] =
    useLazyQuery<GetFilteredCharactersQuery>(GET_FILTERED_CHARACTERS, {
      canonizeResults: true,
      fetchPolicy: "no-cache",
    });

  useEffect(() => {
    if (searchValue) {
      getFilteredCharacters({ variables: { name: searchValue } });
    }
  }, [searchValue, getFilteredCharacters]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showSearchBox) {
        setShowSearchBox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSearchBox, setShowSearchBox]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const debouncedSearch = debounce(() => {
      setSearchValue(event.target.value);
    }, 500);
    debouncedSearch();
  };

  const onResultSelect = (
    _event: SyntheticEvent,
    value: SearchResult | null,
  ) => {
    if (typeof value === "string") {
      router.push(`/characters/${value}`);
    } else if (value !== null) {
      router.push(`/characters/${value.id}`);
    }
  };

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {showSearchBox ? (
          <Autocomplete
            fullWidth
            forcePopupIcon={false}
            options={data?.characters?.results || []}
            getOptionLabel={(props) => props?.name || ""}
            renderOption={(props, option) => (
              <SearchResultItemContainer
                {...props}
                key={`searchResult-${option?.id}`}
              >
                <Link
                  href={`/characters/${option?.id}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={option?.name || ""}
                      src={option?.image || ""}
                    />
                  </ListItemAvatar>
                  {option?.name}
                </Link>
              </SearchResultItemContainer>
            )}
            onChange={onResultSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search..."
                variant="standard"
                onChange={onInputChange}
                InputProps={{
                  ...params.InputProps,
                  style: { color: "white", borderColor: "white" },
                }}
              />
            )}
          />
        ) : (
          <Typography variant="h6" component="h1">
            Characters
          </Typography>
        )}

        <IconButton onClick={setShowSearchBox}>
          {showSearchBox ? (
            <MdClose size={20} color="white" />
          ) : (
            <MdOutlineSearch size={20} color="white" />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarWithSearch;
