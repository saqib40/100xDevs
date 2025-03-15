// example of prop drilling
// We want to pass the theme prop from App to Button,
// but it must pass through an unnecessary Card component.

/*
// Button component needs theme, but it receives it through Card
function Button({ theme }: { theme: string }) {
  return <button style={{ backgroundColor: theme }}>Click Me</button>;
}

// Card component doesn't need theme, but it has to pass it down
function Card({ theme }: { theme: string }) {
  return (
    <div>
      <h2>Card Component</h2>
      <Button theme={theme} />
    </div>
  );
}

// App passes theme down multiple levels (prop drilling issue)
export default function App() {
  const theme = "lightblue";
  return (
    <div>
      <h1>Prop Drilling Example</h1>
      <Card theme={theme} />
    </div>
  );
}
*/

/*
// fixing with context API
import React, { createContext, useContext } from "react";

// Step 1: Create a Context
const ThemeContext = createContext<string>("");

// Step 2: Create a Provider Component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value="lightblue">{children}</ThemeContext.Provider>
  );
}

// Step 4: Consume Context in the Button component (No need for prop drilling!)
function Button() {
  const theme = useContext(ThemeContext); // Get value from ThemeContext
  return <button style={{ backgroundColor: theme }}>Click Me</button>;
}

// Card Component (no need for props)
function Card() {
  return (
    <div>
      <h2>Card Component</h2>
      <Button />
    </div>
  );
}

// Step 3: Wrap Components inside Provider
export default function App() {
  return (
    <ThemeProvider>
      <h1>Context API Example</h1>
      <Card />
    </ThemeProvider>
  );
}
*/

// a better modular structure

// step 3; wrap components with provider
import MyProvider from "./context-provider";
import MyComponent from "./my-component";

export default function App() {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  );
}
