import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Point to your running server's schema
  schema: 'http://localhost:4000/graphql',
  
  // Tell codegen where to look for query files
  documents: ['src/**/*.tsx'],
  
  // This is the important part that uses the client-preset
  generates: {
    './src/gql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;