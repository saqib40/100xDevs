import { useState, useRef} from 'react';

// Create a component that tracks and displays the number of times it has been rendered.
// Use useRef to create a variable that persists across renders without causing
// additional renders when it changes.

export default function App() {
    console.log("Rendered");
    const [, forceRender] = useState<number>(0);
    const nRenders = useRef<number>(1);
    const handleReRender = () => {
        // Update state to force re-render
        forceRender(Math.random());
        nRenders.current = nRenders.current+1;
    };

    return (
        <div>
            <p>This component has rendered {nRenders.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};