import { useCallback, useMemo, useState } from "react";
import Child from "./child";
/*
function App() {
  const [value, setValue] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  function calSum(n : number) : number {
    let sum : number = 0;
    for(let i : number = 0; i<=n; i++) {
      sum += i;
    }
    return sum;
  }
  return (
    <>
      <input value={value} type="text" onChange={(e) => setValue(Number(e.target.value))}/>
      <div>Sum is : {calSum(value)}</div>
      <button onClick={() => setCounter(counter+1)}>{counter}</button>
    </>
  )
}
*/

function App() {
  const [value, setValue] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const sum : number = useMemo(() => {
    let sumVal : number = 0;
    for(let i : number = 0; i<=value; i++) {
      sumVal += i;
    }
    return sumVal;
  }, [value]);
  return (
    <>
      <input value={value} type="text" onChange={(e) => setValue(Number(e.target.value))}/>
      <div>Sum is : {sum}</div>
      <button onClick={() => setCounter(counter+1)}>{counter}</button>
    </>
  )
}

function Parent() {
  const [count, setCount] = useState(0);
  /*
  const handleClick = () => {
    console.log("Button clicked!");
  };
  */
 const handleClick = useCallback(() => {console.log("Button clicked!");}, [])

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </div>
  );
}

export default App
