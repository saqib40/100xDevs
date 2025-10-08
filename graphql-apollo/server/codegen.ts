import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.ts", // Path to your schema
  generates: {
    "src/generated/graphql.ts": { // Output file
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;