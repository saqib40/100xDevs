import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice"; // Import reducers

// Create the Redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer, // Register reducers here
  },
});

// Define TypeScript types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
