import { CodegenConfig } from "@graphql-codegen/cli";

import { env } from "./env.mjs";

const config: CodegenConfig = {
  schema: env.GRAPHQL_API_URL,
  documents: ["**/*.tsx", "!__generated__/**/*"],
  generates: {
    "./__generated__/types.ts": {
      plugins: ["typescript"],
      config: {
        avoidOptionals: true,
      },
    },
    "./__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
        avoidOptionals: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
