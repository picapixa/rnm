This is the Rick n' Morty app, a NextJS (pages router) application that uses the https://rickandmortyapi.com/graphql to display a catalog of all of the characters appeared in the show.

# To run locally

1. Clone this repository.
2. Simply run `yarn dev` to start the development server and the auto-compilation of the GraphQL schema. It will run locally at localhost:3000.

In case the GQL compilation does not work, you can run in a separate terminal session `yarn gql:compile` manually every time there are schema changes.

# To run tests

Run `yarn test` to run the tests.
