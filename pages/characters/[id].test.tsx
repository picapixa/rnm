import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

import CharacterPage, { GET_CHARACTER_QUERY } from "./[id]";

const mocks = [
  {
    delay: 10,
    request: {
      query: GET_CHARACTER_QUERY,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        character: {
          name: "Rick Sanchez",
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
        },
      },
    },
  },
];

jest.mock("next/router", () => require("next-router-mock"));

mockRouter.useParser(createDynamicRouteParser(["/characters/[id]"]));

describe("Character Page", () => {
  it("should parse dynamic routes", () => {
    mockRouter.push("/characters/1");
    expect(mockRouter).toMatchObject({
      pathname: "/characters/[id]",
      query: {
        id: "1",
      },
    });
  });

  it("renders without crashing", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterPage />
      </MockedProvider>,
    );

    await waitFor(() => {
      const name = screen.queryAllByText("Rick Sanchez");
      expect(name).not.toHaveLength(0);
    });
  });
});
