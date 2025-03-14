// to understand useRef hook
import { useRef, useState, useEffect } from "react";

// use case 1
// accessing and manipulating DOM => most important
export function InputFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (inputRef.current) {
      //document.querySelector("input")?.focus(); we shouldn't manipulate the DOM by ourselves
      inputRef.current.focus(); // Focuses the input field
    }
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Click the button to focus" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

// use case 2
// Persisting Values Without Causing Re-renders
// Unlike useState, changing useRef.current does not cause a re-render.
// e.g Tracking Re-Render Count
export function RenderCounter() {
    const [count, setCount] = useState(0);
    const renderCount = useRef<number>(1); // Start at 1 since the component renders once initially
  
    useEffect(() => {
      renderCount.current += 1; // Increment render count on every re-render
    });
  
    return (
      <div>
        <p>Count: {count}</p>
        <p>Component has re-rendered {renderCount.current} times</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  }

// use case 3
// remember prev state values
export function PreviousValueTracker() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef<number | null>(null);
  
    useEffect(() => {
      prevCountRef.current = count; // Store the previous value before the next render
    }, [count]);
  
    return (
      <div>
        <p>Current Count: {count}</p>
        <p>Previous Count: {prevCountRef.current}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    );
  }
