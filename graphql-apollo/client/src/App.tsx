import { useQuery } from '@apollo/client/react';
// 1. Import the generated `graphql` function
import { gql } from './gql/gql';

// 2. Define the query using the imported function
const GET_BOOKS = gql(`
  query GetBooks {
    books {
      title
      author
    }
  }
`);

function App() {
  // 3. Pass the typed document to the standard useQuery hook
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>My GraphQL Library 🚀</h1>
      <ul>
        {/* The 'any' type error will finally be gone! */}
        {data?.books?.map((book) => (
          // The `book` object is now fully typed.
          <li key={book?.title}>
            <h3>{book?.title}</h3>
            <p>By: {book?.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;