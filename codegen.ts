import { CodegenConfig } from "@graphql-codegen/cli";

import { env } from "./env.mjs";

const config: CodegenConfig = {
  schema: env.GRAPHQL_API_URL,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["**/*.{ts,tsx}"],
  generates: {
    "./__generated__/types.ts": {
      plugins: ["typescript"],
    },
    "./__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
