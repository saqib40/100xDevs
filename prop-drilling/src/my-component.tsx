// step4; consume context

import { useContext } from "react";
import MyContext from "./context"; // Import context

export default function MyComponent() {
  const value = useContext(MyContext); // Get value from context

  return <h1>{value}</h1>;
}
