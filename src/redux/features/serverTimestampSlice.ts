// serverTimestampSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServerTimestampState {
  timestamp: number;
}

const initialState: ServerTimestampState = {
  timestamp: new Date().getTime(),
};

const serverTimestampSlice = createSlice({
  name: "serverTimestamp",
  initialState,
  reducers: {
    setTimestamp: (state, action: PayloadAction<number>) => {
      state.timestamp = action.payload;
    },
    removeTimestamp: (state) => {
      state.timestamp = new Date().getTime();
    },
  },
});

export const { setTimestamp, removeTimestamp } = serverTimestampSlice.actions;

export default serverTimestampSlice.reducer;
