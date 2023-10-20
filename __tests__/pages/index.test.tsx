import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

import IndexPage, { GET_CHARACTERS_QUERY } from "@/pages/index";

const mocks = [
  {
    request: {
      query: GET_CHARACTERS_QUERY,
      variables: {
        page: 1,
      },
    },
    result: {
      data: {
        characters: {
          results: [
            {
              name: "Rick Sanchez",
              status: "Alive",
              species: "Human",
              type: "",
              gender: "Male",
            },
            {
              name: "Morty Smith",
              status: "Alive",
              species: "Human",
              type: "",
              gender: "Male",
            },
          ],
        },
      },
    },
  },
];

jest.mock("next/router", () => require("next-router-mock"));
mockRouter.useParser(createDynamicRouteParser(["/characters/[id]"]));

describe("Index Page", () => {
  it("renders without crashing", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <IndexPage />
      </MockedProvider>,
    );
    expect(screen.getByText("Characters")).toBeInTheDocument();
  });
});
