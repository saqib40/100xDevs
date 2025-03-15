// step 1; create context
import { createContext } from "react";

// Create a context with a default value
const MyContext = createContext<string>("Default Value");

export default MyContext;
