import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of state
interface CounterState {
  value: number;
}

// Initial state
const initialState: CounterState = {
  value: 0,
};

// Create the slice
const counterSlice = createSlice({
  name: "counter",
  initialState, // or initialState : CounterState = {...}
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Export actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
