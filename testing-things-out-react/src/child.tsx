import { memo } from "react";

interface ChildProps {
  onClick: () => void;
}

function Child({ onClick }: ChildProps) {
  console.log("Child component re-rendered!");
  return <button onClick={onClick}>Click Me</button>;
}

export default memo(Child);

