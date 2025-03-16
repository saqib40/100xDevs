import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function CounterDisplay() {
  const count = useSelector((state: RootState) => state.counter.value); // state.sliceName.value

  return <h2>Counter: {count}</h2>;
}
