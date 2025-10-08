import { Resolvers } from './generated/graphql';

// Dummy data
const books = [
  { title: 'The Awakening', author: 'Kate Chopin' },
  { title: 'City of Glass', author: 'Paul Auster' },
];

// Use the generated 'Resolvers' type to ensure type safety
export const resolvers: Resolvers = {
  Query: {
    // The return type is automatically inferred and checked!
    books: () => {
      return books;
    },
  },
};