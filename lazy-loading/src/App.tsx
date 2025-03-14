/*
Lazy Loading

🚀 React Lazy Loading: A Detailed Overview

📌 What is Lazy Loading?
Lazy loading in React optimizes performance by loading components only when needed instead of upfront during the initial render. This reduces the initial bundle size and speeds up page loading, improving user experience.

🛠 How Lazy Loading Works
1. React splits the code into chunks.
2. Components are loaded only when required.
3. Uses React.lazy() and Suspense to handle asynchronous loading and Component to create error boundry
*/
import React, { Suspense } from "react";
//import { Component } from 'react';
import { ErrorBoundary } from "react-error-boundary"; // will increase bundle size thoda sa

const LazyComponent = React.lazy(() => import("./LazyComponent"));

/*
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

// Error Boundary Component
class ErrorBoundary extends Component <ErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.error("Error loading component:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p>Error loading component.</p>;
    }
    return this.props.children;
  }
}
*/
// another way
function ErrorFallback() {
  return <p>Error loading component.</p>;
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<p>Loading...</p>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

