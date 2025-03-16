import { useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../slices/counterSlice";

export default function CounterControls() {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}
