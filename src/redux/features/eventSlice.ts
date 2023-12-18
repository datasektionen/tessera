import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventState, IEvent } from "../../types";

const initialState: EventState = {
  event: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    getEventRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    getEventSuccess: (state, action: PayloadAction<IEvent>) => {
      state.loading = false;
      state.event = action.payload;
    },
    getEventFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getEventRequest, getEventSuccess, getEventFailure } =
  eventSlice.actions;

export default eventSlice.reducer;
