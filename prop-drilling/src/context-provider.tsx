// step2; create context provider

import { useState } from "react";
import MyContext from "./context"; // Import the created context

export default function MyProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState("Hello, Context!"); // State inside provider

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}
